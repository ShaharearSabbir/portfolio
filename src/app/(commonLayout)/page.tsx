import About from "@/components/about/AboutSection";
import ContactSection from "@/components/Contacts/ContactSection";
import Hero from "@/components/hero/Hero";
import FeaturedProjects from "@/components/project/FeaturedProjects";
import BackToTop from "@/components/Scroll/BackToTop";
import TechnicalInsights from "@/components/TechnicalInsights/TechnicalInsights";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <FeaturedProjects />
      <TechnicalInsights />
      <ContactSection />
      <BackToTop />
    </div>
  );
}
