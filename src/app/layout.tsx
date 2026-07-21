import type { Metadata, Viewport } from "next";
import "./globals.css";

const revealBootstrap = `if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){document.documentElement.classList.add('reveal-enabled');window.setTimeout(function(){if(!document.documentElement.hasAttribute('data-reveal-ready'))document.documentElement.classList.remove('reveal-enabled')},3000)}`;

export const metadata: Metadata = {
  title: "Giovane Ferreira — Desenvolvedor Full Stack",
  description:
    "Portfólio de Giovane Ferreira, desenvolvedor Full Stack em São Paulo: produtos web, APIs e integrações com foco em performance, segurança e consistência.",
  authors: [{ name: "Giovane Ferreira" }],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06131c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
