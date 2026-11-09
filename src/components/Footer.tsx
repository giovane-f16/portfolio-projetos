import Image from "next/image";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner shell">
        <Image
          className="footer-logo"
          src="/logo.svg"
          alt="Giovane Ferreira"
          width={40}
          height={40}
          unoptimized
        />
        <p>© Giovane Ferreira</p>
      </div>
    </footer>
  );
}
