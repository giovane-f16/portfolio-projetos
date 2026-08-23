// @vitest-environment jsdom

import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  applyLocale,
  Header,
  resolveActiveSection,
} from "../src/components/Header";
import {
  profile,
  projectStatusLabels,
  projects,
  type LocalizedText,
} from "../src/data/portfolio";

const projectRoot = resolve(import.meta.dirname, "..");

function readProjectFile(path: string) {
  return readFileSync(resolve(projectRoot, path), "utf8");
}

function expectTranslation(text: LocalizedText) {
  expect(text.en.trim()).toBeTruthy();
  expect(text.pt.trim()).toBeTruthy();
}

function installBrowserMocks(reducedMotion = false) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn((query: string) => ({
      matches: reducedMotion && query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
  Object.defineProperty(window, "requestAnimationFrame", {
    configurable: true,
    value: vi.fn(() => 1),
  });
  Object.defineProperty(window, "cancelAnimationFrame", {
    configurable: true,
    value: vi.fn(),
  });
}

afterEach(() => {
  cleanup();
  document.documentElement.dataset.locale = "en";
  document.documentElement.lang = "en";
  window.localStorage.clear();
  document.body.replaceChildren();
  vi.restoreAllMocks();
});

describe("resume-backed portfolio content", () => {
  it("uses the identity and current role from the supplied resume", () => {
    expect(profile.name).toBe("Giovane Ferreira da Silva");
    expect(profile.professionalName).toBe("Giovane Ferreira");
    expect(profile.role).toEqual({
      en: "Full Stack Developer",
      pt: "Desenvolvedor Full Stack",
    });
    expect(profile.location).toEqual({
      en: "São Paulo, Brazil",
      pt: "São Paulo, Brasil",
    });
  });

  it("publishes the three documented professional experiences", () => {
    expect(profile.experiences).toHaveLength(3);
    expect(
      profile.experiences.map(({ organization, role, period }) => ({
        organization,
        role: role.en,
        period: period.en,
      })),
    ).toEqual([
      {
        organization: "Fundação Cásper Líbero",
        role: "Junior Software Developer",
        period: "Oct 2022 — Present",
      },
      {
        organization: "Mandem Jobs — Design Studio",
        role: "Full Stack Developer · Freelance",
        period: "Jul 2025 — Present",
      },
      {
        organization: "Fundação Cásper Líbero",
        role: "IT Intern",
        period: "Oct 2020 — Sep 2022",
      },
    ]);
  });

  it("includes the education, languages, and certifications from the resume", () => {
    expect(profile.education.map((item) => item.institution)).toEqual([
      "FIAP",
      "UNINOVE",
      "Centro Universitário Senac",
    ]);
    expect(profile.languages.map((item) => item.proficiency.en)).toEqual([
      "Native or bilingual",
      "Full professional proficiency",
    ]);
    expect(profile.certifications.map((item) => item.en)).toEqual([
      "PHP and TDD: Testing with PHPUnit",
      "Object-Oriented PHP",
    ]);
  });

  it("provides complete English and Portuguese content for every public section", () => {
    [
      profile.role,
      profile.location,
      profile.summary,
      profile.availability,
      ...profile.keyCompetencies,
      ...profile.certifications,
    ].forEach(expectTranslation);

    profile.impactMetrics.forEach((metric) => {
      expectTranslation(metric.value);
      expectTranslation(metric.label);
      expectTranslation(metric.context);
    });
    profile.capabilities.forEach((capability) => {
      expectTranslation(capability.title);
      expectTranslation(capability.description);
    });
    profile.skillGroups.forEach((group) => expectTranslation(group.title));
    profile.experiences.forEach((experience) => {
      expectTranslation(experience.role);
      expectTranslation(experience.period);
      if (experience.location) expectTranslation(experience.location);
      experience.highlights.forEach(expectTranslation);
    });
    profile.education.forEach((education) => {
      expectTranslation(education.course);
      expectTranslation(education.period);
    });
    profile.languages.forEach((language) => {
      expectTranslation(language.name);
      expectTranslation(language.proficiency);
    });
    projects.forEach((project) => {
      expectTranslation(project.period);
      expectTranslation(project.summary);
      if (project.problem) expectTranslation(project.problem);
      if (project.contribution) expectTranslation(project.contribution);
      project.outcomes.forEach(expectTranslation);
      if (project.image) expectTranslation(project.image.alt);
    });
  });

  it("organizes the stack and key competencies documented by the resume", () => {
    const skills = profile.skillGroups.flatMap((group) => group.items);

    expect(skills).toEqual(
      expect.arrayContaining([
        "React",
        "Next.js",
        "TypeScript",
        "PHP",
        "WordPress",
        "Python",
        "Node.js",
        "Docker",
        "AWS",
        "PostgreSQL",
        "MongoDB",
        "System Design",
        "Clean Architecture",
        "Microservices",
      ]),
    );
  });

  it("keeps the five documented projects in their source order", () => {
    expect(projects.map((project) => project.title)).toEqual([
      "Aprendia",
      "Tech Challenge Fase 3 — Blogging",
      "API REST Node.js",
      "Equilíbrio Financeiro",
      "Fundação Cásper Líbero",
    ]);
    expect(projects.map((project) => project.sortOrder)).toEqual([1, 2, 3, 4, 5]);
  });

  it("never exposes a broken or insecure project action", () => {
    const offlineProjects = projects.filter((project) => project.status !== "online");
    const onlineProjects = projects.filter((project) => project.status === "online");

    expect(offlineProjects.every((project) => !project.url)).toBe(true);
    expect(
      onlineProjects.every((project) => project.url?.startsWith("https://")),
    ).toBe(true);
    expect(projectStatusLabels.offline).toEqual({
      en: "Offline",
      pt: "Fora do ar",
    });
    expect(projectStatusLabels.archived).toEqual({
      en: "Archived",
      pt: "Arquivado",
    });
  });

  it("does not publish the personal email address from the resume", () => {
    expect(JSON.stringify({ profile, projects })).not.toMatch(
      /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i,
    );
  });

});

describe("bilingual corporate interface", () => {
  it("uses English as the server-rendered default and remembers Portuguese", () => {
    const layout = readProjectFile("src/app/layout.tsx");

    expect(layout).toContain('<html lang="en" data-locale="en"');
    expect(layout).toContain("portfolio-locale");
  });

  it("applies Portuguese to the document, metadata, storage, and listeners", () => {
    const originalDocument = Object.getOwnPropertyDescriptor(
      globalThis,
      "document",
    );
    const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    const metadata = { setAttribute: vi.fn() };
    const root = { dataset: { locale: "en" }, lang: "en" };
    const fakeDocument = {
      documentElement: root,
      title: "",
      querySelector: vi.fn(() => metadata),
    };
    const fakeWindow = {
      localStorage: { setItem: vi.fn() },
      dispatchEvent: vi.fn(),
    };

    Object.defineProperty(globalThis, "document", {
      configurable: true,
      value: fakeDocument,
    });
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: fakeWindow,
    });

    try {
      applyLocale("pt");

      expect(root).toEqual({ dataset: { locale: "pt" }, lang: "pt-BR" });
      expect(fakeDocument.title).toBe(
        "Giovane Ferreira — Desenvolvedor Full Stack",
      );
      expect(metadata.setAttribute).toHaveBeenCalledWith(
        "content",
        expect.stringContaining("Portfólio de Giovane Ferreira"),
      );
      expect(fakeWindow.localStorage.setItem).toHaveBeenCalledWith(
        "portfolio-locale",
        "pt",
      );
      expect(fakeWindow.dispatchEvent).toHaveBeenCalledOnce();
    } finally {
      if (originalDocument) {
        Object.defineProperty(globalThis, "document", originalDocument);
      } else {
        Reflect.deleteProperty(globalThis, "document");
      }

      if (originalWindow) {
        Object.defineProperty(globalThis, "window", originalWindow);
      } else {
        Reflect.deleteProperty(globalThis, "window");
      }
    }
  });

  it("restores Portuguese and changes locale through the rendered controls", async () => {
    installBrowserMocks();
    document.documentElement.dataset.locale = "pt";

    render(createElement(Header));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Usar português" }).getAttribute(
          "aria-pressed",
        ),
      ).toBe("true");
    });
    expect(document.documentElement.lang).toBe("pt-BR");

    fireEvent.click(screen.getByRole("button", { name: "Usar inglês" }));

    expect(document.documentElement.dataset.locale).toBe("en");
    expect(document.documentElement.lang).toBe("en");
    expect(window.localStorage.getItem("portfolio-locale")).toBe("en");
    expect(
      screen.getByRole("group", { name: "Language selector" }),
    ).toBeTruthy();
  });

  it("scrolls without a hash and honors reduced motion at runtime", () => {
    installBrowserMocks(true);
    document.body.insertAdjacentHTML(
      "beforeend",
      '<button data-scroll-to="experiencia">Go</button><section id="experiencia" data-reveal></section>',
    );
    const experience = document.getElementById("experiencia");
    const scrollIntoView = vi.fn();
    Object.defineProperty(experience, "scrollIntoView", {
      configurable: true,
      value: scrollIntoView,
    });

    render(createElement(Header));
    fireEvent.click(screen.getByRole("button", { name: "Go" }));

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "auto",
      block: "start",
    });
    expect(window.location.hash).toBe("");
    expect(experience?.classList.contains("is-revealed")).toBe(true);
  });

  it("moves focus into the mobile menu and restores it on Escape", async () => {
    installBrowserMocks();
    render(createElement(Header));
    const menuButton = screen.getByRole("button", { name: "Open menu" });
    const firstNavigationButton = screen.getByText("Profile").closest("button");

    fireEvent.click(menuButton);
    await waitFor(() => expect(document.activeElement).toBe(firstNavigationButton));

    fireEvent.keyDown(window, { key: "Escape" });

    expect(menuButton.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(menuButton);
  });

  it("changes sections without writing navigation fragments to the URL", () => {
    const header = readProjectFile("src/components/Header.tsx");
    const main = readProjectFile("src/components/Main.tsx");

    expect(header).toContain("event.preventDefault()");
    expect(header).toContain("setActiveSection(sectionId)");
    expect(header).toContain("scrollIntoView");
    expect(header).not.toContain("history.pushState");
    expect(header).not.toContain("location.hash");
    expect(header).not.toMatch(/href=["']#/);
    expect(main).toContain('data-scroll-to="projetos"');
    expect(main).toContain('data-scroll-to="experiencia"');
    expect(main).not.toMatch(/href=["']#(?:sobre|habilidades|experiencia|projetos|contato)/);
  });

  it("keeps the active navigation item aligned with the visible section", () => {
    const sections = [
      { id: "sobre", top: -700, bottom: 80 },
      { id: "habilidades", top: 80, bottom: 480 },
      { id: "experiencia", top: 480, bottom: 1200 },
      { id: "projetos", top: 1200, bottom: 2000 },
      { id: "contato", top: 2000, bottom: 2400 },
    ];

    expect(
      resolveActiveSection({
        sections,
        scrollY: 700,
        viewportHeight: 900,
        headerBottom: 80,
        pageHeight: 3200,
      }),
    ).toBe("experiencia");
    expect(
      resolveActiveSection({
        sections,
        scrollY: 2300,
        viewportHeight: 900,
        headerBottom: 80,
        pageHeight: 3200,
      }),
    ).toBe("contato");
  });

  it("implements the corporate visual tokens and clear project hierarchy", () => {
    const styles = readProjectFile("src/app/globals.css");

    expect(styles).toContain("--navy-950: #07111f");
    expect(styles).toContain("--blue-500: #4f8ff7");
    expect(styles).toContain("--sand-100: #f6f3ec");
    expect(styles).toMatch(/body\s*{[\s\S]*?background:/);
    expect(styles).toMatch(/\.project-card h3\s*{[\s\S]*?color:/);
    expect(styles).toMatch(/\.project-summary\s*{[\s\S]*?color:/);
    expect(styles).toMatch(
      /\.locale-switch button\s*{[\s\S]*?min-width:\s*44px;[\s\S]*?min-height:\s*44px;/,
    );
    expect(styles).not.toContain("min-width: 34px");
    expect(styles.split("\n").length).toBeLessThan(800);
  });

  it("ships a branded application favicon", () => {
    const icon = readProjectFile("src/app/icon.svg");

    expect(icon).toContain('viewBox="0 0 64 64"');
    expect(icon).toContain('fill="#4f8ff7"');
    expect(icon).toContain('fill="#07111f"');
  });

  it("keeps only the three focused presentation components", () => {
    const componentNames = readdirSync(resolve(projectRoot, "src/components"))
      .filter((file) => file.endsWith(".tsx"))
      .sort();

    expect(componentNames).toEqual(["Footer.tsx", "Header.tsx", "Main.tsx"]);
  });

  it("provides progressive reveals and reduced-motion support", () => {
    const header = readProjectFile("src/components/Header.tsx");
    const layout = readProjectFile("src/app/layout.tsx");
    const styles = readProjectFile("src/app/globals.css");

    expect(header).toContain("IntersectionObserver");
    expect(header).toContain("prefers-reduced-motion: reduce");
    expect(header).toContain("data-reveal-ready");
    expect(layout).toContain("suppressHydrationWarning");
    expect(layout).toContain("window.setTimeout");
    expect(styles).toContain(".reveal-enabled [data-reveal]");
    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
