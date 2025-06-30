import Section from "./Section";
import SectionHeader from "./SectionHeader";
import { PROJECTS } from "../content/content";
import Project from "./Project";
import { Element } from "react-scroll";

const Projects = () => {
  return (
    <Element name="projects">
      <Section>
        <div className="bg-base-200 py-12">
          <SectionHeader>Recent Projects</SectionHeader>
          <div className="flex flex-col gap-8">
            {PROJECTS.map((p) => (
              <Project key={p.id} project={p} />
            ))}
          </div>
        </div>
      </Section>
    </Element>
  );
};

export default Projects;
