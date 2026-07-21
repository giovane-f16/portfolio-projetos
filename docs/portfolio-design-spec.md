# Especificação de design — Portfólio de Giovane Ferreira

## 1. Status e fontes de verdade

Este documento descreve a identidade visual atualmente implementada no
portfólio. A direção foi inspirada na composição publicada em
`https://mount-slot-28565685.figma.site/`, mas foi adaptada para os dados reais,
o posicionamento profissional e os projetos confirmados de Giovane Ferreira.

Em caso de divergência, as fontes de verdade são, nesta ordem:

1. `Profile.pdf` e `Projects.md` para conteúdo profissional;
2. `src/data/portfolio.ts` para o conteúdo publicado;
3. `src/app/page.tsx` e `src/components/` para arquitetura e comportamento;
4. `src/app/globals.css` para tokens, responsividade e acabamento visual.

Informações fictícias da referência visual — nome, métricas, projetos e links —
não devem ser reutilizadas. O e-mail do perfil também não deve ser gravado no
código público: o contato usa `CONTACT_URL`, restrito a HTTPS, ou LinkedIn como
fallback.

## 2. Objetivo e público

O portfólio atende recrutadores, lideranças técnicas, times de produto e
potenciais clientes. Em menos de um minuto, a página deve comunicar:

- quem é Giovane e onde atua;
- sua abrangência entre interface, backend, dados e entrega;
- uma evidência mensurável de impacto;
- quais trabalhos podem ser avaliados;
- quais informações são confirmadas e quais ainda não estão disponíveis;
- como iniciar uma conversa.

A experiência prioriza leitura rápida, rastreabilidade e evidências. A estética
técnica deve apoiar o conteúdo, sem transformar a interface em uma simulação de
terminal nem exigir repertório de programação para navegar.

## 3. Conteúdo profissional confirmado

- **Nome:** Giovane Ferreira.
- **Função:** Desenvolvedor Full Stack.
- **Localização:** São Paulo, Brasil.
- **Proposta de valor:** produtos digitais de ponta a ponta, da interface às
  APIs e à infraestrutura, com foco em performance, segurança e consistência.
- **Impacto:** redução documentada de 82% no tempo de resposta em projeto da
  Fundação Cásper Líbero.
- **Experiências:** Fundação Cásper Líbero e Mandem Jobs.
- **Formação:** Full Stack Development na FIAP, Sistemas de Informação na
  UNINOVE e Formação em Servidores no Senac.
- **Projetos:** Aprendia, Tech Challenge Fase 3 — Blogging, API REST Node.js,
  Equilíbrio Financeiro e Fundação Cásper Líbero.
- **Links públicos:** GitHub e LinkedIn.

Não inferir cargo, período, resultado ou autoria individual quando a fonte não
os confirmar. No caso da Mandem Jobs, a ausência desses detalhes é explicitada
no texto publicado.

## 4. Direção visual — “Painel técnico editorial”

A identidade combina a densidade controlada de um painel de engenharia com a
hierarquia de um portfólio editorial. Seus sinais principais são:

- base azul-petróleo escura com superfícies azuladas discretas;
- azul médio como cor de ação, azul claro para orientação e metadados e um
  acento castanho para estados secundários;
- tipografia display pesada para nome e chamadas;
- tipografia monoespaçada em índices, navegação, rótulos e tecnologias;
- grade técnica muito sutil no fundo;
- numeração sequencial `01` a `05` para dar ritmo à página;
- bordas finas e pouco contraste entre planos, sem sombras decorativas;
- glows radiais apenas no hero e no contato;
- projetos tratados como registros editoriais, sem depender de screenshots.

O resultado deve parecer preciso, contemporâneo e funcional. Efeitos são
contidos: a leitura, os estados e as evidências têm prioridade sobre ornamento.

### Princípios de experiência

1. **Evidência antes de promessa:** o hero apresenta `−82%`, cinco projetos e
   localização ao lado da proposta de valor.
2. **Escaneabilidade:** títulos curtos, índices, rótulos monoespaçados e blocos
   com responsabilidades claras.
3. **Transparência:** projetos offline permanecem documentados, mas não exibem
   CTA quebrado.
4. **Progressão:** Sobre → Habilidades → Experiência → Projetos → Contato.
5. **Sobriedade:** animação nunca é necessária para entender ou operar a página.

## 5. Arquitetura da informação

