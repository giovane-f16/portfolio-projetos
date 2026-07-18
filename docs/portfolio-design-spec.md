# Especificação de design — Portfólio de Giovane Ferreira

## 1. Fontes e limites

Esta especificação usa como fontes primárias `Profile.pdf` e `Projects.md`. Os
links públicos dos projetos e seus metadados visuais foram verificados em
18/07/2026. O perfil público do LinkedIn não foi usado porque exige sessão
autenticada. Nenhum dado profissional foi inferido.

O e-mail presente no PDF deve permanecer em configuração privada ou variável de
ambiente. Ele não deve ser gravado diretamente em componentes ou dados públicos
do repositório.

### Conteúdo profissional confirmado

- Giovane Ferreira — Desenvolvedor Full Stack, São Paulo, Brasil.
- Proposta de valor: construção de produtos seguros, consistentes e de alta
  performance.
- Resultado mensurável: redução de 82% no tempo de resposta em projeto da
  Fundação Cásper Líbero.
- Stack: PHP, WordPress, Python, TypeScript, React, Next.js, Node.js, Tailwind
  CSS, Angular, Ionic, MySQL, PostgreSQL, MongoDB e AWS.
- Práticas e ferramentas: Git, CI/CD, Docker, Jira, APIs REST, Clean Code, SOLID
  e Clean Architecture.
- Experiência: Fundação Cásper Líbero e Mandem Jobs.
- Formação: Full Stack Development na FIAP, Sistemas de Informação na UNINOVE e
  Formação em Servidores no Senac.
- Links confirmados: LinkedIn e GitHub.

### Projetos confirmados

1. **Aprendia** — plataforma educacional para criação, entrega e avaliação de
   trabalhos com IA; React e Next.js; online.
2. **Tech Challenge Fase 3 — Blogging** — interface de blogging em Next.js,
   React e TypeScript; online.
3. **API REST Node.js** — API de manipulação de conteúdo em TypeScript/Node.js,
   documentada com Swagger; online.
4. **Equilíbrio Financeiro** — blog educacional em WordPress; offline e sem
   imagem confirmada.
5. **Fundação Cásper Líbero** — tema WordPress completo com foco em performance,
   SEO e boas práticas; online.

## 2. Objetivo e público

Em menos de um minuto, recrutadores, lideranças técnicas e potenciais clientes
devem entender:

- a especialidade de Giovane;
- quais problemas ele resolve;
- quais resultados já produziu;
- como atua entre frontend, backend e infraestrutura;
- quais projetos podem ser explorados;
- como iniciar contato.

A experiência deve priorizar evidências, decisões e impacto antes de listas de
tecnologias.

## 3. Direção visual — “Caderno de entregas”

A identidade combina documentação de produto e caderno de engenharia, sem
recorrer à estética genérica de terminal. A base usa fundo marfim, tipografia
escura, linhas finas, numeração grande, anotações curtas e acentos azul e coral.
O hero é apoiado por uma faixa azul-marinho; os projetos aparecem como estudos
de caso sobre superfícies claras.

O contraste entre títulos editoriais e metadados técnicos comunica domínio
técnico sem perder humanidade. Tecnologias são evidência secundária; impacto,
problema e contribuição ocupam o primeiro plano.

### Copy inicial

- Eyebrow: `DESENVOLVEDOR FULL STACK · SÃO PAULO`
- Título: `Produtos digitais construídos para funcionar — e continuar funcionando.`
- Apoio: `Sou Giovane Ferreira. Desenvolvo experiências web, aplicações e integrações com foco em performance, segurança e consistência.`
- CTA primário: `Explorar projetos`
- CTA secundário: `Ver trajetória`
- Métrica: `−82% no tempo de resposta`
- Legenda: `Melhoria obtida em projeto da Fundação Cásper Líbero.`
- Título da seção de projetos: `Trabalho entregue, não apenas tecnologia listada.`

## 4. Arquitetura da informação

1. Skip link.
2. Cabeçalho fixo discreto: marca `GF`, Projetos, Experiência, Sobre e Contato.
3. Hero com posicionamento, CTAs e métrica de impacto.
4. Projetos selecionados.
5. Capacidades: Produto Web, Backend/APIs e Mobile/Entrega.
6. Experiência em linha do tempo.
7. Sobre e princípios de trabalho.
8. Formação e certificações em formato compacto.
9. Contato.
10. Rodapé com GitHub, LinkedIn e data de atualização.

