import Navbar from "@/components/Navbar/Navbar";
import PresenceBadge from "@/components/PresenceBadge";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <PresenceBadge />
      <Navbar />
      {children}
    </section>
  );
}
