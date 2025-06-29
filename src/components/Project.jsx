import React from "react";
import Button from "./Button";

const Project = ({ project }) => {
  return (
    <div className="flex gap-4 md:gap-8 lg:gap-24 flex-col lg:flex-row container px-4 py-4 mx-auto lg:p-12 border-t-2 border-primary">
      <div className="flex-1">
        <img src={project.image} alt="" />
      </div>
      <div className="flex-1 space-y-4">
        <h3 className="text-xl font-semibold">{project.name}</h3>
        <p>{project.shortDescription}</p>
        <div className="space-y-1">
          <h4 className="font-bold">Key Features:</h4>
          <ul>
            {project.topFeatures.map((feature) => (
              <li className="ml-4 list-disc" key={feature}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-1">
          <h4 className="font-bold">Technologies Used:</h4>
          <ul className="flex flex-wrap gap-2">
            {project.usedLibraries.map((lib) => (
              <li
                className="bg-base-300 text-base-content px-2 rounded"
                key={lib}
              >
                {lib}
              </li>
            ))}
          </ul>
        </div>
        <p className="space-x-4">
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
            <Button>Live Demo</Button>
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>GitHub Repo</Button>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Project;
