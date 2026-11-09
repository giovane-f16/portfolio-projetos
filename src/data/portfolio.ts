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
    en: "Product Engineer",
    pt: "Product Engineer",
  },
  location: {
    en: "São Paulo, Brazil",
    pt: "São Paulo, Brasil",
  },
  summary: {
    en: "I turn ideas into complete systems, from planning to launch, built around the people who use them.",
    pt: "Transformo ideias em sistemas completos, do planejamento ao lançamento, com foco em quem vai usar.",
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
      title: { en: "Web applications", pt: "Aplicações Web" },
      description: {
        en: "I build complete websites, from landing pages to full systems with integrations.",
        pt: "Construo sites completos, desde landing pages a sistemas completos com integrações.",
      },
      technologies: ["React", "Next.js", "TypeScript", "WordPress", "PHP"],
    },
    {
      index: "02",
      title: { en: "Mobile apps", pt: "Aplicativos móveis" },
      description: {
        en: "I build mobile apps compatible with iOS and Android devices.",
        pt: "Crio aplicativos móveis com compatibilidade para dispositivos iOS e Android.",
      },
      technologies: ["Ionic", "Angular", "TypeScript", "iOS", "Android"],
    },
    {
      index: "03",
      title: { en: "Publishing", pt: "Publicação" },
      description: {
        en: "I handle infrastructure, security, and performance, so your project goes live stable and fast.",
        pt: "Cuido da infraestrutura, da segurança e da performance, para seu projeto ir ao ar estável e rápido.",
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
    slug: "sao-silvestre-2026",
    title: "São Silvestre 2026",
    period: { en: "Aug 2026 — Oct 2026", pt: "Ago 2026 — Out 2026" },
    association: "Fundação Cásper Líbero",
    summary: {
      en: "Relaunch of the site for the biggest street race in Latin America. I led it from prototype to go-live.",
      pt: "Relançamento do site da maior corrida de rua da América Latina. Conduzi do protótipo à virada em produção.",
    },
    outcomes: [
      { en: "Formal spec written before any code.", pt: "Especificação formal escrita antes do código." },
    ],
    technologies: ["Spec-Driven Development", "Web", "Claude Code"],
    url: "https://www.saosilvestre.com.br/",
    image: {
      src: "/projects/sao-silvestre-2026.webp",
      alt: {
        en: "São Silvestre home page with the race logo and sign-up button.",
        pt: "Página inicial da São Silvestre com o logo da prova e o botão de inscrição.",
      },
      focalPoint: "50% 0%",
      source: "https://www.saosilvestre.com.br/",
      provisional: false,
    },
    status: "online",
    sortOrder: 1,
  },
  {
    id: "project-02",
    slug: "trofeu-mesa-redonda-2026",
    title: "Troféu Mesa Redonda 2026",
    period: { en: "Oct 2026", pt: "Out 2026" },
    association: "Fundação Cásper Líbero",
    summary: {
      en: "Rebuilt the Troféu Mesa Redonda system, ensuring the integrity and persistence of the complete voting data.",
      pt: "Refeito o sistema do Troféu Mesa Redonda, garantindo integridade e persistência dos dados completos da votação.",
    },
    outcomes: [
      { en: "Google sign-in and bot protection.", pt: "Login com Google e proteção contra robôs." },
      { en: "E2E tests and a performance review.", pt: "Testes de ponta a ponta e revisão de desempenho." },
    ],
    technologies: ["E2E", "Cloudflare", "Claude Code"],
    url: "https://trofeumesaredonda.com.br/",
    image: {
      src: "/projects/trofeu-mesa-redonda-2026.webp",
      alt: {
        en: "Troféu Mesa Redonda home page announcing that voting is open.",
        pt: "Página inicial do Troféu Mesa Redonda anunciando as votações abertas.",
      },
      focalPoint: "50% 0%",
      source: "https://trofeumesaredonda.com.br/",
      provisional: false,
    },
    status: "online",
    sortOrder: 2,
  },
  {
    id: "project-03",
    slug: "navero",
    title: "Navero",
    period: { en: "Sep 2026", pt: "Set 2026" },
    summary: {
      en: "Online booking SaaS for barbershops. Each shop gets a public booking page and a dashboard.",
      pt: "SaaS de agendamento online para barbearias. Cada barbearia tem página pública de agendamento e painel.",
    },
    problem: {
      en: "Let each shop manage schedule, clients, services, staff, and hours in one place.",
      pt: "Deixar cada barbearia gerenciar agenda, clientes, serviços, equipe e expediente num só lugar.",
    },
    contribution: {
      en: "I built the product and also bought the domain and run the hosting.",
      pt: "Fiz o produto e também comprei o domínio e cuido da hospedagem.",
    },
    outcomes: [
      { en: "Role-based access and data isolation per shop.", pt: "Permissões por papel e dados isolados por barbearia." },
      { en: "Payments through Stripe Connect.", pt: "Pagamentos pelo Stripe Connect." },
      { en: "API, component, and E2E tests.", pt: "Testes de API, de componentes e de ponta a ponta." },
    ],
    technologies: ["Next.js", "React", "Stripe", "SQLite", "Playwright"],
    url: "https://navero.app.br/",
    image: {
      src: "/projects/navero.webp",
      alt: {
        en: "Navero home page showing a barbershop schedule dashboard.",
        pt: "Página inicial do Navero com o painel de agenda de uma barbearia.",
      },
      focalPoint: "50% 0%",
      source: "https://navero.app.br/",
      provisional: false,
    },
    status: "online",
    sortOrder: 3,
  },
  {
    id: "project-04",
    slug: "prova-9-de-julho-2026",
    title: "Prova 9 de Julho 2026",
    period: { en: "May 2026", pt: "Mai 2026" },
    association: "Fundação Cásper Líbero",
    summary: {
      en: "New site for the 9 de Julho International Cycling Race, a classic Gazeta Esportiva event.",
      pt: "Novo site da Prova Ciclística Internacional 9 de Julho, evento tradicional da Gazeta Esportiva.",
    },
    outcomes: [
      { en: "Live in one week to meet the campaign date.", pt: "No ar em uma semana para cumprir a data da campanha." },
      { en: "Banner, rules, route, prizes, and tracking tags.", pt: "Banner, regulamento, percurso, premiação e tags de medição." },
    ],
    technologies: ["WordPress", "Google Tag Manager"],
    url: "https://prova9dejulho.com.br/",
    image: {
      src: "/projects/prova-9-de-julho-2026.webp",
      alt: {
        en: "9 de Julho race home page with a cyclist and the results button.",
        pt: "Página inicial da Prova 9 de Julho com uma ciclista e o botão de classificação.",
      },
      focalPoint: "50% 0%",
      source: "https://prova9dejulho.com.br/",
      provisional: false,
    },
    status: "online",
    sortOrder: 4,
  },
  {
    id: "project-05",
    slug: "gazeta-super-ofertas",
    title: "Gazeta Super Ofertas",
    period: { en: "Feb 2026 — Mar 2026", pt: "Fev 2026 — Mar 2026" },
    association: "Fundação Cásper Líbero",
    summary: {
      en: "Rebuild of Gazeta's deals portal, formerly Gazeta Shopping, with a new theme and a rewritten backend.",
      pt: "Reestruturação do portal de ofertas da Gazeta, antigo Gazeta Shopping, com novo tema e backend reescrito.",
    },
    outcomes: [
      {
        en: "New header, footer, menu, and palette without an outside agency.",
        pt: "Header, rodapé, menu e paleta novos sem agência externa.",
      },
    ],
    technologies: ["WordPress", "PHP"],
    url: "https://gazetasuperofertas.com.br/",
    image: {
      src: "/projects/gazeta-super-ofertas.webp",
      alt: {
        en: "Gazeta Super Ofertas home page with the deals banner.",
        pt: "Página inicial do Gazeta Super Ofertas com o banner de ofertas.",
      },
      focalPoint: "50% 0%",
      source: "https://gazetasuperofertas.com.br/",
      provisional: false,
    },
    status: "online",
    sortOrder: 5,
  },
  {
    id: "project-06",
    slug: "app-tv-gazeta",
    title: "App TV Gazeta",
    period: { en: "Jan 2026 — Feb 2026", pt: "Jan 2026 — Fev 2026" },
    association: "Fundação Cásper Líbero",
    summary: {
      en: "Facelift of the TV Gazeta app on Android and iOS: menu, schedule, profile, and recipes.",
      pt: "Redesenho do app da TV Gazeta no Android e no iOS: menu, grade, perfil e receitas.",
    },
    outcomes: [
      { en: "New transitions and loading effects.", pt: "Novas transições e efeitos de carregamento." },
      { en: "Go-live without stopping the live content.", pt: "Virada em produção sem parar o conteúdo ao vivo." },
    ],
    technologies: ["Ionic", "Angular", "Mobile", "UX"],
    url: "https://play.google.com/store/apps/details?id=br.com.fcl.tvgazetaaovivo",
    image: {
      src: "/projects/app-tv-gazeta.webp",
      alt: {
        en: "TV Gazeta app page on Google Play with app screenshots.",
        pt: "Página do app TV Gazeta na Google Play com telas do aplicativo.",
      },
      focalPoint: "50% 0%",
      source: "https://play.google.com/store/apps/details?id=br.com.fcl.tvgazetaaovivo",
      provisional: false,
    },
    status: "online",
    sortOrder: 6,
  },
  {
    id: "project-07",
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
    sortOrder: 7,
  },
  {
    id: "project-08",
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
    sortOrder: 8,
  },
  {
    id: "project-09",
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
    sortOrder: 9,
  },
  {
    id: "project-10",
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
    sortOrder: 10,
  },
  {
    id: "project-11",
    slug: "fundacao-casper-libero",
    title: "Fundação Cásper Líbero",
    period: { en: "Dec 2024 — Mar 2025", pt: "Dez 2024 — Mar 2025" },
    association: "Fundação Cásper Líbero",
    summary: {
      en: "A custom institutional WordPress theme engineered across frontend and backend for performance, SEO, and maintainability.",
      pt: "Tema WordPress institucional desenvolvido o frontend e o backend com foco em performance, SEO e manutenibilidade.",
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
    sortOrder: 11,
  },
] satisfies Project[];
