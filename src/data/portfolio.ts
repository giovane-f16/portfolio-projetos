export type Locale = "en" | "pt";

export interface LocalizedText {
  en: string;
  pt: string;
}

export interface ImpactMetric {
  value: LocalizedText;
  label: LocalizedText;
  context: LocalizedText;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Capability {
  index: string;
  title: LocalizedText;
  description: LocalizedText;
  technologies: string[];
}

export interface SkillGroup {
  title: LocalizedText;
  items: string[];
}

export interface Experience {
  organization: string;
  role: LocalizedText;
  period: LocalizedText;
  location?: LocalizedText;
  highlights: LocalizedText[];
}

export interface Education {
  course: LocalizedText;
  institution: string;
  period: LocalizedText;
}

export interface SpokenLanguage {
  name: LocalizedText;
  proficiency: LocalizedText;
}

export interface PortfolioProfile {
  name: string;
  professionalName: string;
  role: LocalizedText;
  location: LocalizedText;
  summary: LocalizedText;
  availability: LocalizedText;
  impactMetrics: ImpactMetric[];
  socialLinks: SocialLink[];
  capabilities: Capability[];
  skillGroups: SkillGroup[];
  keyCompetencies: LocalizedText[];
  experiences: Experience[];
  education: Education[];
  languages: SpokenLanguage[];
  certifications: LocalizedText[];
}

export interface ProjectImage {
  src: string;
  alt: LocalizedText;
  focalPoint: `${number}% ${number}%`;
  source: string;
  provisional: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  period: LocalizedText;
  association?: string;
  summary: LocalizedText;
  problem?: LocalizedText;
  contribution?: LocalizedText;
  outcomes: LocalizedText[];
  technologies: string[];
  url?: string;
  repositoryUrl?: string;
  status: "online" | "offline" | "archived";
  image?: ProjectImage;
  sortOrder: number;
}

export const projectStatusLabels: Record<Project["status"], LocalizedText> = {
  online: { en: "Live", pt: "Online" },
  offline: { en: "Offline", pt: "Fora do ar" },
  archived: { en: "Archived", pt: "Arquivado" },
};

export const profile: PortfolioProfile = {
  name: "Giovane Ferreira da Silva",
  professionalName: "Giovane Ferreira",
  role: {
    en: "Full Stack Developer",
    pt: "Desenvolvedor Full Stack",
  },
  location: {
    en: "São Paulo, Brazil",
    pt: "São Paulo, Brasil",
  },
  summary: {
    en: "I’ve been coding since 2020. Today I build PHP systems, WordPress plugins, APIs, and mobile apps at Fundação Cásper Líbero.",
    pt: "Programo desde 2020. Hoje faço sistemas em PHP, plugins WordPress, APIs e apps na Fundação Cásper Líbero.",
  },
  availability: {
    en: "Based in São Paulo · Working across web and mobile",
    pt: "Em São Paulo · Atuação em web e mobile",
  },
  impactMetrics: [
    {
      value: { en: "5+ years", pt: "5+ anos" },
      label: { en: "professional experience", pt: "de experiência profissional" },
      context: {
        en: "Working in technology since October 2020.",
        pt: "Atuação profissional em tecnologia desde outubro de 2020.",
      },
    },
    {
      value: { en: "End to end", pt: "Ponta a ponta" },
      label: { en: "frontend, backend, and cloud", pt: "frontend, backend e cloud" },
      context: {
        en: "Experience across the complete product lifecycle.",
        pt: "Experiência em todo o ciclo de produtos digitais.",
      },
    },
    {
      value: { en: "Web + Mobile", pt: "Web + Mobile" },
      label: { en: "multiplatform delivery", pt: "entrega multiplataforma" },
      context: {
        en: "Web applications and mobile publishing experience.",
        pt: "Experiência com aplicações web e publicação mobile.",
      },
    },
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/giovane-f16" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/giovane-f16" },
  ],
  capabilities: [
    {
      index: "01",
      title: { en: "Interfaces", pt: "Interfaces" },
      description: {
        en: "I turn prototypes into web and mobile screens that are easy to maintain.",
        pt: "Transformo protótipos em telas web e mobile fáceis de manter.",
      },
      technologies: ["React", "Next.js", "TypeScript", "Angular", "Ionic"],
    },
    {
      index: "02",
      title: { en: "Back end", pt: "Back-end" },
      description: {
        en: "I build APIs, WordPress plugins, and secure integrations.",
        pt: "Faço APIs, plugins WordPress e integrações seguras.",
      },
      technologies: ["PHP", "WordPress", "Python", "Node.js", "MySQL", "PostgreSQL", "MongoDB"],
    },
    {
      index: "03",
      title: { en: "Delivery", pt: "Entrega" },
      description: {
        en: "I test, monitor, and ship with Docker and CI/CD.",
        pt: "Testo, monitoro e publico com Docker e CI/CD.",
      },
      technologies: ["Docker", "CI/CD", "AWS", "E2E", "Git"],
    },
  ],
  skillGroups: [
    {
      title: { en: "Frontend & mobile", pt: "Frontend e mobile" },
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Angular", "Ionic"],
    },
    {
      title: { en: "Backend & CMS", pt: "Backend e CMS" },
      items: ["PHP", "WordPress", "Python", "Node.js", "REST APIs"],
    },
    {
      title: { en: "Data & cloud", pt: "Dados e cloud" },
      items: ["MySQL", "PostgreSQL", "MongoDB", "AWS", "Docker"],
    },
    {
      title: { en: "Architecture & workflow", pt: "Arquitetura e processos" },
      items: ["System Design", "Clean Architecture", "Microservices", "CI/CD", "Jira", "SOLID"],
    },
  ],
  keyCompetencies: [
    { en: "System Design", pt: "Design de sistemas" },
    { en: "Clean Architecture", pt: "Arquitetura limpa" },
    { en: "Microservices", pt: "Microsserviços" },
  ],
  experiences: [
    {
      organization: "Fundação Cásper Líbero",
      role: { en: "Junior Software Developer", pt: "Programador de Sistemas Júnior" },
      period: { en: "Oct 2022 — Present", pt: "Out 2022 — Atual" },
      location: { en: "São Paulo, Brazil", pt: "São Paulo, Brasil" },
      highlights: [
        {
          en: "I build PHP systems, WordPress plugins and themes, and REST APIs.",
          pt: "Faço sistemas em PHP, plugins e temas WordPress e APIs REST.",
        },
        {
          en: "I write unit and E2E tests and monitor apps in production.",
          pt: "Escrevo testes unitários e E2E e monitoro as aplicações.",
        },
        {
          en: "I ship Ionic and Angular apps to Google Play and the App Store.",
          pt: "Publico apps Ionic e Angular na Google Play e na App Store.",
        },
      ],
    },
    {
      organization: "Mandem Jobs — Design Studio",
      role: { en: "Full Stack Developer · Freelance", pt: "Desenvolvedor Full Stack · Freelancer" },
      period: { en: "Jul 2025 — Present", pt: "Jul 2025 — Atual" },
      highlights: [
        {
          en: "I turn layouts into responsive pages with HTML, CSS, and JavaScript.",
          pt: "Transformo layouts em páginas responsivas com HTML, CSS e JavaScript.",
        },
        {
          en: "I build email campaign templates and fix front-end issues.",
          pt: "Monto templates de e-mail marketing e corrijo problemas de front-end.",
        },
      ],
    },
    {
      organization: "Fundação Cásper Líbero",
      role: { en: "IT Intern", pt: "Estagiário de TI" },
      period: { en: "Oct 2020 — Sep 2022", pt: "Out 2020 — Set 2022" },
      location: { en: "São Paulo, Brazil", pt: "São Paulo, Brasil" },
      highlights: [
        {
          en: "I supported internal systems, networks, labs, and staff.",
          pt: "Dei suporte a sistemas, redes, laboratórios e colaboradores.",
        },
        {
          en: "I built plugins for the TV Gazeta website.",
          pt: "Fiz plugins para o site da TV Gazeta.",
        },
      ],
    },
  ],
  education: [
    {
      course: {
        en: "Postgraduate Degree in Full Stack Development",
        pt: "Pós-graduação em Full Stack Development",
      },
      institution: "FIAP",
      period: { en: "Mar 2025 — Feb 2026", pt: "Mar 2025 — Fev 2026" },
    },
    {
      course: {
        en: "Bachelor's Degree in Information Systems",
        pt: "Bacharelado em Sistemas de Informação",
      },
      institution: "UNINOVE",
      period: { en: "Jan 2019 — Dec 2022", pt: "Jan 2019 — Dez 2022" },
    },
    {
      course: {
        en: "Course in Server Administration",
        pt: "Curso em Administração de Servidores",
      },
      institution: "Centro Universitário Senac",
      period: { en: "Apr 2018 — Jul 2018", pt: "Abr 2018 — Jul 2018" },
    },
  ],
  languages: [
    {
      name: { en: "Portuguese", pt: "Português" },
      proficiency: { en: "Native or bilingual", pt: "Nativo ou bilíngue" },
    },
    {
      name: { en: "English", pt: "Inglês" },
      proficiency: {
        en: "Full professional proficiency",
        pt: "Proficiência profissional completa",
      },
    },
  ],
  certifications: [
    { en: "PHP and TDD: Testing with PHPUnit", pt: "PHP e TDD: testes com PHPUnit" },
    { en: "Object-Oriented PHP", pt: "PHP orientado a objetos" },
  ],
};