1. Skip link para `#conteudo`.
2. Cabeçalho fixo com marca `<GF />` e navegação principal.
3. **01. Sobre:** nome, posicionamento, CTAs e painel de fatos.
4. **02. Habilidades:** quatro grupos de competências.
5. **03. Experiência:** linha do tempo profissional e painel de formação.
6. **04. Projetos:** cinco trabalhos em lista editorial.
7. **05. Contato:** convite, canal configurado e perfis sociais.
8. Rodapé com autoria e data de atualização.

Fluxo primário: **posicionamento → prova → competências → contexto profissional
→ trabalhos → conversa**.

### Copy principal ativa

- Rótulo: `// 01. SOBRE · DESENVOLVEDOR FULL STACK · SÃO PAULO`
- Título: `Giovane Ferreira`
- Apoio: `Construo produtos digitais de ponta a ponta — da interface às APIs e
  à infraestrutura — com foco em performance, segurança e consistência.`
- CTA primário: `Ver projetos`
- CTA secundário: `Entrar em contato`
- Fatos: `−82% no tempo de resposta`, `05 projetos documentados` e
  `SP — São Paulo, Brasil`.

## 6. Design tokens

Os valores abaixo correspondem à implementação ativa.

```css
:root {
  --color-1: #3c86c2;
  --color-2: #bcecfc;
  --color-3: #245074;
  --color-4: #9c7c6d;
  --color-5: #e4e4e4;
  --background: #06131c;
  --surface-deep: #081923;
  --card: #0b202c;
  --secondary: #102a38;
  --surface-hover: #133244;
  --foreground: var(--color-5);
  --muted: #b7c7d0;
  --subtle: var(--color-2);
  --primary: var(--color-1);
  --primary-strong: var(--color-5);
  --primary-text: var(--color-2);
  --accent: var(--color-2);
  --warm-accent: var(--color-4);
  --success: var(--color-2);
  --warning: var(--color-4);
  --border: #21465d;
  --border-strong: var(--color-2);
  --focus: var(--color-2);
  --radius: 8px;
  --shell: 1152px;
}
```

### Uso semântico de cor

| Token | Uso |
| --- | --- |
| `color-1` | azul médio para ações, assinatura e glows |
| `color-2` | azul claro para orientação, foco e microcopy |
| `color-3` | azul profundo da marca, usado em acentos e contrastes |
| `color-4` | castanho para contraponto visual e estados offline |
| `color-5` | cinza claro para texto corrido e bordas |
| `background` | canvas escuro, fundo de pontos da timeline e header mobile |
| `surface-deep` | plano de fundo elevado e término de gradientes |
| `foreground` | texto principal e controles neutros |
| `card` | cards de habilidades, formação, fatos e contato |
| `secondary` | variação de superfície e chips de tecnologia |
| `muted` | resumos e textos de apoio |
| `subtle` | azul claro para metadados, períodos e microcopy de alta legibilidade |
| `primary` | CTA principal e glow azul |
| `primary-strong` | estado hover do CTA primário |
| `primary-text` | textos e símbolos azul-claros sobre superfícies escuras |
| `accent` | marca, índices de seção, foco e orientação ativa |
| `warm-accent` | contraponto discreto em glows e elementos secundários |
| `success` | status textual `Online` |
| `warning` | status textual offline ou arquivado |

Os projetos recebem acentos por ordem: `#bcecfc`, `#3c86c2`, `#9c7c6d`,
`#e4e4e4` e `#245074`. A cor individual aparece nas superfícies de categoria e
na régua lateral; textos em hover/foco usam `#bcecfc` para manter legibilidade.
O CTA `Ver ao vivo` também usa o azul claro associado ao status online. Cor
nunca substitui nome ou status.

As superfícies usam diretamente `color-3`, sem gerar tons intermediários.
`color-2` atende navegação, legendas pequenas, períodos e rótulos de evidência;
`color-5` preserva a separação entre texto corrido e microcopy.

## 7. Tipografia

Não há download obrigatório de webfont. O sistema usa stacks locais para evitar
bloqueio de renderização e manter consistência operacional.

```css
--font-display: Arial, Helvetica, ui-sans-serif, system-ui, sans-serif;
--font-body: Inter, ui-sans-serif, system-ui, -apple-system,
  BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "JetBrains Mono", "SFMono-Regular", Consolas,
  "Liberation Mono", monospace;
```

- **Display:** títulos principais, CTAs e métricas; peso 700–900, tracking
  negativo de até `-0.045em`.
