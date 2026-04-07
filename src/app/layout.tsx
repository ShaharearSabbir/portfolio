import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shaharear Rahman Sabbir | Full Stack Systems Architect",
    template: "%s | Shaharear Rahman Sabbir",
  },
  description:
    "Full-stack developer specializing in Next.js, TypeScript, and Scalable Systems. Building high-performance web applications with the MERN stack and Prisma.",
  keywords: [
    "Full Stack Developer",
    "Next.js Developer Bangladesh",
    "React Architect",
    "TypeScript Expert",
    "MERN Stack",
    "Prisma ORM",
    "Shaharear Rahman Sabbir",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Shaharear Rahman Sabbir" }],
  creator: "Shaharear Rahman Sabbir",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com", // Replace with your actual domain
    title: "Shaharear Rahman Sabbir | Full Stack Developer",
    description: "Architecting scalable web solutions with modern tech stacks.",
    siteName: "Shaharear Rahman Sabbir Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaharear Rahman Sabbir | Full Stack Developer",
    description:
      "Next.js & TypeScript Specialist building the future of the web.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
