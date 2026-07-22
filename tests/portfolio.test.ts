import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { resolveActiveSection } from "../src/components/Header";
import { profile, projects } from "../src/data/portfolio";

const projectRoot = resolve(import.meta.dirname, "..");

function readProjectFile(path: string) {
  return readFileSync(resolve(projectRoot, path), "utf8");
}

describe("portfolio content", () => {
  it("uses the confirmed identity and never the placeholder name from the visual reference", () => {
    expect(profile.name).toBe("Giovane Ferreira");
    expect(JSON.stringify({ profile, projects })).not.toContain("Figueiredo");
  });

  it("highlights professional experience in the hero facts", () => {
    expect(profile.impactMetrics).toEqual([
      {
        value: "5+ anos",
        label: "de experiência",
        context: "Experiência profissional desde outubro de 2020.",
      },
      {
        value: "Full Stack",
        label: "frontend, backend e cloud",
        context: "Atuação ponta a ponta em produtos digitais.",
      },
      {
        value: "Web + Mobile",
        label: "produtos multiplataforma",
        context: "Experiência com aplicações web e mobile.",
      },
    ]);
  });

  it("keeps the five documented projects in their declared order", () => {
    expect(projects).toHaveLength(5);
    expect(projects.map((project) => project.title)).toEqual([
      "Aprendia",
      "Tech Challenge Fase 3 — Blogging",
      "API REST Node.js",
      "Equilíbrio Financeiro",
      "Fundação Cásper Líbero",
    ]);
    expect(projects.map((project) => project.sortOrder)).toEqual([1, 2, 3, 4, 5]);
  });

  it("never offers a broken external action for an offline project", () => {
    const offlineProjects = projects.filter((project) => project.status !== "online");

    expect(offlineProjects).not.toHaveLength(0);
    expect(offlineProjects.every((project) => !project.url)).toBe(true);
  });

  it("gives every online project a secure URL", () => {
    const onlineProjects = projects.filter((project) => project.status === "online");

    expect(onlineProjects.every((project) => project.url?.startsWith("https://"))).toBe(true);
  });

  it("does not ship an email address in public portfolio data", () => {
    const publicContent = JSON.stringify({ profile, projects });

    expect(publicContent).not.toMatch(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i);
  });

  it("keeps image metadata accessible whenever a real image is added", () => {
    const projectsWithImages = projects.filter((project) => project.image);

    for (const project of projectsWithImages) {
      expect(project.image?.alt.trim()).toBeTruthy();
      expect(project.image?.focalPoint).toMatch(/^\d+% \d+%$/);
      expect(project.image?.source.trim()).toBeTruthy();
    }
  });

  it("organizes only documented technologies and practices in the skill groups", () => {
    const groupedSkills = profile.skillGroups.flatMap((group) => group.items);

    expect(groupedSkills).toEqual(
      expect.arrayContaining([
        "React",
        "Next.js",
        "TypeScript",
        "PHP",
        "WordPress",
        "Node.js",
        "Python",
        "AWS",
        "Docker",
        "PostgreSQL",
        "MongoDB",
        "CI/CD",
        "Clean Code",
        "SOLID",
        "Clean Architecture",
      ]),
    );
  });
});

describe("visual identity guardrails", () => {
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
        scrollY: 0,
        viewportHeight: 900,
        headerBottom: 80,
        pageHeight: 3200,
      }),
    ).toBe("sobre");

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

  it("uses the requested five-color palette", () => {
    const styles = readProjectFile("src/app/globals.css");
    const main = readProjectFile("src/components/Main.tsx");

    const palette = ["#3c86c2", "#bcecfc", "#245074", "#9c7c6d", "#e4e4e4"];
    const scaleTokens = ["--color-1", "--color-2", "--color-3", "--color-4", "--color-5"];

    for (const color of palette) expect(styles).toContain(color);
    for (const token of scaleTokens) {
      expect(styles.split(token).length - 1).toBeGreaterThanOrEqual(1);
    }
    expect(main).toContain(
      'const projectAccents = ["#bcecfc", "#3c86c2", "#9c7c6d", "#e4e4e4", "#245074"]',
    );
    expect(styles).not.toContain("color-mix");
    expect(styles).not.toMatch(/(?:[:,(])\s*(?:black|white)(?=\s|[,;)])|(?:rgb|rgba|hsl|hsla)\(/i);
    expect(`${styles}${main}`.toLowerCase()).not.toContain("#7c6dff");
    expect(main.toLowerCase()).not.toContain("#ef4444");
  });

  it("does not render the retired active marker in the header", () => {
    const header = readProjectFile("src/components/Header.tsx");

    expect(header).not.toContain('isActive ? "> "');
  });

  it("keeps internal navigation out of the browser URL", () => {
    const header = readProjectFile("src/components/Header.tsx");
    const main = readProjectFile("src/components/Main.tsx");

    expect(header).toContain("event.preventDefault()");
    expect(header).toContain("setActiveSection(sectionId)");
    expect(header).toContain("scrollIntoView");
    expect(header).not.toContain("history.pushState");
    expect(header).not.toContain("location.hash");
    expect(header).not.toMatch(/href=["']#/);
    expect(main).toContain('data-scroll-to="projetos"');
    expect(main).not.toContain('href="#projetos"');
  });

  it("uses a dark canvas and distinguishes project titles from descriptions", () => {
    const styles = readProjectFile("src/app/globals.css");

    expect(styles).toMatch(/--background:\s*#[0-9a-f]{6}/i);
    expect(styles).toMatch(
      /\.project-title-line h3\s*{[^}]*color:\s*var\(--color-2\)/,
    );
    expect(styles).toMatch(/\.project-summary\s*{[^}]*color:\s*var\(--muted\)/);
  });

  it("keeps the presentation layer to Header, Main and Footer", () => {
    const componentNames = readdirSync(resolve(projectRoot, "src/components"))
      .filter((file) => file.endsWith(".tsx"))
      .sort();
    const styles = readProjectFile("src/app/globals.css");

    expect(componentNames).toEqual(["Footer.tsx", "Header.tsx", "Main.tsx"]);
    expect(styles.split("\n").length).toBeLessThan(800);
  });

  it("keeps online project actions aligned with the success color", () => {
    const styles = readProjectFile("src/app/globals.css");

    expect(styles).toMatch(/\.project-link\s*{[^}]*color:\s*var\(--success\)/);
  });

  it("removes retired copy and disables the native development indicator", () => {
    const page = readProjectFile("src/app/page.tsx");
    const nextConfig = readProjectFile("next.config.ts");

    expect(page).not.toContain("Vamos construir");
    expect(page).not.toContain("construído com Next.js");
    expect(nextConfig).toContain("devIndicators: false");
  });

  it("provides progressive scroll reveals that respect reduced motion", () => {
    const header = readProjectFile("src/components/Header.tsx");
    const layout = readProjectFile("src/app/layout.tsx");
    const styles = readProjectFile("src/app/globals.css");

    expect(header).toContain("IntersectionObserver");
    expect(header).toContain("prefers-reduced-motion: reduce");
    expect(header).toContain("data-reveal-ready");
    expect(layout).toContain("suppressHydrationWarning");
    expect(layout).toContain("setTimeout");
    expect(styles).toContain(".reveal-enabled [data-reveal]");
  });
});
