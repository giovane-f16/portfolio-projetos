import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="grid-layer" aria-hidden="true" />
      <Header />
      <Main />
      <Footer />
    </>
  );
}
