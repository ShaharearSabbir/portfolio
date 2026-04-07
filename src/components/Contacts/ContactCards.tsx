"use client";

// Swapping VscLinkedin for BsLinkedin to match your Hero icons
import { VscGithub, VscMail } from "react-icons/vsc";
import { BsLinkedin } from "react-icons/bs"; 
import { FaWhatsapp } from "react-icons/fa";

export function ContactCards() {
  const contacts = [
    {
      name: "Email",
      value: "dev@shaharear.top",
      href: "mailto:dev@shaharear.top",
      icon: <VscMail size={24} />,
      color: "group-hover:text-blue-400",
    },
    {
      name: "WhatsApp",
      value: "+880 1609-067955",
      href: "https://wa.me/8801609067955",
      icon: <FaWhatsapp size={24} />,
      color: "group-hover:text-emerald-400",
    },
    {
      name: "LinkedIn",
      value: "Shaharear Rahman Sabbir",
      href: "https://www.linkedin.com/in/shaharearrahmansabbir/",
      icon: <BsLinkedin size={22} />, // Using Bs icon here
      color: "group-hover:text-sky-500",
    },
    {
      name: "GitHub",
      value: "@ShaharearSabbir",
      href: "https://github.com/ShaharearSabbir",
      icon: <VscGithub size={24} />,
      color: "group-hover:text-blue-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {contacts.map((contact) => (
        <a
          key={contact.name}
          href={contact.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-8 rounded-[2rem] bg-muted/20 border border-white/5 hover:bg-muted/40 hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-primary/5"
        >
          <div className="flex flex-col space-y-5">
            <div className={`w-12 h-12 rounded-2xl bg-background border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${contact.color}`}>
              {contact.icon}
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
                {contact.name}
              </p>
              <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                {contact.value}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}