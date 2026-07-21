import type { CSSProperties, ReactNode } from "react";
import { profile, projects, type Project } from "@/data/portfolio";

const projectAccents = ["#bcecfc", "#3c86c2", "#9c7c6d", "#e4e4e4", "#245074"];
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

function ExternalLink({
  href,
  children,
  className,
  accessibleLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  accessibleLabel?: string;
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={
        accessibleLabel ? `${accessibleLabel} (abre em uma nova aba)` : undefined
      }
    >
      {children}
      <span aria-hidden="true"> ↗</span>
      {!accessibleLabel ? (
        <span className="sr-only"> (abre em uma nova aba)</span>
      ) : null}
    </a>
  );
}

function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <p className="section-kicker">{`// ${index}. ${eyebrow}`}</p>
      <h2 id={id}>{title}</h2>
      <p className="section-intro">{intro}</p>
    </div>
  );
}

function getProjectType(project: Project) {
  if (project.technologies.includes("WordPress")) return "WordPress";
  if (project.technologies.includes("Node.js")) return "Backend";
  return "Full Stack";
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const statusLabel =
    project.status === "online" ? "Online" : "Projeto arquivado/offline";
  const style = {
    "--project-accent": projectAccents[index % projectAccents.length],
  } as CSSProperties;

  return (
    <article className="project-row" style={style} data-reveal>
      <span className="project-accent" aria-hidden="true" />
      <div className="project-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="project-main">
        <div className="project-title-line">
          <h3>{project.title}</h3>
          <span className="project-type">{getProjectType(project)}</span>
        </div>
        <p className="project-summary">{project.summary}</p>

        <dl className="project-evidence">
          {project.problem ? (
            <div>
              <dt>Contexto</dt>
              <dd>{project.problem}</dd>
            </div>
          ) : null}
          {project.contribution ? (
            <div>
              <dt>Contribuição</dt>
              <dd>{project.contribution}</dd>
            </div>
          ) : null}
          <div>
            <dt>Evidência</dt>
            <dd>{project.outcomes[0]}</dd>
          </div>
        </dl>

        <ul className="project-stack" aria-label="Tecnologias principais">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>

      <div className="project-side">
        <span className="project-period">{project.period}</span>
        <span className={`status status-${project.status}`}>
          <span className="status-dot" aria-hidden="true" />
          {statusLabel}
        </span>
        {project.status === "online" && project.url ? (
          <ExternalLink
            className="project-link"
            href={project.url}
            accessibleLabel={`Abrir projeto ${project.title}`}
          >
            Ver ao vivo
          </ExternalLink>
        ) : null}
      </div>
    </article>
  );
}

export function Main() {
  const contactUrl = resolveContactUrl();
  const projectCount = String(projects.length).padStart(2, "0");
  const impact = profile.impactMetrics[0];

  return (
    <main id="conteudo">
      <section className="hero shell" id="sobre" aria-labelledby="hero-title">
        <div className="hero-glow hero-glow-primary" aria-hidden="true" />
        <div className="hero-glow hero-glow-accent" aria-hidden="true" />

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="code-label">
              {"// 01. SOBRE · DESENVOLVEDOR FULL STACK · SÃO PAULO"}
            </p>
            <h1 id="hero-title">
              Giovane
              <br />
              <span>Ferreira</span>
            </h1>
            <p className="hero-summary">
              Construo produtos digitais de ponta a ponta — da interface às APIs e
              à infraestrutura — com foco em performance, segurança e consistência.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" data-scroll-to="projetos">
                Ver projetos <span aria-hidden="true">↓</span>
              </button>
              <ExternalLink
                className="button button-secondary"
                href={contactUrl}
                accessibleLabel="Entrar em contato com Giovane Ferreira"
              >
                Entrar em contato
              </ExternalLink>
            </div>
          </div>

          <aside className="fact-panel" aria-label="Informações confirmadas">
            <div>
              <strong>{impact.value}</strong>
              <span>{impact.label}</span>
            </div>
            <div>
              <strong>{projectCount}</strong>
              <span>projetos documentados</span>
            </div>
            <div>
              <strong>SP</strong>
              <span>São Paulo, Brasil</span>
            </div>
          </aside>
        </div>

        <div className="scroll-divider" aria-hidden="true">
          <span />
          <small>scroll para explorar</small>
          <i />
        </div>
      </section>

      <section
        className="content-section shell"
        id="habilidades"
        aria-labelledby="skills-title"
      >
        <SectionHeading
          id="skills-title"
          index="02"
          eyebrow="habilidades"
          title="Stack & ferramentas"
          intro="Tecnologias e práticas confirmadas no perfil profissional."
        />
        <div className="skill-grid">
          {profile.skillGroups.map((group) => (
            <article className="skill-card" key={group.title} data-reveal>
              <div className="skill-card-heading">
                <span aria-hidden="true">{group.symbol}</span>
                <h3>{group.title}</h3>
              </div>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        className="content-section experience-section shell"
        id="experiencia"
        aria-labelledby="experience-title"
      >
        <SectionHeading
          id="experience-title"
          index="03"
          eyebrow="experiência"
          title="Entrega com contexto."
          intro="Experiências e formação apresentadas apenas com informações confirmadas."
        />
        <div className="experience-layout">
          <div className="timeline">
            {profile.experiences.map((experience) => (
              <article
                className="experience-item"
                key={experience.organization}
                data-reveal
              >
                <span className="timeline-dot" aria-hidden="true" />
                <p className="meta-label">{experience.period}</p>
                <h3>{experience.organization}</h3>
                <p>{experience.summary}</p>
                {experience.highlights.length ? (
                  <ul>
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>

          <aside
            className="education-panel"
            aria-labelledby="education-title"
            data-reveal
          >
            <p className="meta-label">{"// formação"}</p>
            <h3 id="education-title">Base multidisciplinar</h3>
            <ul>
              {profile.education.map((item) => (
                <li key={item.course}>
                  <span>{item.institution}</span>
                  <strong>{item.course}</strong>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section
        className="content-section projects-section shell"
        id="projetos"
        aria-labelledby="projects-title"
      >
        <SectionHeading
          id="projects-title"
          index="04"
          eyebrow="projetos"
          title="Trabalhos selecionados"
          intro="Casos reais apresentados pelo problema, contribuição e evidência disponível."
        />
        <div className="project-list">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      <section
        className="contact-section shell"
        id="contato"
        aria-labelledby="contact-title"
      >
        <div className="contact-card" data-reveal>
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-content">
            <p className="code-label">{"// 05. contato"}</p>
            <h2 id="contact-title">Entre em contato.</h2>
            <p>
              Tem um produto, desafio técnico ou oportunidade? Conte o contexto pelo
              canal configurado ou pelo LinkedIn.
            </p>
            <div className="contact-actions">
              <ExternalLink
                className="button button-primary"
                href={contactUrl}
                accessibleLabel="Iniciar conversa com Giovane Ferreira"
              >
                Iniciar conversa
              </ExternalLink>
              {profile.socialLinks.map((link) =>
                isSameDestination(link.href, contactUrl) ? null : (
                  <ExternalLink
                    className="button button-secondary"
                    key={link.label}
                    href={link.href}
                  >
                    {link.label}
                  </ExternalLink>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
