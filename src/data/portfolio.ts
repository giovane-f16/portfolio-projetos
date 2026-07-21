export interface ImpactMetric {
  value: string;
  label: string;
  context: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Capability {
  index: string;
  title: string;
  description: string;
  technologies: string[];
}

export interface SkillGroup {
  title: string;
  symbol: string;
  items: string[];
}

export interface Experience {
  organization: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface Education {
  course: string;
  institution: string;
}

export interface PortfolioProfile {
  name: string;
  role: string;
  location: string;
  summary: string;
  impactMetrics: ImpactMetric[];
  socialLinks: SocialLink[];
  capabilities: Capability[];
  skillGroups: SkillGroup[];
  skills: string[];
  experiences: Experience[];
  education: Education[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  focalPoint: `${number}% ${number}%`;
  source: string;
  provisional: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  period: string;
  association?: string;
  summary: string;
  problem?: string;
  contribution?: string;
  outcomes: string[];
  technologies: string[];
  url?: string;
  repositoryUrl?: string;
  status: "online" | "offline" | "archived";
  image?: ProjectImage;
  sortOrder: number;
}

export const profile: PortfolioProfile = {
  name: "Giovane Ferreira",
  role: "Desenvolvedor Full Stack",
  location: "São Paulo, Brasil",
  summary:
    "Desenvolvo experiências web, aplicações e integrações com foco em performance, segurança e consistência.",
  impactMetrics: [
    {
      value: "−82%",
      label: "no tempo de resposta",
      context: "Melhoria obtida em projeto da Fundação Cásper Líbero.",
    },
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/giovane-f16" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/giovane-f16" },
  ],
  capabilities: [
    {
      index: "A",
      title: "Produto Web",
      description:
        "Interfaces e plataformas que equilibram experiência, consistência e desempenho.",
      technologies: ["React", "Next.js", "TypeScript", "Angular", "WordPress"],
    },
    {
      index: "B",
      title: "Backend / APIs",
      description:
        "Serviços e integrações organizados para serem seguros, legíveis e fáceis de evoluir.",
      technologies: ["Node.js", "PHP", "Python", "APIs REST", "SQL", "MongoDB"],
    },
    {
      index: "C",
      title: "Mobile / Entrega",
      description:
        "Visão ponta a ponta, da aplicação à rotina de entrega e infraestrutura.",
      technologies: ["Ionic", "AWS", "Docker", "CI/CD", "Git"],
    },
  ],
  skillGroups: [
    {
      title: "Frontend",
      symbol: "</>",
      items: ["React", "Next.js", "TypeScript", "Angular", "Tailwind CSS"],
    },
    {
      title: "Backend",
      symbol: "{}",
      items: ["PHP", "Node.js", "Python", "WordPress", "APIs REST"],
    },
    {
      title: "Dados & Cloud",
      symbol: "DB",
      items: ["MySQL", "PostgreSQL", "MongoDB", "AWS", "Docker"],
    },
    {
      title: "Entrega",
      symbol: "→",
      items: ["Git", "CI/CD", "Jira", "Clean Code", "SOLID", "Clean Architecture"],
    },
  ],
  skills: [
    "Clean Code",
    "SOLID",
    "Clean Architecture",
    "Jira",
    "MySQL",
    "PostgreSQL",
    "Tailwind CSS",
  ],
  experiences: [
    {
      organization: "Fundação Cásper Líbero",
      period: "Experiência confirmada",
      summary:
        "Atuação em produto digital institucional, conectando frontend, backend e objetivos de performance.",
      highlights: [
        "Novo tema WordPress desenvolvido com foco em performance, SEO e boas práticas.",
        "Redução documentada de 82% no tempo de resposta.",
      ],
    },
    {
      organization: "Mandem Jobs",
      period: "Experiência confirmada",
      summary:
        "Experiência profissional registrada no perfil, preservada aqui sem atribuir cargo, período ou entregas não confirmadas.",
      highlights: [],
    },
  ],
  education: [
    { course: "Full Stack Development", institution: "FIAP" },
    { course: "Sistemas de Informação", institution: "UNINOVE" },
    { course: "Formação em Servidores", institution: "Senac" },
  ],
};

export const projects: Project[] = [
  {
    id: "project-01",
    slug: "aprendia",
    title: "Aprendia",
    period: "jan 2026 — fev 2026",
    association: "FIAP",
    summary:
      "Plataforma educacional para criação, entrega e avaliação de trabalhos com apoio de inteligência artificial.",
    problem:
      "Organizar em um só produto o fluxo de alunos e professores em torno de trabalhos acadêmicos.",
    outcomes: ["Plataforma publicada e disponível online."],
    technologies: ["React", "Next.js"],
    url: "https://pos-tech-hackaton.vercel.app/",
    status: "online",
    sortOrder: 1,
  },
  {
    id: "project-02",
    slug: "tech-challenge-blogging",
    title: "Tech Challenge Fase 3 — Blogging",
    period: "set 2025",
    association: "FIAP",
    summary:
      "Interface gráfica de blogging construída para publicação e exploração de conteúdo.",
    problem: "Entregar uma experiência web dedicada à gestão e leitura de posts.",
    outcomes: ["Interface publicada e disponível online."],
    technologies: ["Next.js", "React", "TypeScript"],
    url: "https://tech-challenge-fase-3.vercel.app/",
    status: "online",
    sortOrder: 2,
  },
  {
    id: "project-03",
    slug: "api-rest-node-js",
    title: "API REST Node.js",
    period: "jul 2025 — ago 2025",
    association: "FIAP",
    summary:
      "API para listar e manipular conteúdo, com documentação navegável e deploy publicado.",
    problem: "Disponibilizar operações de conteúdo por uma interface de programação documentada.",
    outcomes: ["Documentação com Swagger.", "Deploy realizado via Render."],
    technologies: ["TypeScript", "Node.js", "Swagger", "API REST"],
    url: "https://tech-challenge-fase-2-54i9.onrender.com/",
    status: "online",
    sortOrder: 3,
  },
  {
    id: "project-04",
    slug: "equilibrio-financeiro",
    title: "Equilíbrio Financeiro",
    period: "jan 2025 — mar 2025",
    summary:
      "Blog educacional sobre finanças, com busca, listagem de posts e organização por categoria.",
    problem: "Organizar conteúdo introdutório sobre investimentos e economia em uma experiência editorial.",
    outcomes: ["Busca, listagem de posts e categorias implementadas."],
    technologies: ["WordPress", "POO"],
    status: "offline",
    sortOrder: 4,
  },
  {
    id: "project-05",
    slug: "fundacao-casper-libero",
    title: "Fundação Cásper Líbero",
    period: "dez 2024 — mar 2025",
    association: "Fundação Cásper Líbero",
    summary:
      "Novo tema institucional WordPress, desenvolvido no backend e frontend com foco em performance e SEO.",
    problem: "Renovar a base técnica e a experiência do site institucional.",
    contribution: "Desenvolvimento do backend e frontend do novo tema WordPress.",
    outcomes: [
      "Redução de 82% no tempo de resposta.",
      "Implementação orientada a performance, SEO e boas práticas.",
    ],
    technologies: ["WordPress", "PHP", "POO"],
    url: "https://fcl.com.br/",
    status: "online",
    sortOrder: 5,
  },
] satisfies Project[];
