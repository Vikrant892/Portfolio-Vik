import { Link } from "react-router-dom";
import { config } from "../config";
import { MdArrowOutward } from "react-icons/md";
import "./MyWorks.css";

const MyWorks = () => {
  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          All <span>Works</span>
        </h1>
        <p>{config.projects.length} projects in cybersecurity, data engineering, ML & automation</p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <div className="myworks-card" key={project.id} data-cursor="disable">
            <div className="myworks-card-number">0{index + 1}</div>
            <div className="myworks-card-info">
              <p className="myworks-card-category">{project.category}</p>
              <h3>{project.title}</h3>
              {project.description && (
                <p className="myworks-card-description">{project.description}</p>
              )}
              {(project as any).highlights && (
                <ul className="myworks-card-highlights">
                  {(project as any).highlights.map((h: string, i: number) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
              <ul className="myworks-card-bullets">
                {project.technologies.split(",").map((tech, i) => (
                  <li key={i}>{tech.trim()}</li>
                ))}
              </ul>
              <div className="myworks-card-links">
                {(project as any).live && (
                  <a href={(project as any).live} target="_blank" rel="noopener noreferrer"
                    className="myworks-link-btn myworks-link-live">
                    Live <MdArrowOutward />
                  </a>
                )}
                {(project as any).github && (
                  <a href={(project as any).github} target="_blank" rel="noopener noreferrer"
                    className="myworks-link-btn myworks-link-github">
                    GitHub <MdArrowOutward />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWorks;
