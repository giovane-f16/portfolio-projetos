import type { ReactNode } from "react";
import {
  profile,
  projectStatusLabels,
  projects,
  type LocalizedText,
  type Project,
} from "@/data/portfolio";

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
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
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
  index,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  index: string;
  eyebrow: LocalizedText;
  title: LocalizedText;
  intro: LocalizedText;
}) {
  return (
    <div className="section-heading" data-reveal>
      <div className="section-heading-index" aria-hidden="true">
        {index}
      </div>
      <div>
        <p className="section-kicker">
          <Copy text={eyebrow} />
        </p>
        <h2 id={id}>
          <Copy text={title} />
        </h2>
        <p className="section-intro">
          <Copy text={intro} />
        </p>
      </div>
    </div>
  );
}

function getProjectType(project: Project): LocalizedText {
  if (project.technologies.includes("WordPress")) {
    return { en: "Web platform", pt: "Plataforma web" };
  }

  if (project.technologies.includes("Node.js")) {
    return { en: "Backend", pt: "Backend" };
  }

  return { en: "Product", pt: "Produto" };
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const status = projectStatusLabels[project.status];

  return (
    <article
      className={`project-card${index === 0 ? " project-card-featured" : ""}`}
      data-reveal
    >
      <div className="project-card-topline">
        <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
        <span className="project-category">
          <Copy text={getProjectType(project)} />
        </span>
        <span className={`project-status status-${project.status}`}>
          <span aria-hidden="true" />
          <Copy text={status} />
        </span>
      </div>

      <div className="project-card-body">
        <p className="project-period">
          <Copy text={project.period} />
          {project.association ? ` · ${project.association}` : ""}
        </p>
        <h3 translate="no">{project.title}</h3>
        <p className="project-summary">
          <Copy text={project.summary} />
        </p>

        <dl className="project-evidence">
          {project.problem ? (
            <div>
              <dt>
                <Copy text={{ en: "Challenge", pt: "Desafio" }} />
              </dt>
              <dd>
                <Copy text={project.problem} />
              </dd>
            </div>
          ) : null}
          <div>
            <dt>
              <Copy text={{ en: "Outcome", pt: "Resultado" }} />
            </dt>
            <dd>
              <Copy text={project.outcomes[0]} />
            </dd>
          </div>
        </dl>
      </div>

      <div className="project-card-footer">
        <ul className="tag-list" translate="no">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        {project.status === "online" && project.url ? (
          <ExternalLink className="text-link" href={project.url}>
            <Copy text={{ en: "View Project", pt: "Ver projeto" }} />
          </ExternalLink>
        ) : (
          <span className="project-unavailable">
            <Copy text={{ en: "Link Unavailable", pt: "Link indisponível" }} />
          </span>
        )}
      </div>
    </article>
  );
}

