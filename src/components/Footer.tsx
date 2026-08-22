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
          <span aria-hidden="true">GF</span>
          <div>
            <strong translate="no">Giovane Ferreira</strong>
            <small>
              <Copy text={{ en: "Full Stack Developer", pt: "Desenvolvedor Full Stack" }} />
            </small>
          </div>
        </div>
        <p>
          <Copy
            text={{
              en: "Designed and engineered in São Paulo, Brazil.",
              pt: "Projetado e desenvolvido em São Paulo, Brasil.",
            }}
          />
        </p>
        <p>
          © Giovane Ferreira ·{" "}
          <Copy text={{ en: "All rights reserved.", pt: "Todos os direitos reservados." }} />
        </p>
      </div>
    </footer>
  );
}
