import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        <span data-locale-copy="en">Skip to content</span>
        <span data-locale-copy="pt" lang="pt-BR">
          Pular para o conteúdo
        </span>
      </a>
      <div className="background-grid" aria-hidden="true" />
      <Header />
      <Main />
      <Footer />
    </>
  );
}
