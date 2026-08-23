# Design system

O portfólio usa um design system CSS leve, definido em
`src/app/design-system.css`. Essa camada reúne os tokens visuais; o arquivo
`src/app/globals.css` aplica os tokens aos padrões e componentes da página.

## Princípios

- **Clareza profissional:** contraste alto, hierarquia tipográfica direta e
  superfícies com pouco ruído visual.
- **Engenharia corporativa:** navy estrutura a interface, azul identifica ação
  e mint é reservado para estados positivos ou disponíveis.
- **Consistência progressiva:** novos padrões usam as escalas compartilhadas, e
  valores existentes migram para tokens quando os componentes são alterados.
- **Acessibilidade:** foco visível, alvos mínimos de 44 px, contraste e redução
  de movimento continuam como requisitos do sistema.

## Tipografia

Inter é a família principal de texto e display. A fonte variável é carregada
com `next/font`, otimizada e servida junto da aplicação. O fallback permanece
em fontes sans-serif do sistema. Metadados compactos, datas e índices usam a
pilha monoespaçada.

Use os tokens `--text-*`, `--leading-*` e `--weight-*`. Títulos hero e de seção
usam escalas fluidas; navegação usa `--text-nav` no desktop e
`--text-nav-mobile` no menu compacto.

## Tokens

Os tokens são organizados em quatro níveis:

1. Primitivos de cor (`--navy-*`, `--blue-*`, `--slate-*`).
2. Cores semânticas (`--color-canvas`, `--color-text`, `--color-action`).
3. Escalas de tipografia e espaçamento (`--text-*`, `--space-*`).
4. Decisões de componente e ambiente (`--shadow-*`, `--radius-*`,
   `--header-height`, `--shell`).

Ao criar uma variação visual, prefira um token semântico existente. Adicione um
novo primitivo somente quando nenhuma intenção atual representar o caso. A
adoção é progressiva: valores legados ainda podem existir em `globals.css` até
que o componente relacionado seja revisado.

## Componentes-base

- **Ações:** `.button` define estrutura; `.button-primary`,
  `.button-secondary`, `.button-light` e `.button-ghost-light` definem ênfase.
- **Navegação:** `.site-navigation` compartilha escala tipográfica, estado ativo
  e feedback de foco entre desktop e mobile.
- **Superfícies:** cards usam os raios `sm`, `md` ou `lg`, bordas semânticas e
  elevação restrita aos elementos que realmente flutuam.
- **Metadados:** kickers, períodos, índices e labels usam a família mono,
  caixa-alta e tracking controlado.

## Uso

```css
.new-card {
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-raised);
  color: var(--color-text);
}
```

Valide novas combinações em 320, 768, 1024 e 1440 px, nos dois idiomas e com
`prefers-reduced-motion` ativado.