export const projects: Project[] = [
  {
    id: "project-01",
    slug: "aprendia",
    title: "Aprendia",
    period: { en: "Jan 2026 — Feb 2026", pt: "Jan 2026 — Fev 2026" },
    association: "FIAP",
    summary: {
      en: "An AI-supported education platform for creating, submitting, and assessing academic work.",
      pt: "Plataforma educacional para criação, entrega e avaliação de trabalhos acadêmicos com apoio de inteligência artificial.",
    },
    problem: {
      en: "Bring student and teacher workflows together in a single academic product.",
      pt: "Unificar os fluxos de alunos e professores em um único produto acadêmico.",
    },
    outcomes: [
      { en: "Live product available for evaluation.", pt: "Produto publicado e disponível para avaliação." },
    ],
    technologies: ["React", "Next.js", "AI"],
    url: "https://pos-tech-hackaton.vercel.app/",
    image: {
      src: "/projects/aprendia.webp",
      alt: {
        en: "Aprendia home page with areas for students and teachers.",
        pt: "Página inicial do Aprendia, com áreas para alunos e professores.",
      },
      focalPoint: "50% 0%",
      source: "https://pos-tech-hackaton.vercel.app/",
      provisional: false,
    },
    status: "online",
    sortOrder: 1,
  },
  {
    id: "project-02",
    slug: "tech-challenge-blogging",
    title: "Tech Challenge Fase 3 — Blogging",
    period: { en: "Sep 2025", pt: "Set 2025" },
    association: "FIAP",
    summary: {
      en: "A responsive publishing interface for managing and exploring editorial content.",
      pt: "Interface responsiva de publicação para gestão e exploração de conteúdo editorial.",
    },
    problem: {
      en: "Create a dedicated web experience for publishing and reading posts.",
      pt: "Criar uma experiência web dedicada à publicação e leitura de posts.",
    },
    outcomes: [
      { en: "Live interface available for evaluation.", pt: "Interface publicada e disponível para avaliação." },
    ],
    technologies: ["Next.js", "React", "TypeScript"],
    url: "https://tech-challenge-fase-3.vercel.app/",
    image: {
      src: "/projects/tech-challenge-blogging.webp",
      alt: {
        en: "Blog home page listing recent posts.",
        pt: "Página inicial do blog com a lista de posts recentes.",
      },
      focalPoint: "50% 0%",
      source: "https://tech-challenge-fase-3.vercel.app/",
      provisional: false,
    },
    status: "online",
    sortOrder: 2,
  },
  {
    id: "project-03",
    slug: "api-rest-node-js",
    title: "API REST Node.js",
    period: { en: "Jul 2025 — Aug 2025", pt: "Jul 2025 — Ago 2025" },
    association: "FIAP",
    summary: {
      en: "A deployed content API with documented endpoints for listing and managing resources.",
      pt: "API de conteúdo publicada, com endpoints documentados para listar e gerenciar recursos.",
    },
    problem: {
      en: "Expose content operations through a clear and navigable programming interface.",
      pt: "Disponibilizar operações de conteúdo por uma interface de programação clara e navegável.",
    },
    outcomes: [
      { en: "Swagger documentation and Render deployment.", pt: "Documentação Swagger e deploy na Render." },
    ],
    technologies: ["TypeScript", "Node.js", "Swagger", "REST API"],
    url: "https://tech-challenge-fase-2-54i9.onrender.com/",
    image: {
      src: "/projects/api-rest-node-js.webp",
      alt: {
        en: "Swagger documentation of the API showing the posts endpoints.",
        pt: "Documentação Swagger da API com as rotas de posts.",
      },
      focalPoint: "50% 0%",
      source: "https://tech-challenge-fase-2-54i9.onrender.com/",
      provisional: false,
    },
    status: "online",
    sortOrder: 3,
  },
  {
    id: "project-04",
    slug: "equilibrio-financeiro",
    title: "Equilíbrio Financeiro",
    period: { en: "Jan 2025 — Mar 2025", pt: "Jan 2025 — Mar 2025" },
    summary: {
      en: "An educational finance publication with native search, post listing, and category navigation.",
      pt: "Publicação educacional sobre finanças com busca nativa, listagem de posts e navegação por categorias.",
    },
    problem: {
      en: "Organize introductory investment and economics content in a usable editorial experience.",
      pt: "Organizar conteúdos introdutórios de investimentos e economia em uma experiência editorial acessível.",
    },
    outcomes: [
      { en: "Search, post listing, and categories implemented.", pt: "Busca, listagem de posts e categorias implementadas." },
    ],
    technologies: ["WordPress", "OOP"],
    status: "offline",
    sortOrder: 4,
  },
  {
    id: "project-05",
    slug: "fundacao-casper-libero",
    title: "Fundação Cásper Líbero",
    period: { en: "Dec 2024 — Mar 2025", pt: "Dez 2024 — Mar 2025" },
    association: "Fundação Cásper Líbero",
    summary: {
      en: "A custom institutional WordPress theme engineered across frontend and backend for performance, SEO, and maintainability.",
      pt: "Tema WordPress institucional desenvolvido no frontend e backend com foco em performance, SEO e manutenibilidade.",
    },
    problem: {
      en: "Modernize the technical foundation and user experience of the institutional website.",
      pt: "Modernizar a base técnica e a experiência do site institucional.",
    },
    contribution: {
      en: "Frontend and backend development of the new custom WordPress theme.",
      pt: "Desenvolvimento frontend e backend do novo tema WordPress customizado.",
    },
    outcomes: [
      { en: "Performance, SEO, and software quality improvements.", pt: "Melhorias de performance, SEO e qualidade de software." },
    ],
    technologies: ["WordPress", "PHP", "OOP"],
    url: "https://fcl.com.br/",
    image: {
      src: "/projects/fundacao-casper-libero.webp",
      alt: {
        en: "Fundação Cásper Líbero website home page.",
        pt: "Página inicial do site da Fundação Cásper Líbero.",
      },
      focalPoint: "50% 0%",
      source: "https://fcl.com.br/",
      provisional: false,
    },
    status: "online",
    sortOrder: 5,
  },
] satisfies Project[];
