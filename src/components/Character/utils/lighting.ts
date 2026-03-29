import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // Warm-cool key light — clean, bright, modern
  const directionalLight = new THREE.DirectionalLight(0xdce8f5, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(3, 8, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  // Soft blue fill — subtle screen-like glow
  const pointLight = new THREE.PointLight(0x4488cc, 0, 12, 2);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  // Soft lavender rim — gentle silhouette separation
  const rimLight = new THREE.DirectionalLight(0xa78bfa, 0);
  rimLight.position.set(-4, 6, -3);
  scene.add(rimLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight.material.opacity > 0.9) {
      // Terminal green-cyan glow from monitor screen
      pointLight.color.set(0x00ffcc);
      pointLight.intensity = screenLight.material.emissiveIntensity * 18;
    } else {
      pointLight.intensity = 0;
    }
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.4,
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 3.5,
      duration: duration,
      ease: ease,
    });
    gsap.to(rimLight, {
      intensity: 2.0,
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
