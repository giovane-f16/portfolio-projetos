import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import {
  profile,
  projectStatusLabels,
  projects,
  type LocalizedText,
  type Project,
} from "@/data/portfolio";
import { CarouselTrack } from "./CarouselTrack";

const linkedInUrl =
  profile.socialLinks.find((link) => link.label === "LinkedIn")?.href ??
  "https://www.linkedin.com/";

function resolveContactUrl(configuredUrl = process.env.CONTACT_URL) {
  if (!configuredUrl) return linkedInUrl;

  try {
    const url = new URL(configuredUrl);
    return url.protocol === "https:" ? url.toString() : linkedInUrl;
  } catch {
    return linkedInUrl;
  }
}

function isSameDestination(firstUrl: string, secondUrl: string) {
  const normalizePath = (path: string) => path.replace(/\/+$/, "");
  const first = new URL(firstUrl);
  const second = new URL(secondUrl);

  return (
    first.origin === second.origin &&
    normalizePath(first.pathname) === normalizePath(second.pathname) &&
    first.search === second.search
  );
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

function ExternalLink({
  href,
  children,
  className,
  tabIndex,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tabIndex?: number;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer" tabIndex={tabIndex}>
      {children}
      <span className="link-arrow" aria-hidden="true">
        ↗
      </span>
      <span className="sr-only">
        <Copy
          text={{
            en: " (opens in a new tab)",
            pt: " (abre em uma nova aba)",
          }}
        />
      </span>
    </a>
  );
}

function SectionHeading({
  id,
  kicker,
  title,
  intro,
}: {
  id: string;
  kicker: LocalizedText;
  title: LocalizedText;
  intro?: LocalizedText;
}) {
  return (
    <div className="section-heading" data-reveal>
      <p className="section-kicker">
        <Copy text={kicker} />
      </p>
      <h2 id={id}>
        <Copy text={title} />
      </h2>
      {intro ? (
        <p className="section-intro">
          <Copy text={intro} />
        </p>
      ) : null}
    </div>
  );
}

function ProjectThumbnail({ project }: { project: Project }) {
  if (!project.image) {
    return (
      <div className="project-thumb project-thumb-empty">
        <Image src="/logo.svg" alt="" width={56} height={56} unoptimized />
        <span translate="no">{project.title}</span>
      </div>
    );
  }

  const { src, alt, focalPoint } = project.image;

  return (
    <div className="project-thumb">
      {(["en", "pt"] as const).map((locale) => (
        <span data-locale-copy={locale} lang={locale === "pt" ? "pt-BR" : undefined} key={locale}>
          <Image
            src={src}
            alt={alt[locale]}
            fill
            sizes="(max-width: 767px) 80vw, 380px"
            style={{ objectPosition: focalPoint }}
          />
        </span>
      ))}
    </div>
  );
}

function ProjectCard({ project, isLoopCopy = false }: { project: Project; isLoopCopy?: boolean }) {
  const status = projectStatusLabels[project.status];

  return (
    <article className="project-card">
      <ProjectThumbnail project={project} />
      <div className="project-card-body">
        <p className="project-period">
          <span>
            <Copy text={project.period} />
            {project.association ? ` · ${project.association}` : ""}
          </span>
          <span className={`project-status status-${project.status}`}>
            <span aria-hidden="true" />
            <Copy text={status} />
          </span>
        </p>
        <h3 translate="no">{project.title}</h3>
        <p className="project-summary">
          <Copy text={project.summary} />
        </p>
        <div className="project-card-footer">
          <ul className="tag-list" translate="no">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          {project.status === "online" && project.url ? (
            <ExternalLink className="text-link" href={project.url} tabIndex={isLoopCopy ? -1 : undefined}>
              <Copy text={{ en: "View Project", pt: "Ver projeto" }} />
            </ExternalLink>
          ) : (
            <span className="project-unavailable">
              <Copy text={{ en: "Link Unavailable", pt: "Link indisponível" }} />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectCarousel() {
  return (
    <div className="project-carousel" data-reveal>
      <label className="carousel-control">
        <input className="carousel-toggle" type="checkbox" />
        <Copy text={{ en: "Pause animation", pt: "Pausar animação" }} />
      </label>
      <div className="carousel-viewport">
        <CarouselTrack>
          <ul className="carousel-group">
            {projects.map((project) => (
              <li key={project.id}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
          <ul className="carousel-group" aria-hidden="true">
            {projects.map((project) => (
              <li key={project.id}>
                <ProjectCard project={project} isLoopCopy />
              </li>
            ))}
          </ul>
        </CarouselTrack>
      </div>
    </div>
  );
}

export function Main() {
  const contactUrl = resolveContactUrl();

  return (
    <main id="conteudo" tabIndex={-1}>
      <section className="hero-block" id="sobre" aria-labelledby="hero-title">
        <div className="hero shell">
          <div className="hero-copy">
            <p className="hero-eyebrow hero-enter" style={{ "--enter-delay": "80ms" } as CSSProperties}>
              <Copy text={profile.role} /> <span aria-hidden="true">·</span>{" "}
              <Copy text={profile.location} />
            </p>
            <h1 id="hero-title" translate="no">
              <span className="hero-title-line">
                <span style={{ "--enter-delay": "180ms" } as CSSProperties}>Giovane</span>
              </span>
              <br />
              <span className="hero-title-line">
                <span style={{ "--enter-delay": "300ms" } as CSSProperties}>Ferreira</span>
              </span>
            </h1>
            <p className="hero-summary hero-enter" style={{ "--enter-delay": "480ms" } as CSSProperties}>
              <Copy text={profile.summary} />
            </p>
            <div className="hero-actions hero-enter" style={{ "--enter-delay": "600ms" } as CSSProperties}>
              <button className="button button-light" data-scroll-to="projetos">
                <Copy text={{ en: "See my projects", pt: "Ver meus projetos" }} />
                <span aria-hidden="true">↓</span>
              </button>
              <button className="button button-outline-light" data-scroll-to="experiencia">
                <Copy text={{ en: "Where I’ve worked", pt: "Onde trabalhei" }} />
              </button>
            </div>
          </div>

          <div className="hero-signature" aria-hidden="true">
            <Image src="/logo.svg" alt="" width={360} height={363} unoptimized priority />
          </div>

          <div className="hero-now hero-enter" style={{ "--enter-delay": "760ms" } as CSSProperties}>
            <div className="hero-links">
              {profile.socialLinks.map((link) => (
                <ExternalLink href={link.href} key={link.label}>
                  <span translate="no">{link.label}</span>
                </ExternalLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-section projects-section" id="projetos" aria-labelledby="projects-title">
        <div className="shell">
          <SectionHeading
            id="projects-title"
            kicker={{ en: "Projects", pt: "Projetos" }}
            title={{ en: "What I’ve built", pt: "O que eu construí" }}
            intro={{
              en: "Projects in general, client work, and sites in production.",
              pt: "Projetos em geral, trabalhos para clientes e sites em produção.",
            }}
          />
        </div>
        <ProjectCarousel />
      </section>

      <section className="content-section skills-section shell" id="habilidades" aria-labelledby="skills-title">
        <div className="skills-block">
          <SectionHeading
            id="skills-title"
            kicker={{ en: "Skills", pt: "Habilidades" }}
            title={{ en: "What I work with", pt: "Com o que trabalho" }}
          />
          <div className="skill-grid">
            {profile.capabilities.map((capability) => (
              <article className="skill-card" key={capability.index} data-reveal>
                <h3>
                  <Copy text={capability.title} />
                </h3>
                <p>
                  <Copy text={capability.description} />
                </p>
                <ul className="tag-list" translate="no">
                  {capability.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section experience-section shell" id="experiencia" aria-labelledby="experience-title">
        <SectionHeading
          id="experience-title"
          kicker={{ en: "Experience", pt: "Experiência" }}
          title={{ en: "Where I’ve worked", pt: "Onde trabalhei" }}
        />

        <div className="experience-layout">
          <ol className="job-list">
            {profile.experiences.map((experience) => (
              <li className="job" key={`${experience.organization}-${experience.role.en}`} data-reveal>
                <p className="job-period">
                  <Copy text={experience.period} />
                </p>
                <div>
                  <h3>
                    <Copy text={experience.role} />
                  </h3>
                  <p className="job-org" translate="no">
                    {experience.organization}
                  </p>
                  <ul>
                    {experience.highlights.map((highlight) => (
                      <li key={highlight.en}>
                        <Copy text={highlight} />
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <aside className="credentials" data-reveal>
            <div className="credential-group">
              <h3>
                <Copy text={{ en: "Education", pt: "Formação" }} />
              </h3>
              <ul>
                {profile.education.map((item) => (
                  <li key={item.course.en}>
                    <strong>
                      <Copy text={item.course} />
                    </strong>
                    <span>
                      <span translate="no">{item.institution}</span> · <Copy text={item.period} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="credential-group">
              <h3>
                <Copy text={{ en: "Languages", pt: "Idiomas" }} />
              </h3>
              <ul>
                {profile.languages.map((language) => (
                  <li key={language.name.en}>
                    <strong>
                      <Copy text={language.name} />
                    </strong>
                    <span>
                      <Copy text={language.proficiency} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="credential-group">
              <h3>
                <Copy text={{ en: "Certificates", pt: "Certificados" }} />
              </h3>
              <ul>
                {profile.certifications.map((certification) => (
                  <li key={certification.en}>
                    <strong>
                      <Copy text={certification} />
                    </strong>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="contact-section shell" id="contato" aria-labelledby="contact-title">
        <div className="contact-block" data-reveal>
          <div>
            <h2 id="contact-title">
              <Copy text={{ en: "Got a project or a job opening?", pt: "Tem um projeto ou uma vaga?" }} />
            </h2>
            <p>
              <Copy
                text={{
                  en: "Send me a message on LinkedIn. My code is on GitHub.",
                  pt: "Me chama no LinkedIn. Meu código está no GitHub.",
                }}
              />
            </p>
          </div>
          <div className="contact-actions">
            <ExternalLink className="button button-light" href={contactUrl}>
              <Copy text={{ en: "Message me", pt: "Falar comigo" }} />
            </ExternalLink>
            {profile.socialLinks.map((link) =>
              isSameDestination(link.href, contactUrl) ? null : (
                <ExternalLink className="button button-outline-light" href={link.href} key={link.label}>
                  <span translate="no">{link.label}</span>
                </ExternalLink>
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