- **Body:** parágrafos e descrições; base de `1.0625rem`, entrelinha `1.6`.
- **Mono:** navegação, marca, índices, períodos, status e tecnologias; em geral
  `0.62rem` a `0.82rem`, com tracking positivo.
- **Hero:** `clamp(4rem, 9vw, 7rem)`, entrelinha `0.84` no desktop.
- **Títulos de seção:** `clamp(2.5rem, 5vw, 3.4rem)`, entrelinha `0.98`.
- **Contato:** `clamp(2.8rem, 6vw, 4.5rem)`, entrelinha `0.92`.

Texto pequeno é reservado a metadados curtos e nunca deve carregar sozinho uma
instrução ou conteúdo essencial.

## 8. Grid, espaçamento e superfícies

- Container principal: máximo de `1152px`.
- Margem horizontal padrão: `24px`; no mobile, `16px`.
- Header: altura mínima de `80px`.
- Hero: mínimo de `88svh` no desktop, com `112px` no topo e `32px` na base.
- Seções de conteúdo: espaçamento vertical fluido entre `64px` e `88px`.
- Seção de contato: espaçamento vertical fluido entre `48px` e `72px`.
- Na transição entre Projetos e Contato, o padding inferior fica entre `40px`
  e `56px`, e o contato não adiciona padding superior.
- Espaçamento recorrente: `4`, `7/8`, `10/12`, `16`, `20/24`, `28/32`,
  `48/56`, `64`, `80`, `96` e `128px`.
- Raio padrão: `8px`; formação em `12px`; contato em `16px`; pills em `99px`.
- Bordas: 1px com `border`; `border-strong` apenas para controles e separação
  de maior ênfase.
- Sombras: não fazem parte do sistema; a exceção é o halo do ponto da timeline.

O canvas combina um gradiente azul-preto muito discreto com duas camadas
decorativas fixas e inacessíveis: ruído a `2.5%` de opacidade e grade de
`80 × 80px`, mascarada até desaparecer em 78% da altura.

## 9. Componentes e padrões

### 9.1 Cabeçalho e navegação

- Fixo no topo, com fundo `background` a 86% e blur de `16px`.
- Marca `<GF />` em lilás, com nome acessível “Giovane Ferreira — início”.
- Controles têm área mínima de 44px e indicam a seção corrente por cor lilás, peso
  700, sublinhado de 2px e `aria-current="location"`, sem marcador `>`.
- Os cliques fazem scroll sem gravar fragmentos na URL.
- A seção ativa é definida pela maior área visível, com estados explícitos para
  o topo e o fim da página.
- Abaixo de 768px, os links viram menu vertical, posicionado após o header de
  80px e acionado por botão de 44px.
- Ao abrir, o primeiro link recebe foco; `Escape` fecha o menu e devolve o foco
  ao botão.

### 9.2 Hero e painel de fatos

- Grid de duas colunas: conteúdo flexível + painel de `220px`.
- Nome quebrado em duas linhas; `Ferreira` recebe o tom `primary-text` para
  preservar contraste sobre o fundo preto.
- CTAs usam altura mínima de 48px.
- Painel com três blocos: impacto, quantidade de projetos e localização.
- Dois glows radiais, azul e lilás, ficam fora da camada interativa.
- Um divisor com “scroll para explorar” encerra a primeira dobra.

### 9.3 Cabeçalho de seção

O padrão `SectionHeading` contém rótulo `// índice. nome`, título e introdução
opcional. O bloco tem largura máxima de `760px`; a introdução, `620px`.

### 9.4 Cards de habilidades

- Quatro colunas no desktop, duas no tablet e uma em telas estreitas.
- Superfície `card`, borda fina e raio de 8px.
- Símbolo técnico em bloco azul discreto; categoria em mono e caixa alta.
- Hover desloca o card em `−3px` e aumenta a presença da borda azul.
- Conteúdo real: Frontend, Backend, Dados & Cloud e Entrega.

### 9.5 Experiência e formação

- Layout assimétrico: timeline com proporção `1.5fr` e painel lateral `0.8fr`.
- A timeline usa linha vertical, ponto lilás, período, organização, resumo e
  destaques confirmados.
- Formação fica em `aside`, com instituição em mono azul e curso em destaque.
- No mobile, os dois blocos são empilhados sem alterar sua ordem semântica.

### 9.6 Lista de projetos

Cada projeto é uma linha editorial com três áreas no desktop:

