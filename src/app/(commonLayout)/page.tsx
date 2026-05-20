import About from "@/components/about/AboutSection";
import ContactSection from "@/components/Contacts/ContactSection";
import Hero from "@/components/hero/Hero";
import FeaturedProjects from "@/components/project/FeaturedProjects";
import BackToTop from "@/components/Scroll/BackToTop";
import TechnicalInsights from "@/components/TechnicalInsights/TechnicalInsights";
import BlogSection from "@/components/blog/BlogSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore the portfolio of Shaharear Rahman Sabbir, a Full Stack Developer from Bangladesh specialized in building production-ready apps with Next.js 15 and Node.js.",
  keywords: [
    "MERN Stack Developer",
    "Next.js Portfolio",
    "Software Engineer Bangladesh",
  ],
  alternates: {
    canonical: process.env.APP_URL || "https://shaharear.top",
  },
};

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <ExperienceSection />
      <FeaturedProjects />
      <TechnicalInsights />
      <BlogSection />
      <ContactSection />
      <BackToTop />
    </div>
  );
}