export function Main() {
  const contactUrl = resolveContactUrl();

  return (
    <main id="conteudo" tabIndex={-1}>
      <section className="hero shell" id="sobre" aria-labelledby="hero-title">
        <div className="hero-orbit" aria-hidden="true" />
        <div className="hero-layout">
          <div className="hero-copy" data-reveal>
            <div className="availability-line">
              <span className="availability-dot" aria-hidden="true" />
              <Copy text={profile.availability} />
            </div>
            <p className="hero-role">
              {profile.professionalName} <span aria-hidden="true">/</span>{" "}
              <Copy text={profile.role} />
            </p>
            <h1 id="hero-title">
              <Copy
                text={{
                  en: "Building Reliable Digital Products, End to End.",
                  pt: "Construindo produtos digitais confiáveis, de ponta a ponta.",
                }}
              />
            </h1>
            <p className="hero-summary">
              <Copy text={profile.summary} />
            </p>
            <div className="hero-actions">
              <button className="button button-primary" data-scroll-to="projetos">
                <Copy text={{ en: "Explore Selected Work", pt: "Conheça os projetos" }} />
                <span aria-hidden="true">↓</span>
              </button>
              <button
                className="button button-secondary"
                data-scroll-to="experiencia"
              >
                <Copy text={{ en: "View Experience", pt: "Ver experiência" }} />
              </button>
            </div>
          </div>

          <aside
            className="profile-card"
            aria-labelledby="profile-overview-title"
            data-reveal
          >
            <div className="profile-card-header">
              <span id="profile-overview-title">
                <Copy text={{ en: "Profile Overview", pt: "Visão do perfil" }} />
              </span>
              <span>GF—01</span>
            </div>
            <div className="profile-monogram" aria-hidden="true">
              GF
            </div>
            <div className="profile-identity">
              <strong translate="no">{profile.name}</strong>
              <span>
                <Copy text={profile.role} />
              </span>
              <span>
                <Copy text={profile.location} />
              </span>
            </div>
            <div className="profile-competencies">
              <p>
                <Copy text={{ en: "Core competencies", pt: "Competências centrais" }} />
              </p>
              <ul>
                {profile.keyCompetencies.map((competency) => (
                  <li key={competency.en}>
                    <span aria-hidden="true">+</span>
                    <Copy text={competency} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="profile-links">
              {profile.socialLinks.map((link) => (
                <ExternalLink href={link.href} key={link.label}>
                  <span translate="no">{link.label}</span>
                </ExternalLink>
              ))}
            </div>
          </aside>
        </div>

        <div className="metric-grid" data-reveal>
          {profile.impactMetrics.map((metric, index) => (
            <div className="metric" key={metric.value.en}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>
                <Copy text={metric.value} />
              </strong>
              <p>
                <Copy text={metric.label} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="content-section expertise-section"
        id="habilidades"
        aria-labelledby="expertise-title"
      >
        <div className="shell">
          <SectionHeading
            id="expertise-title"
            index="01"
            eyebrow={{ en: "Expertise", pt: "Especialidades" }}
            title={{
              en: "Engineering Breadth. Delivery Focus.",
              pt: "Amplitude técnica. Foco em entrega.",
            }}
            intro={{
              en: "A full-stack practice connecting interface quality, platform reliability, and the operational detail required to ship with confidence.",
              pt: "Uma atuação full stack que conecta qualidade de interface, confiabilidade de plataforma e o rigor operacional necessário para entregar com segurança.",
            }}
          />

          <div className="capability-grid">
            {profile.capabilities.map((capability) => (
              <article className="capability-card" key={capability.index} data-reveal>
                <span className="capability-index">{capability.index}</span>
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

          <div className="stack-directory" data-reveal>
            <div className="stack-directory-heading">
              <p>
                <Copy text={{ en: "Technology directory", pt: "Diretório de tecnologias" }} />
              </p>
              <span>
                <Copy text={{ en: "Current professional toolkit", pt: "Ferramentas profissionais atuais" }} />
              </span>
            </div>
            <div className="stack-group-grid">
              {profile.skillGroups.map((group) => (
                <div className="stack-group" key={group.title.en}>
                  <h3>
                    <Copy text={group.title} />
                  </h3>
                  <p translate="no">{group.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="content-section experience-section shell"
        id="experiencia"
        aria-labelledby="experience-title"
      >
        <SectionHeading
          id="experience-title"
          index="02"
          eyebrow={{ en: "Experience", pt: "Experiência" }}
          title={{
            en: "Experience Built in Production.",
            pt: "Experiência construída em produção.",
          }}
          intro={{
            en: "A career developed through software delivery, platform operations, and direct support for real organizations and users.",
            pt: "Uma trajetória desenvolvida entre entrega de software, operação de plataformas e suporte direto a organizações e usuários reais.",
          }}
        />

        <div className="experience-layout">
          <div className="timeline">
            {profile.experiences.map((experience, index) => (
              <article
                className="experience-item"
                key={`${experience.organization}-${experience.role.en}`}
                data-reveal
              >
                <div className="timeline-marker" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="experience-meta">
                  <p>
                    <Copy text={experience.period} />
                  </p>
                  {experience.location ? (
                    <span>
                      <Copy text={experience.location} />
                    </span>
                  ) : null}
                </div>
                <h3 translate="no">{experience.organization}</h3>
                <p className="experience-role">
                  <Copy text={experience.role} />
                </p>
                <ul>
                  {experience.highlights.map((highlight) => (
                    <li key={highlight.en}>
                      <Copy text={highlight} />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <aside className="credentials-panel" data-reveal>
            <div className="credential-group">
              <p className="credential-label">
                <Copy text={{ en: "Education", pt: "Formação" }} />
              </p>
              <ul>
                {profile.education.map((item) => (
                  <li key={item.course.en}>
                    <span translate="no">{item.institution}</span>
                    <strong>
                      <Copy text={item.course} />
                    </strong>
                    <small>
                      <Copy text={item.period} />
                    </small>
                  </li>
                ))}
              </ul>
            </div>

            <div className="credential-group credential-compact">
              <p className="credential-label">
                <Copy text={{ en: "Languages", pt: "Idiomas" }} />
              </p>
              <ul>
                {profile.languages.map((language) => (
                  <li key={language.name.en}>
                    <strong>
                      <Copy text={language.name} />
                    </strong>
                    <small>
                      <Copy text={language.proficiency} />
                    </small>
                  </li>
                ))}
              </ul>
            </div>

            <div className="credential-group credential-compact">
              <p className="credential-label">
                <Copy text={{ en: "Certifications", pt: "Certificações" }} />
              </p>
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

      <section
        className="content-section projects-section"
        id="projetos"
        aria-labelledby="projects-title"
      >
        <div className="shell">
          <SectionHeading
            id="projects-title"
            index="03"
            eyebrow={{ en: "Selected work", pt: "Projetos selecionados" }}
            title={{
              en: "Work With a Clear Purpose.",
              pt: "Projetos com propósito claro.",
            }}
            intro={{
              en: "A selection of educational, editorial, API, and institutional products — presented through their context and delivered outcome.",
              pt: "Uma seleção de produtos educacionais, editoriais, APIs e plataformas institucionais — apresentados por contexto e resultado entregue.",
            }}
          />
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="contact-section shell"
        id="contato"
        aria-labelledby="contact-title"
      >
        <div className="contact-card" data-reveal>
          <div className="contact-watermark" aria-hidden="true">
            GF
          </div>
          <div className="contact-copy">
            <p className="section-kicker">
              <Copy text={{ en: "04 · Start a conversation", pt: "04 · Inicie uma conversa" }} />
            </p>
            <h2 id="contact-title">
              <Copy
                text={{
                  en: "Let’s Turn the Next Challenge into a Dependable Product.",
                  pt: "Vamos transformar o próximo desafio em um produto confiável.",
                }}
              />
            </h2>
            <p>
              <Copy
                text={{
                  en: "For product opportunities, technical challenges, or collaborations, reach out through the configured channel or a professional network.",
                  pt: "Para oportunidades de produto, desafios técnicos ou colaborações, entre em contato pelo canal configurado ou por uma rede profissional.",
                }}
              />
            </p>
          </div>
          <div className="contact-actions">
            <ExternalLink className="button button-light" href={contactUrl}>
              <Copy text={{ en: "Start a Conversation", pt: "Iniciar conversa" }} />
            </ExternalLink>
            {profile.socialLinks.map((link) =>
              isSameDestination(link.href, contactUrl) ? null : (
                <ExternalLink className="button button-ghost-light" href={link.href} key={link.label}>
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