Fluxo principal: **Hero → impacto → projetos → experiência → contato**.

## 5. Wireframes

### Desktop

```text
┌─────────────────────────────────────────────────────────────┐
│ GF                 Projetos Experiência Sobre     Contato ↗ │
├─────────────────────────────────────────────────────────────┤
│ DESENVOLVEDOR FULL STACK        ┌─────────────────────────┐ │
│ Produtos digitais construídos   │ RESULTADO EM DESTAQUE   │ │
│ para funcionar — e continuar    │ −82%                    │ │
│ funcionando.                    │ tempo de resposta       │ │
│ [Explorar projetos] [Trajetória]└─────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ 01  PROJETOS SELECIONADOS                                  │
│ ┌──────────────────────────┐ ┌────────────────────────────┐ │
│ │ capa real 16:10          │ │ título, impacto e resumo  │ │
│ │                          │ │ stack · status             │ │
│ └──────────────────────────┘ │ [Ver projeto ↗]            │ │
│                              └────────────────────────────┘ │
│             demais cards em grade de duas colunas           │
├─────────────────────────────────────────────────────────────┤
│ 02 CAPACIDADES          03 EXPERIÊNCIA                       │
│ Web · APIs · Mobile     linha do tempo e entregas            │
├─────────────────────────────────────────────────────────────┤
│ 04 SOBRE / PRINCÍPIOS         05 FORMAÇÃO                    │
├─────────────────────────────────────────────────────────────┤
│ Vamos construir algo útil?                 [LinkedIn] [GitHub]│
└─────────────────────────────────────────────────────────────┘
```

### Mobile

```text
┌──────────────────────────┐
│ GF                 [Menu]│
├──────────────────────────┤
│ DESENVOLVEDOR FULL STACK │
│ Produtos digitais        │
│ construídos para         │
│ funcionar.               │
│ [Explorar projetos]      │
│ [Ver trajetória]         │
│ ┌──────────────────────┐ │
│ │ −82% tempo resposta  │ │
│ └──────────────────────┘ │
├──────────────────────────┤
│ 01 PROJETOS              │
│ ┌──────────────────────┐ │
│ │ capa 16:10           │ │
│ ├──────────────────────┤ │
│ │ título + resumo      │ │
│ │ stack · status      │ │
│ └──────────────────────┘ │
│ cards empilhados         │
├──────────────────────────┤
│ 02 CAPACIDADES           │
│ 03 EXPERIÊNCIA           │
│ 04 SOBRE                 │
│ 05 FORMAÇÃO              │
│ CONTATO                  │
└──────────────────────────┘
```

## 6. Cards de projeto e estratégia de imagens

Cada card deve conter índice, capa, título, período, descrição orientada ao
problema, contribuição, tecnologias principais, status e CTA.

| Projeto | Estado visual | Tratamento inicial |
| --- | --- | --- |
| Aprendia | Landing online, sem `og:image` ou hero | Capturar a homepage ou autenticação. Não ampliar o ícone como capa. |
| Blogging | Imagem editorial pública confirmada | Usar como capa provisória, explicando no `alt` que ela representa conteúdo da interface. |
| API REST | Swagger UI online, sem hero | Capturar a documentação Swagger em uso. |
| Equilíbrio Financeiro | Offline, sem imagem confirmada | Solicitar screenshot; até lá, usar fallback geométrico em CSS. |
| Fundação Cásper Líbero | `og:image` oficial confirmada | Usar como capa provisória, sem sugerir autoria da fotografia. |

### Imagens provisórias verificadas

- Blogging: `https://tech-challenge-fase-3.vercel.app/api/uploads/68d6bf32d7ca37c51cba202a-2106.jpg`
- Fundação Cásper Líbero: `https://static.fcl.com.br/uploads/2026/04/img-de-compartilhamento.webp`

As imagens remotas devem ser baixadas, autorizadas e otimizadas antes da
publicação. A implementação não deve depender permanentemente desses hosts.

### Estados e interações

- **Online:** ponto verde acompanhado do texto `Online`; CTA `Abrir projeto`.
- **Offline:** texto `Projeto arquivado/offline`; remover CTA externo quebrado e
  preservar o estudo de caso.
- **Sem imagem/erro:** fallback neutro com proporção preservada; nunca mostrar
  ícone quebrado nem inventar mockup.
