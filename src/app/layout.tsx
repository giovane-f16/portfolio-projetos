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

const interfaceBootstrap = `(function(){var root=document.documentElement;try{var saved=window.localStorage.getItem('portfolio-locale');if(saved==='en'){root.dataset.locale='en';root.lang='en'}}catch(e){}if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){root.classList.add('reveal-enabled');window.setTimeout(function(){if(!root.hasAttribute('data-reveal-ready'))root.classList.remove('reveal-enabled')},3000)}})()`;

export const metadata: Metadata = {
  title: "Giovane Ferreira",
  description:
    "Portfólio de Giovane Ferreira, Product Engineer em São Paulo com atuação em produtos web, backend, cloud e mobile.",
  authors: [{ name: "Giovane Ferreira da Silva" }],
  creator: "Giovane Ferreira da Silva",
  category: "technology",
  keywords: [
    "Product Engineer",
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
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-locale="pt" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: interfaceBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
