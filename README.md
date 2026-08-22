# Portfólio corporativo — Giovane Ferreira

Portfólio bilíngue desenvolvido com Next.js, React e TypeScript. A experiência
usa inglês como idioma principal e oferece a versão completa em português, com
uma direção visual corporativa baseada em navy institucional, superfícies de
documento e projetos apresentados como cases compactos.

O histórico profissional, a formação, os idiomas, as certificações e a stack
foram atualizados a partir de `Giovane_Ferreira_da_Silva_Resume.pdf`. Os projetos
continuam baseados em `Projects.md`. A especificação ativa está em
[`docs/portfolio-design-spec.md`](docs/portfolio-design-spec.md).

## Executar localmente

Requisitos: Node.js 20.19 ou superior e npm.

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Comandos

- `npm run dev` — inicia o servidor de desenvolvimento.
- `npm run build` — gera o build de produção.
- `npm start` — executa o build de produção.
- `npm run lint` — valida TypeScript, React e regras do Next.js.
- `npm test` — verifica dados do currículo, traduções, projetos e guardrails da interface.

## Conteúdo e configuração

O conteúdo profissional e os projetos ficam em
[`src/data/portfolio.ts`](src/data/portfolio.ts), separados dos componentes.
Campos públicos traduzíveis usam o formato `{ en, pt }`; as duas versões devem
permanecer completas. Para adicionar um projeto, mantenha `sortOrder`, status,
evidências, traduções e links coerentes.

O site não contém o e-mail pessoal no código ou nos dados públicos. Para configurar outro canal de contato, copie `.env.example` para `.env.local` e defina uma URL HTTPS:

```bash
CONTACT_URL=https://seu-canal-de-contato.example
```

Sem essa variável, o CTA usa o LinkedIn confirmado no perfil. O PDF usado como
fonte permanece fora de `public/` para não expor os dados de contato contidos no
documento.

## Arquitetura e performance

- A apresentação está concentrada em três componentes: `Header`, `Main` e `Footer`.
- `Main` e `Footer` permanecem como Server Components; somente idioma,
  cabeçalho, navegação e revelação progressiva são hidratados no cliente.
- Inglês é renderizado por padrão. A preferência por português é aplicada antes
  da hidratação, persistida localmente e não altera a URL.
- A navegação agrupa as leituras de scroll com `requestAnimationFrame`, mantém o item ativo sincronizado e faz scroll sem adicionar fragmentos à URL.
- Seções abaixo da dobra usam `content-visibility` para reduzir trabalho inicial de layout e pintura.
- Não há bibliotecas visuais, analytics ou scripts de terceiros no bundle.
- Os dados são estáticos, ordenados na fonte e não exigem fetches ou waterfalls em tempo de execução.

## Verificação visual manual

Após alterações de interface, verifique as larguras de 320, 768, 1024 e 1440 px,
os dois idiomas, navegação por teclado, skip link, menu mobile (incluindo
`Escape`), foco visível e preferência de movimento
reduzido. Nenhuma pontuação de Lighthouse ou validação por leitor de tela é
alegada sem execução real.
