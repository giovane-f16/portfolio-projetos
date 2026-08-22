"use client";

import {
  startTransition,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { Locale, LocalizedText } from "@/data/portfolio";

const navigation: Array<{ label: LocalizedText; sectionId: string }> = [
  { label: { en: "Profile", pt: "Perfil" }, sectionId: "sobre" },
  { label: { en: "Expertise", pt: "Especialidades" }, sectionId: "habilidades" },
  { label: { en: "Experience", pt: "Experiência" }, sectionId: "experiencia" },
  { label: { en: "Work", pt: "Projetos" }, sectionId: "projetos" },
  { label: { en: "Contact", pt: "Contato" }, sectionId: "contato" },
];

const pageMetadata: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Giovane Ferreira — Full Stack Developer",
    description:
      "Portfolio of Giovane Ferreira, a Full Stack Developer in São Paulo working across web, backend, cloud, and mobile products.",
  },
  pt: {
    title: "Giovane Ferreira — Desenvolvedor Full Stack",
    description:
      "Portfólio de Giovane Ferreira, Desenvolvedor Full Stack em São Paulo com atuação em produtos web, backend, cloud e mobile.",
  },
};

interface SectionBounds {
  id: string;
  top: number;
  bottom: number;
}

export function resolveActiveSection({
  sections,
  scrollY,
  viewportHeight,
  headerBottom,
  pageHeight,
}: {
  sections: SectionBounds[];
  scrollY: number;
  viewportHeight: number;
  headerBottom: number;
  pageHeight: number;
}) {
  if (!sections.length) return "";
  if (scrollY <= 1) return sections[0].id;
  if (scrollY + viewportHeight >= pageHeight - 2) {
    return sections.at(-1)?.id ?? sections[0].id;
  }

  let nextSection = sections[0];
  let largestVisibleArea = 0;

  for (const section of sections) {
    const visibleTop = Math.max(section.top, headerBottom);
    const visibleBottom = Math.min(section.bottom, viewportHeight);
    const visibleArea = Math.max(0, visibleBottom - visibleTop);

    if (visibleArea > largestVisibleArea) {
      largestVisibleArea = visibleArea;
      nextSection = section;
    }
  }

  if (largestVisibleArea === 0) {
    for (const section of sections) {
      if (section.top <= headerBottom) nextSection = section;
    }
  }

  return nextSection.id;
}

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

function scrollSectionIntoView(sectionId: string) {
  const section = document.getElementById(sectionId);

  if (!section) return false;

  section.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });

  return true;
}

export function applyLocale(locale: Locale) {
  const root = document.documentElement;
  const metadata = pageMetadata[locale];

  root.dataset.locale = locale;
  root.lang = locale === "en" ? "en" : "pt-BR";
  document.title = metadata.title;
  document
    .querySelector<HTMLMetaElement>('meta[name="description"]')
    ?.setAttribute("content", metadata.description);

  try {
    window.localStorage.setItem("portfolio-locale", locale);
  } catch {
    // The language still changes when storage is unavailable.
  }

  window.dispatchEvent(new Event("portfolio:locale-change"));
}

function getLocaleSnapshot(): Locale {
  return document.documentElement.dataset.locale === "pt" ? "pt" : "en";
}

function getServerLocaleSnapshot(): Locale {
  return "en";
}

