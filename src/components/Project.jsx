import React, { useState, useEffect } from "react";
import Button from "./Button";
import { container, socialIcons } from "../Animation/animation";
import { motion } from "motion/react";

const Project = ({ project }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  return (
    <motion.div
      variants={container("BTT")}
      initial="initial"
      whileInView="animate"
      className="flex relative gap-4 md:gap-8 lg:gap-24 flex-col lg:flex-row container px-4 py-4 mx-auto lg:p-12 border-t-2 border-primary"
    >
      <div className="flex-1">
        <img src={project.image} className="rounded-2xl" alt="" />
      </div>
      <div className="flex-1 space-y-4">
        <h3 className="text-xl font-semibold">{project.name}</h3>
        <p className="text-justify-">{project.shortDescription}</p>
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
        <div className="flex flex-wrap gap-4">
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
          <motion.button
            variants={socialIcons()}
            initial="initial"
            whileTap="onClick"
            className="btn btn-primary text-white hover:rounded-full"
            onClick={() => {
              setShow(true);
            }}
          >
            View Details
          </motion.button>
        </div>
      </div>

      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-base-300 z-[99]"
            onClick={() => setShow(false)}
          />

          <motion.div
            variants={container("TTB")}
            initial="initial"
            animate="animate"
            exit="exit"
            // Apply flexbox to the modal itself
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-base-100 container p-4 md:p-8 lg:p-12 rounded-2xl z-[100] max-h-[90vh] w-[90%] md:w-[90%] lg:w-[70%] xl:w-[60%] shadow-lg flex flex-col" // Added flex flex-col here
          >
            {/* Header that doesn't scroll */}
            <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
              {project.name}
            </h3>

            {/* This div will be the scrollable area */}
            <div className="flex-grow overflow-y-auto pr-2">
              {" "}
              {/* Added flex-grow and pr-2 for scrollbar */}
              <div className="space-y-2">
                <h4 className="text-lg lg:text-xl font-semibold">Overview:</h4>
                <p className="text-justify leading-relaxed">
                  {project.details.fullDescription}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-semibold">Category:</h4>
                <p className="text-lg">{project.details.category}</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-semibold">Detailed Features:</h4>
                <ul className="list-disc pl-6 space-y-1 text-lg">
                  {project.details.keyFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-semibold">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <h5 className="font-bold w-full">Client-Side:</h5>
                  <ul className="flex flex-wrap gap-2">
                    {project.details.clientSideTech.map((tech, index) => (
                      <li
                        className="bg-base-300 text-base-content px-3 py-1 rounded-full text-sm"
                        key={index}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
                {project.details.serverSideTech &&
                  project.details.serverSideTech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      <h5 className="font-bold w-full">Server-Side:</h5>
                      <ul className="flex flex-wrap gap-2">
                        {project.details.serverSideTech.map((tech, index) => (
                          <li
                            className="bg-base-300 text-base-content px-3 py-1 rounded-full text-sm"
                            key={index}
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                {project.details.databaseTech && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    <h5 className="font-bold w-full">Database:</h5>
                    <p className="bg-base-300 text-base-content px-3 py-1 rounded-full text-sm">
                      {project.details.databaseTech}
                    </p>
                  </div>
                )}
                {project.details.authenticationTech && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    <h5 className="font-bold w-full">Authentication:</h5>
                    <p className="bg-base-300 text-base-content px-3 py-1 rounded-full text-sm">
                      {project.details.authenticationTech}
                    </p>
                  </div>
                )}
              </div>
              {project.details.challengesLearned && (
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold">
                    Challenges & Learning:
                  </h4>
                  <p className="text-justify leading-relaxed">
                    {project.details.challengesLearned}
                  </p>
                </div>
              )}
              {project.details.futureEnhancements &&
                project.details.futureEnhancements.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold">
                      Future Enhancements:
                    </h4>
                    <ul className="list-disc pl-6 space-y-1 text-lg">
                      {project.details.futureEnhancements.map(
                        (enhancement, index) => (
                          <li key={index}>{enhancement}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              <div className="space-y-2">
                <h4 className="text-xl font-semibold">Deployment:</h4>
                {typeof project.details.deployment === "string" ? (
                  <p className="text-lg">{project.details.deployment}</p>
                ) : (
                  <div className="space-y-1">
                    {project.details.deployment.client && (
                      <p className="text-lg">
                        Client: {project.details.deployment.client}
                      </p>
                    )}
                    {project.details.deployment.backend && (
                      <p className="text-lg">
                        Backend: {project.details.deployment.backend}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-semibold">Testing Strategy:</h4>
                <p className="text-lg">{project.details.testingStrategy}</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-semibold">Responsive Design:</h4>
                <p className="text-lg">
                  {project.details.responsiveDesign ? "Yes" : "No"}
                </p>
              </div>
            </div>

            {/* Buttons that don't scroll */}
            <div className="flex justify-between items-end gap-4 mt-6">
              <div className="flex gap-4 flex-wrap">
                <a
                  href={project.details.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>Live Demo</Button>
                </a>
                <a
                  href={project.details.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>GitHub Repo</Button>
                </a>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setShow(false)}
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Project;
