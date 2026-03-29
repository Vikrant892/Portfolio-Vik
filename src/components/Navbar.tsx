import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
<<<<<<< HEAD
=======
import { config } from "../config";
>>>>>>> 04c8567fae9de69a714d167e9d522ad5ac054a87
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenis = new Lenis({
      duration: 1.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.7,
      touchMultiplier: 2,
      infinite: false,
    });

    // Start paused
    lenis.stop();

    // Handle smooth scroll animation frame
    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Handle navigation links
    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section && lenis) {
            const target = document.querySelector(section) as HTMLElement;
            if (target) {
              lenis.scrollTo(target, {
                offset: 0,
                duration: 1.5,
              });
            }
          }
        }
      });
    });

    // Handle resize
    window.addEventListener("resize", () => {
      lenis?.resize();
    });

    return () => {
      lenis?.destroy();
    };
  }, []);
  const messages = [
    "status: online",
    "open_to_work: true",
    "loc: Adelaide, AU",
    "stack: Python | AWS | SIEM",
    "nasa_hackathon: winner",
  ];
  const [text, setText] = useState("");
  const [msgIdx, setMsgIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    const current = messages[msgIdx];
    const typeSpeed = isDeleting ? 30 : 60;
    const pauseAfterType = 2000;
    const pauseAfterDelete = 300;

    timeoutRef.current = window.setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pauseAfterType);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setMsgIdx((msgIdx + 1) % messages.length);
        }
      }
    }, isDeleting && text.length === 0 ? pauseAfterDelete : typeSpeed);

    return () => clearTimeout(timeoutRef.current);
  }, [text, isDeleting, msgIdx]);

  return (
    <>
      <div className="header">
        <div className="navbar-terminal" data-cursor="disable">
          <span className="terminal-dot"></span>
          <span className="terminal-prompt">&gt;</span>
          <span className="terminal-text">{text}</span>
          <span className="terminal-cursor">_</span>
        </div>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
