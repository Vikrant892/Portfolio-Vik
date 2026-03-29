import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    if (window.innerWidth <= 768) return;

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    ScrollTrigger.refresh();

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {config.projects.slice(0, 5).map((project, index) => (
            <div className="work-box work-box-no-image" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div className="work-title-right">
                    <span className="work-category">{project.category}</span>
                    <h4>{project.title}</h4>
                  </div>
                </div>
                {project.description && (
                  <p className="work-definition">{project.description}</p>
                )}
                {(project as any).highlights && (
                  <ul className="work-highlights">
                    {(project as any).highlights.slice(0, 3).map((h: string, i: number) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
                <ul className="work-bullets">
                  {project.technologies.split(",").map((tech, i) => (
                    <li key={i}>{tech.trim()}</li>
                  ))}
                </ul>
                <div className="work-links">
                  {(project as any).live && (
                    <a href={(project as any).live} target="_blank" rel="noopener noreferrer"
                      className="work-link-btn work-link-live" data-cursor="disable">
                      Live <MdArrowOutward />
                    </a>
                  )}
                  {(project as any).github && (
                    <a href={(project as any).github} target="_blank" rel="noopener noreferrer"
                      className="work-link-btn work-link-github" data-cursor="disable">
                      GitHub <MdArrowOutward />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
          {/* See All Works Button */}
          <div className="work-box work-box-cta">
            <div className="see-all-works">
              <h3>Want to see more?</h3>
              <p>Explore all {config.projects.length} projects</p>
              <Link to="/myworks" className="see-all-btn" data-cursor="disable">
                See All Works →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