1. índice numérico de 56px;
2. título, tipo, resumo, contexto, contribuição, evidência e tecnologias;
3. período, status e CTA, com 190px.

Tipos são derivados da stack: `WordPress`, `Backend` ou `Full Stack`. Tecnologias
aparecem em chips compactos. O hover e o `focus-within` revelam a régua lateral,
alteram o título para o acento textual claro e aplicam uma superfície lilás
discreta.

- **Online:** ponto verde + texto `Online` + CTA `Ver ao vivo`.
- **Offline/arquivado:** ponto lilás + texto
  `Projeto arquivado/offline`; nenhum link externo quebrado.
- **Evidência:** usa o primeiro resultado confirmado do projeto.
- **Imagens:** a composição ativa não usa capas. Screenshots podem ser
  incorporados em uma evolução futura, mas não são requisito nem fallback desta
  versão.

### 9.7 Contato

- Card de superfície escura com raio de 16px e glow azul decorativo.
- Título direto `Entre em contato.`.
- CTA primário usa o canal HTTPS configurado; sem configuração válida, abre o
  LinkedIn.
- GitHub e LinkedIn são exibidos sem duplicar o destino do CTA principal.
- Todos os destinos externos abrem em nova aba, têm `rel="noreferrer"`, seta
  visível e aviso acessível.

### 9.8 Rodapé

Linha superior discreta, autoria à esquerda e data de atualização à direita. Em
mobile, os textos são empilhados e alinhados ao início.

## 10. Wireframes de referência

### Desktop

```text
┌──────────────────────────────────────────────────────────────────┐
│ <GF />       sobre habilidades experiência projetos contato      │
├──────────────────────────────────────────────────────────────────┤
│ // 01. SOBRE                                                     │
│ Giovane                          ┌──────────────────────────────┐ │
│ Ferreira                         │ −82%  tempo de resposta      │ │
│ Produtos de ponta a ponta...     │ 05    projetos documentados │ │
│ [Ver projetos] [Contato ↗]       │ SP    São Paulo, Brasil      │ │
│ ─────────────── scroll para explorar ───                         │
├──────────────────────────────────────────────────────────────────┤
│ // 02. HABILIDADES    [Frontend] [Backend] [Dados] [Entrega]     │
├──────────────────────────────────────────────────────────────────┤
│ // 03. EXPERIÊNCIA    Timeline             [Formação]            │
├──────────────────────────────────────────────────────────────────┤
│ // 04. PROJETOS                                                │
│ 01 │ Aprendia · Full Stack     contexto/evidência    Online  ↗  │
│ 02 │ Blogging · Full Stack     contexto/evidência    Online  ↗  │
│ 03 │ API REST · Backend        contexto/evidência    Online  ↗  │
│ 04 │ Equilíbrio · WordPress    contexto/evidência    Offline    │
│ 05 │ Fundação · WordPress      contexto/evidência    Online  ↗  │
├──────────────────────────────────────────────────────────────────┤
│ // 05. CONTATO   Entre em contato. [Conversar ↗]                │
└──────────────────────────────────────────────────────────────────┘
```

### Mobile

```text
┌────────────────────────────┐
│ <GF />              [Menu] │
├────────────────────────────┤
│ // 01. SOBRE               │
│ Giovane                    │
│ Ferreira                   │
│ resumo                     │
│ [Ver projetos]             │
│ [Entrar em contato ↗]      │
│ −82%  impacto              │
│ 05    projetos             │
│ SP    localização          │
├────────────────────────────┤
│ // 02. HABILIDADES         │
│ [card empilhado]           │
├────────────────────────────┤
│ // 03. EXPERIÊNCIA         │
│ timeline                   │
│ [formação]                 │
├────────────────────────────┤
│ // 04. PROJETOS            │
│ 01  título + tipo          │
│     resumo                 │
│     contexto/evidência     │
│     período · status · CTA │
├────────────────────────────┤
│ // 05. CONTATO             │
│ [ações em largura total]   │
└────────────────────────────┘
```

## 11. Interações e movimento

- Interações diretas usam `180–200ms`, `ease-out`.
- Botões sobem até 2px em hover; cards de habilidade, até 3px.
- Projetos respondem de forma equivalente a hover e `focus-within`.
- Cabeçalhos, cards de habilidades, experiências, formação, projetos e contato
  são revelados uma única vez ao entrar na viewport. A entrada combina
  `opacity: 0 → 1` e `translateY(24px → 0)` em `600ms`, com curva
  `cubic-bezier(0.22, 1, 0.36, 1)`.
