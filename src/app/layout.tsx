import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./design-system.css";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  variable: "--font-archivo",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

const fontVariables = `${archivo.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`;

const interfaceBootstrap = `(function(){var root=document.documentElement;try{var saved=window.localStorage.getItem('portfolio-locale');if(saved==='pt'){root.dataset.locale='pt';root.lang='pt-BR'}}catch(e){}if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){root.classList.add('reveal-enabled');window.setTimeout(function(){if(!root.hasAttribute('data-reveal-ready'))root.classList.remove('reveal-enabled')},3000)}})()`;

export const metadata: Metadata = {
  title: "Giovane Ferreira",
  description:
    "Portfolio of Giovane Ferreira, a Full Stack Developer in São Paulo working across web, backend, cloud, and mobile products.",
  authors: [{ name: "Giovane Ferreira da Silva" }],
  creator: "Giovane Ferreira da Silva",
  category: "technology",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "PHP",
    "Python",
    "Node.js",
    "WordPress",
    "São Paulo",
  ],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3efed",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-locale="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: interfaceBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
