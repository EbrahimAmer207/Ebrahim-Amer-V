import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import PageTransition from "@/components/layout/PageTransition";
import Background3D from "@/components/ui/Background3D";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ebrahim Amer | Premium Front-End Engineer & React Developer",
  description: "Sophisticated, performance-first front-end portfolio of Ebrahim Amer. React.js, Next.js, and TypeScript developer focused on building digital experiences that feel effortless.",
  keywords: ["Ebrahim Amer", "Frontend Developer", "React Developer", "Next.js Specialist", "Software Engineer Portfolio", "Web Performance"],
  authors: [{ name: "Ebrahim Amer" }],
  openGraph: {
    title: "Ebrahim Amer | Premium Front-End Engineer",
    description: "Building digital experiences that feel effortless. Focus on performance, aesthetics, and clean architecture.",
    url: "https://ebrahim-amer.vercel.app/",
    siteName: "Ebrahim Amer Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} data-theme="dark">
      <body className="theme-transition">
        <Background3D />
        <AppProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </AppProvider>
      </body>
    </html>
  );
}




