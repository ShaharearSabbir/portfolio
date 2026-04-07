import {
  VscAccount,
  VscCode,
  VscRemoteExplorer,
} from "react-icons/vsc";
import { BiGitBranch } from "react-icons/bi";
import { ModeToggle } from "../ui/ModeToggle";
import ScrollLink from "../Scroll/ScrollLink";

const Navbar = () => {
  const navLinks = [
    { href: "about", icon: <VscAccount size={24} />, label: "About" },
    { href: "featured-projects", icon: <VscCode size={24} />, label: "Projects" },
    { href: "insights", icon: <BiGitBranch size={24} />, label: "Insights" },

    {
      href: "contact",
      icon: <VscRemoteExplorer size={24} />,
      label: "Contact",
    },
  ];

  return (
    <header
      className="fixed z-100 
      /* Desktop: Left Side */
      lg:left-6 lg:top-1/2 lg:-translate-y-1/2 lg:h-auto lg:w-auto
      /* Mobile: Bottom Center */
      bottom-6 left-1/2 -translate-x-1/2 lg:translate-x-0 w-[95%] sm:w-[90%] max-w-100 lg:max-w-none"
    >
      <nav className="p-2 sm:p-3 bg-card/40 backdrop-blur-xl border border-border rounded-full shadow-2xl">
        {/* Changed gap-6 to gap-2 for very small phones, scaling up to gap-6/8 later */}
        <ul className="flex lg:flex-col items-center justify-around lg:justify-center gap-2 xs:gap-4 sm:gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.href} className="shrink-0">
              <ScrollLink
                name={link.href}
                className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center justify-center p-2 rounded-full hover:bg-primary/10 group relative"
              >
                {link.icon}

                {/* Desktop Tooltip */}
                <span className="absolute left-14 scale-0 group-hover:scale-100 transition-all bg-card border border-border text-foreground text-[10px] px-2 py-1 rounded-md hidden lg:block uppercase tracking-widest font-bold whitespace-nowrap">
                  {link.label}
                </span>
              </ScrollLink>
            </li>
          ))}

          {/* Divider Logic */}
          <div className="hidden lg:block w-8 h-px bg-border shrink-0" />
          <div className="lg:hidden w-px h-6 bg-border shrink-0" />

          <li className="flex items-center justify-center shrink-0">
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
