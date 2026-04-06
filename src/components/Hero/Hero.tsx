import hero from "@/assets/hero.png";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { PiXLogoBold } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";

import { MdEmail } from "react-icons/md";
import Image from "next/image";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="min-h-screen bg-base-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center w-full gap-8 mt-32 lg:mt-0 overflow-hidden">
        {/* Content */}
        <div className="flex-1 lg:ml-32 text-center lg:text-left space-y-8 p-4">
          <div>
            <h5 className="text-xl tracking-tight">Hello! I&apos;m</h5>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent">
              Shaharear Rahman Sabbir
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl">
            <span className="font-semibold">MERN Stack Developer: </span>
            Crafting comprehensive, scalable web solutions from concept to
            deployment.
          </h2>
          <div className="flex gap-4 justify-center lg:justify-start text-2xl">
            <a href="https://github.com/ShaharearSabbir" target="_blank">
              <BsGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/shaharearrahmansabbir/"
              target="_blank"
            >
              <BsLinkedin color="#0077B5" />
            </a>
            <a href="https://x.com/Shaharear_" target="_blank">
              <PiXLogoBold />
            </a>
            <a href="https://wa.me/8801609067955" target="_blank">
              <FaWhatsapp color="#075e54" />
            </a>

            <a href="mailto:dev@shaharear.top" target="_blank">
              <MdEmail />
            </a>
          </div>
          <a
            href="./Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="view-button btn btn-primary"
          >
            <Button variant={"destructive"}>View Resume</Button>
          </a>
        </div>
        <div className=" flex-1 lg:min-h-screen w-full flex justify-end items-end">
          <Image src={hero} alt="hero" className="w-full lg:w-[90%]" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
