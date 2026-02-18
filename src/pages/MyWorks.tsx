import { Link } from "react-router-dom";
import { config } from "../config";
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
        <p>A collection of all my projects and creations</p>
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
              <ul className="myworks-card-bullets">
                {project.technologies.split(",").map((tech, i) => (
                  <li key={i}>{tech.trim()}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWorks;