- **Loading:** skeleton estático quando `prefers-reduced-motion` estiver ativo.
- **Hover:** ampliar imagem no máximo 2% e alterar cor do título/CTA.
- **Foco:** contorno azul de 3 px com offset de 3 px.
- **Link externo:** indicação textual ou acessível, nunca apenas um ícone.

## 7. Design tokens

```css
:root {
  --color-canvas: #f4f1ea;
  --color-surface: #fffefb;
  --color-ink: #132238;
  --color-muted: #536174;
  --color-primary: #234fd5;
  --color-accent: #b83b27;
  --color-dark-muted: #bac4d0;
  --color-success: #176b4a;
  --color-warning: #7a4c00;
  --color-error: #a53131;
  --color-focus: #0047ff;
}
```

- Tipografia principal: `ui-sans-serif, system-ui, sans-serif`.
- Metadados: `ui-monospace, SFMono-Regular, monospace`.
- Corpo fluido: 16–18 px; seções: 32–48 px; hero: 44–76 px.
- Entrelinha: 1,5 no corpo e 1,05–1,15 em títulos.
- Espaçamento em base de 4 px: 4, 8, 12, 16, 24, 32, 48, 64 e 96.
- Raios: 8 px em controles e 16 px em cards.
- Movimento: 160–240 ms, `ease-out`; sombras apenas em elementos elevados.

## 8. Responsividade e acessibilidade

### Breakpoints

- Até 767 px: coluna única, menu compacto, CTAs em largura total e cards
  empilhados.
- 768–1199 px: grid de 8 colunas; cards alternados ou em duas colunas.
- A partir de 1200 px: grid de 12 colunas e largura máxima de 1280 px.
- Margens: 16 px no mobile, 32 px no tablet e 48–64 px no desktop.
- Imagens em 16:10; informações importantes nunca devem existir somente dentro
  da imagem.

### Requisitos WCAG 2.2 AA

- HTML semântico, landmarks e ordem de títulos consistente.
- Navegação completa por teclado e skip link visível ao foco.
- Área interativa mínima de 44 × 44 px.
- Texto alternativo contextual; `alt=""` apenas para imagens decorativas.
- Status não pode depender somente de cor.
- Respeitar `prefers-reduced-motion`.
- Menu mobile com nome acessível, controle de foco e fechamento por `Escape`.
- Links externos identificáveis; datas e siglas compreensíveis.
- Sem carrossel automático, parallax ou animação essencial.
- Criar formulário apenas com backend seguro; inicialmente preferir links de
  contato configurados.

## 9. Modelo de dados sugerido

```ts
interface PortfolioProfile {
  name: string;
  role: string;
  location: string;
  summary: string;
  impactMetrics: ImpactMetric[];
  socialLinks: SocialLink[];
  capabilities: Capability[];
  skills: string[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
}

interface Project {
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
  image?: {
    src: string;
    alt: string;
    focalPoint: `${number}% ${number}%`;
    source: string;
    provisional: boolean;
  };
  featured: boolean;
  sortOrder: number;
}
```

`image.alt` é obrigatório quando `image.src` existir. O ponto focal deve ser
configurável, por exemplo `50% 35%`.

## 10. Critérios de aceite e handoff

- Conteúdo separado dos componentes em módulo próprio.
- Cinco projetos representados sem fatos inventados.
- Capas reais/provisórias identificadas e fallback neutro implementável.
- Projeto offline não apresenta link quebrado.
- Hero comunica função, proposta e métrica em uma viewport desktop.
- CTA de projetos permanece visível no primeiro scroll mobile.
- Layout funcional a 320, 768, 1024 e 1440 px, sem overflow horizontal.
- Contraste AA, foco visível, landmarks, skip link e movimento reduzido.
- Imagens responsivas com dimensões declaradas para evitar layout shift.
- Validar no futuro com testes reais; não alegar Lighthouse, browser ou leitor
  de tela sem executá-los.
- Antes da implementação, obter capturas de Aprendia, Swagger e Equilíbrio
  Financeiro; links de repositório; confirmação das contribuições individuais;
  autorização de uso das imagens; texto final de contato.
- O `frontend-specialist` deve preservar a ordem semântica, tokens e modelo de
  conteúdo. A stack ainda pode ser escolhida, mas nenhuma biblioteca visual deve
  ser adicionada sem benefício comprovado.
