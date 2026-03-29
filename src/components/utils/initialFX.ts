import gsap from "gsap";
import { lenis } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  if (lenis) {
    lenis.start();
  }
  const mainEl = document.getElementsByTagName("main")[0];
  mainEl.classList.add("main-active");
  // Animate opacity via GSAP (not CSS animation) to avoid transform
  // that breaks position:fixed on .character-model
  gsap.fromTo(mainEl, { opacity: 0 }, { opacity: 1, duration: 1 });
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  // Simple fade-in for landing intro (no TextSplitter — React manages this content)
  gsap.fromTo(
    [".landing-intro h2", ".landing-intro h1"],
    { opacity: 0, y: 40, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.15,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );
}

