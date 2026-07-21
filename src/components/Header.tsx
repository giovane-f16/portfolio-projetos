"use client";

import {
  startTransition,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const navigation = [
  { label: "Sobre", sectionId: "sobre" },
  { label: "Habilidades", sectionId: "habilidades" },
  { label: "Experiência", sectionId: "experiencia" },
  { label: "Projetos", sectionId: "projetos" },
  { label: "Contato", sectionId: "contato" },
];

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

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("sobre");
  const headerRef = useRef<HTMLElement>(null);
  const firstNavigationRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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
    scheduleUpdate();

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
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
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

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

  return (
    <header ref={headerRef} className="site-header">
      <div className="header-inner">
        <button
          className="code-brand"
          type="button"
          aria-label="Giovane Ferreira — ir para o início"
          onClick={(event) => handleNavigation(event, "sobre")}
        >
          &lt;GF /&gt;
        </button>

        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-expanded={isOpen}
          aria-controls="site-navigation"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span aria-hidden="true">{isOpen ? "×" : "☰"}</span>
        </button>

        <nav
          id="site-navigation"
          className="site-navigation"
          data-open={isOpen}
          aria-label="Navegação principal"
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
                {item.label.toLowerCase()}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