function subscribeToLocaleChange(onStoreChange: () => void) {
  window.addEventListener("portfolio:locale-change", onStoreChange);
  return () =>
    window.removeEventListener("portfolio:locale-change", onStoreChange);
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("sobre");
  const locale = useSyncExternalStore(
    subscribeToLocaleChange,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );
  const headerRef = useRef<HTMLElement>(null);
  const firstNavigationRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    applyLocale(getLocaleSnapshot());
  }, []);

  useEffect(() => {
    const sections = navigation.flatMap(({ sectionId }) => {
      const section = document.getElementById(sectionId);
      return section ? [section] : [];
    });

    if (sections.length === 0) return;

    let animationFrame = 0;

    const updateActiveSection = () => {
      animationFrame = 0;

      const viewportHeight = window.innerHeight;
      const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;
      const pageBottom = document.documentElement.scrollHeight;
      const sectionBounds = sections.map((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        return { id: section.id, top, bottom };
      });
      const nextSectionId = resolveActiveSection({
        sections: sectionBounds,
        scrollY: window.scrollY,
        viewportHeight,
        headerBottom,
        pageHeight: pageBottom,
      });

      startTransition(() => {
        setActiveSection((current) =>
          current === nextSectionId ? current : nextSectionId,
        );
      });
    };

    const scheduleUpdate = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(scheduleUpdate, {
            threshold: [0, 0.25, 0.5, 0.75, 1],
          })
        : null;

    sections.forEach((section) => observer?.observe(section));
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("portfolio:locale-change", scheduleUpdate);
    scheduleUpdate();

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("portfolio:locale-change", scheduleUpdate);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const handleScrollRequest = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const control = event.target.closest<HTMLElement>("[data-scroll-to]");
      const sectionId = control?.dataset.scrollTo;

      if (sectionId && scrollSectionIntoView(sectionId)) {
        event.preventDefault();
      }
    };

    document.addEventListener("click", handleScrollRequest);
    return () => document.removeEventListener("click", handleScrollRequest);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const revealElements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const revealAll = () => {
      root.classList.remove("reveal-enabled");
      revealElements.forEach((element) => element.classList.add("is-revealed"));
    };

    root.setAttribute("data-reveal-ready", "true");

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    root.classList.add("reveal-enabled");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    revealElements.forEach((element) => observer.observe(element));

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) {
        observer.disconnect();
        revealAll();
      }
    };

    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    firstNavigationRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const handleNavigation = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>, sectionId: string) => {
      event.preventDefault();
      setActiveSection(sectionId);
      scrollSectionIntoView(sectionId);

      if (isOpen) {
        setIsOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    },
    [isOpen],
  );

  const handleLocaleChange = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    applyLocale(nextLocale);
  };

  return (
    <header ref={headerRef} className="site-header">
      <div className="header-inner shell">
        <button
          className="brand"
          type="button"
          aria-label={
            locale === "en"
              ? "Giovane Ferreira — Home"
              : "Giovane Ferreira — Início"
          }
          onClick={(event) => handleNavigation(event, "sobre")}
        >
          <span className="brand-mark" aria-hidden="true">
            GF
          </span>
          <span className="brand-copy">
            <strong translate="no">Giovane Ferreira</strong>
            <small>
              <Copy text={{ en: "Full Stack Developer", pt: "Desenvolvedor Full Stack" }} />
            </small>
          </span>
        </button>

        <nav
          id="site-navigation"
          className="site-navigation"
          data-open={isOpen}
          aria-label={
            locale === "en" ? "Primary navigation" : "Navegação principal"
          }
        >
          {navigation.map((item, index) => {
            const isActive = activeSection === item.sectionId;

            return (
              <button
                key={item.sectionId}
                ref={index === 0 ? firstNavigationRef : undefined}
                type="button"
                className={isActive ? "is-active" : undefined}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => handleNavigation(event, item.sectionId)}
              >
                <Copy text={item.label} />
              </button>
            );
          })}
        </nav>

        <div className="header-controls">
          <div
            className="locale-switch"
            aria-label={locale === "en" ? "Language selector" : "Seletor de idioma"}
            role="group"
          >
            <button
              type="button"
              className={locale === "en" ? "is-selected" : undefined}
              aria-pressed={locale === "en"}
              aria-label={locale === "en" ? "Use English" : "Usar inglês"}
              onClick={() => handleLocaleChange("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={locale === "pt" ? "is-selected" : undefined}
              aria-pressed={locale === "pt"}
              aria-label={
                locale === "en" ? "Switch to Portuguese" : "Usar português"
              }
              onClick={() => handleLocaleChange("pt")}
            >
              PT
            </button>
          </div>

          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-expanded={isOpen}
            aria-controls="site-navigation"
            aria-label={
              isOpen
                ? locale === "en"
                  ? "Close menu"
                  : "Fechar menu"
                : locale === "en"
                  ? "Open menu"
                  : "Abrir menu"
            }
            onClick={() => setIsOpen((open) => !open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
