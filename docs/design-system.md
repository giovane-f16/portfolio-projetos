# Design system

O portfólio usa um design system CSS leve. Os tokens ficam em
`src/app/design-system.css`. O arquivo `src/app/globals.css` aplica os tokens
aos blocos e componentes da página.

## Princípios

- A página é feita de blocos sólidos sobre um fundo claro.
- O vermelho preenche o hero e o contato e marca os destaques.
- O grafite quente preenche o bloco de habilidades.
- Verde e âmbar aparecem só no status dos projetos.
- O logo assinatura GF é a marca. A cor dele muda por CSS; o arquivo não é editado.
- Foco visível, alvos de 44 px, contraste e redução de movimento são obrigatórios.

## Tipografia

- Títulos usam Archivo em largura expandida e peso 800.
- Texto corrido usa Instrument Sans.
- Datas, rótulos e tags usam JetBrains Mono.
- As três fontes são carregadas com `next/font`.

## Tokens

1. Primitivos de cor: `--red-*`, `--paper-*`, `--stone-*`, `--ink-900`.
2. Cores semânticas: `--color-canvas`, `--color-block-brand`,
   `--color-block-dark`, `--color-text`, `--color-accent`.
3. Escalas de tipografia e espaçamento: `--text-*`, `--space-*`.
4. Forma e layout: `--radius-*`, `--radius-block`, `--shadow-*`, `--shell`.

Use sempre um token semântico. Crie um primitivo novo só quando nenhum token
atual servir.

## Componentes-base

- `.button-light` e `.button-outline-light` são as ações sobre blocos coloridos.
- `.section-heading` reúne rótulo, título e introdução opcional.
- `.project-carousel` roda sem fim e pausa com mouse, foco ou o controle.
- `.tag-list` mostra tecnologias em pílulas.

Valide em 320, 768, 1024 e 1440 px, nos dois idiomas e com
`prefers-reduced-motion` ativado.
