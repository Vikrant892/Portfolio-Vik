import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

// Meshes hidden on landing (photo-only view) and revealed during scroll transition
const HIDDEN_ON_LANDING = new Set([
  // Character body
  'BODYSHIRT', 'Ear001', 'Eyebrow', 'EYEs001', 'Hand', 'Neck',
  'Pant', 'Plane007', 'Shoe', 'Sole', 'hair', 'Cube002',
  // Desk, keyboard, ground (visible artifacts on landing)
  'Keyboard', 'Plane', 'ground', 'Plane002', 'Plane003',
  'Plane017', 'Plane017_1',
  ...Array.from({ length: 40 }, (_, i) => i === 0 ? 'KEYS' : `KEYS${String(i).padStart(3, '0')}`),
]);

function hideCharacterBody(character: THREE.Object3D): THREE.Object3D[] {
  const hidden: THREE.Object3D[] = [];
  character.traverse((child: any) => {
    if ((child.isMesh || child.isSkinnedMesh) && HIDDEN_ON_LANDING.has(child.name)) {
      child.visible = false;
      hidden.push(child);
    }
  });
  return hidden;
}

/** Creates orbiting particle system around the photo — solar-system style */
function addOrbitalParticles(scene: THREE.Scene, center: THREE.Vector3): THREE.Points {
  const PARTICLE_COUNT = 200;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);
  const speeds = new Float32Array(PARTICLE_COUNT);
  const offsets = new Float32Array(PARTICLE_COUNT);
  const radii = new Float32Array(PARTICLE_COUNT);
  const colorMix = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Distribute across 5 orbital rings + scattered field
    let radius: number;
    if (i < 30) radius = 3.8 + Math.random() * 0.5;        // ring 1 — tight
    else if (i < 55) radius = 4.5 + Math.random() * 0.5;    // ring 2
    else if (i < 80) radius = 6.0 + Math.random() * 0.6;    // ring 3
    else if (i < 100) radius = 8.0 + Math.random() * 0.7;   // ring 4
    else if (i < 120) radius = 10.0 + Math.random() * 1.0;  // ring 5 — wide
    else radius = 4.0 + Math.random() * 8.0;                 // scattered field

    const angle = Math.random() * Math.PI * 2;
    const ySpread = (Math.random() - 0.5) * 5.0;

    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = ySpread;
    positions[i * 3 + 2] = Math.sin(angle) * radius * 0.35;

    // Bigger "planet" particles for first few in each ring
    const isLarger = (i % 25 === 0) || (i < 5);
    sizes[i] = isLarger ? (0.25 + Math.random() * 0.35) : (0.06 + Math.random() * 0.14);
    speeds[i] = 0.08 + Math.random() * 0.25;
    offsets[i] = angle;
    radii[i] = radius;
    colorMix[i] = Math.random(); // per-particle color variation
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
  geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));
  geometry.setAttribute('aRadius', new THREE.BufferAttribute(radii, 1));
  geometry.setAttribute('aColorMix', new THREE.BufferAttribute(colorMix, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uCenter: { value: center },
      uOpacity: { value: 1.0 },
    },
    vertexShader: `
      uniform float uTime;
      uniform vec3 uCenter;
      attribute float aSize;
      attribute float aSpeed;
      attribute float aOffset;
      attribute float aRadius;
      attribute float aColorMix;
      varying float vAlpha;
      varying float vColorMix;
      void main() {
        float angle = aOffset + uTime * aSpeed;
        // Slight vertical bob
        float yOff = position.y + sin(uTime * aSpeed * 1.5 + aOffset) * 0.3;
        vec3 pos = uCenter + vec3(
          cos(angle) * aRadius,
          yOff,
          sin(angle) * aRadius * 0.35
        );
        vAlpha = 0.4 + 0.6 * (0.5 + 0.5 * sin(uTime * aSpeed * 2.0 + aOffset));
        vColorMix = aColorMix;
        vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = aSize * 450.0 / -mvPos.z;
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      varying float vAlpha;
      varying float vColorMix;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float glow = smoothstep(0.5, 0.0, d);
        // 3-color palette: cyan, purple, warm white
        vec3 cyan   = vec3(0.22, 0.74, 0.97);
        vec3 purple = vec3(0.65, 0.45, 0.98);
        vec3 warm   = vec3(0.95, 0.85, 0.75);
        vec3 color;
        if (vColorMix < 0.4) {
          color = mix(cyan, purple, vColorMix / 0.4);
        } else {
          color = mix(purple, warm, (vColorMix - 0.4) / 0.6);
        }
        gl_FragColor = vec4(color, glow * vAlpha * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });

  const points = new THREE.Points(geometry, material);
  points.name = 'orbitalParticles';
  points.renderOrder = 0;
  scene.add(points);
  return points;
}

function addPhotoCutout(scene: THREE.Scene): THREE.Mesh {
  const texture = new THREE.TextureLoader().load('/images/mypicnbg.png');
  texture.colorSpace = THREE.LinearSRGBColorSpace;

  const geometry = new THREE.PlaneGeometry(3.8, 4.8);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: texture },
      uOpacity: { value: 1.0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform float uOpacity;
      varying vec2 vUv;
      void main() {
        vec4 tex = texture2D(uTexture, vUv);
        vec2 center = vUv - vec2(0.5);
        float dist = length(center * vec2(1.3, 1.0));
        float alpha = smoothstep(0.5, 0.32, dist);
        alpha *= smoothstep(0.0, 0.15, vUv.y);
        gl_FragColor = vec4(tex.rgb, alpha * uOpacity);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    toneMapped: false,
  });

  const photoMesh = new THREE.Mesh(geometry, material);
  photoMesh.position.set(0, 12.8, 1.5);
  photoMesh.name = 'photoCutout';
  photoMesh.renderOrder = 1; // Draw on top of particles
  scene.add(photoMesh);
  return photoMesh;
}

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);

            const hiddenMeshes = hideCharacterBody(character);
            const photoMesh = addPhotoCutout(scene);
            const particles = addOrbitalParticles(scene, photoMesh.position.clone());
            // Store refs for scroll-based toggle (photo → character)
            (gltf as any)._hiddenMeshes = hiddenMeshes;
            (gltf as any)._photoMesh = photoMesh;
            (gltf as any)._particles = particles;

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = false;
                child.receiveShadow = false;
                mesh.frustumCulled = true;
                if (mesh.material && !Array.isArray(mesh.material)) {
                  (mesh.material as THREE.ShaderMaterial).precision = 'mediump';
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera, photoMesh, hiddenMeshes, particles);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