- Um bootstrap mínimo no `<head>` habilita o estado inicial antes da primeira
  pintura, evitando flash em navegação por âncora. A revelação usa
  `IntersectionObserver`, limiar de 12% e margem inferior de 10%; o elemento
  deixa de ser observado após a entrada.
- Se o observador cliente não inicializar em até 3 segundos, o bootstrap remove
  o estado oculto para que nenhuma falha de bundle torne o conteúdo inacessível.
- Navegação usa scroll suave sem alterar a URL e reserva 80px para o header
  fixo; no mobile, 84px.
- Não há animações automáticas, carrossel, parallax ou conteúdo dependente de
  movimento.
- Em `prefers-reduced-motion: reduce`, os elementos permanecem visíveis, scroll
  suave é removido e transições e animações são reduzidas a `0.01ms`.

## 12. Responsividade

Breakpoints implementados:

| Faixa | Comportamento |
| --- | --- |
| `≥ 1024px` | hero em duas colunas, quatro cards de habilidade e projetos em três áreas |
| `768–1023px` | habilidades em duas colunas; áreas laterais dos projetos ficam mais compactas |
| `520–767px` | menu móvel; hero em uma coluna; fatos em três colunas; experiência empilhada; projeto em duas colunas |
| `360–519px` | CTAs e fatos empilhados; habilidades em uma coluna; evidências e metadados de projeto empilhados |
| `320–359px` | título reduzido; índice visual do projeto oculto; projeto em uma coluna |

Requisitos em todas as faixas:

- largura mínima suportada de 320px;
- ausência de overflow horizontal;
- conteúdo essencial nunca truncado;
- botões em largura total abaixo de 520px;
- ordem de leitura preservada no DOM;
- uso de `svh` apenas no hero desktop para respeitar barras móveis.

## 13. Acessibilidade

O alvo é WCAG 2.2 nível AA. O design e a implementação devem preservar:

- `lang="pt-BR"`, landmarks semânticos e hierarquia coerente de títulos;
- skip link visível ao foco;
- foco global lilás-claro de 3px com offset de 4px;
- alvos principais com mínimo de 44 × 44px;
- status sempre expresso por texto e cor;
- links externos com aviso visual e acessível;
- menu mobile com `aria-expanded`, `aria-controls`, rótulo variável, foco inicial
  e fechamento por `Escape`;
- `aria-current` na seção ativa;
- camadas, glows, divisores e símbolos redundantes ocultos da árvore acessível;
- conteúdo de projetos disponível em texto, sem depender de imagem;
- preferência de movimento reduzido respeitada;
- ausência de formulário sem backend seguro.

O contraste deve ser validado novamente sempre que tokens mudarem. Não registrar
conformidade, Lighthouse ou resultado de leitor de tela sem uma auditoria real.

## 14. Modelo de conteúdo

O conteúdo deve permanecer em `src/data/portfolio.ts`, separado da apresentação.
As entidades principais são `PortfolioProfile`, `SkillGroup`, `Experience`,
`Education` e `Project`.

Todo projeto deve conter:

- identificador, slug, título e período;
- resumo e, quando confirmados, problema e contribuição;
- ao menos uma evidência em `outcomes`;
- tecnologias, status e ordem; o acento visual é derivado da posição na lista;
- URL apenas quando o destino estiver ativo e confirmado.

Campos de imagem ainda podem existir no modelo para evolução posterior, mas não
devem obrigar a interface atual a renderizar uma capa. `repositoryUrl` também só
deve aparecer quando houver link público confirmado.

## 15. Critérios de aceite e handoff

- Identidade escura e técnica aplicada de forma consistente em toda a página.
- Nome, métrica, localização, experiências e cinco projetos reais preservados.
- Nenhum dado fictício da referência visual publicado.
- Conteúdo separado dos componentes e projetos fáceis de atualizar.
- Projeto offline sem CTA externo.
- Hero comunica nome, função, proposta e evidência na primeira dobra desktop.
- Navegação utilizável a 320, 768, 1024 e 1440px, sem overflow horizontal.
- Estados de hover, foco, ativo, online e offline especificados.
- Menu móvel operável por teclado e com retorno de foco ao fechar por `Escape`.
- Contraste, foco, landmarks, skip link e movimento reduzido tratados.
- Contato sem segredo exposto e com fallback seguro.
- Alterações futuras de layout devem atualizar este documento junto do código.
