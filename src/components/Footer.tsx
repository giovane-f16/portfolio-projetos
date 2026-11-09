import Image from "next/image";
import type { LocalizedText } from "@/data/portfolio";

function Copy({ text }: { text: LocalizedText }) {
  return (
    <>
      <span data-locale-copy="en">{text.en}</span>
      <span data-locale-copy="pt" lang="pt-BR">
        {text.pt}
      </span>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner shell">
        <div className="footer-brand">
          <Image src="/logo.svg" alt="" width={32} height={32} unoptimized />
          <strong translate="no">Giovane Ferreira</strong>
        </div>
        <p>
          <Copy text={{ en: "São Paulo.", pt: "São Paulo." }} />
        </p>
        <p>© Giovane Ferreira</p>
      </div>
    </footer>
  );
}
