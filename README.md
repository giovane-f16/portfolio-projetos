# Portfólio — Giovane Ferreira

Portfólio pessoal desenvolvido com Next.js, React e TypeScript a partir da especificação em [`docs/portfolio-design-spec.md`](docs/portfolio-design-spec.md). A interface usa uma direção dark de inspiração técnica, com títulos de alto contraste, metadados monoespaçados e projetos apresentados como estudos de caso compactos. Todo o conteúdo fictício da referência visual foi substituído por informações confirmadas nas fontes do projeto.

## Executar localmente

Requisitos: Node.js 20.9 ou superior e npm.

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
- `npm test` — verifica a integridade dos dados públicos do portfólio.

## Conteúdo e configuração

O conteúdo profissional e os projetos ficam em [`src/data/portfolio.ts`](src/data/portfolio.ts), separados dos componentes. Para adicionar um projeto, preencha o modelo `Project` e mantenha `sortOrder`, status, evidências e links coerentes.

O site não contém o e-mail pessoal no código ou nos dados públicos. Para configurar outro canal de contato, copie `.env.example` para `.env.local` e defina uma URL HTTPS:

```bash
CONTACT_URL=https://seu-canal-de-contato.example
```

Sem essa variável, o CTA usa o LinkedIn confirmado no perfil.

## Arquitetura e performance

- A apresentação está concentrada em três componentes: `Header`, `Main` e `Footer`; os helpers visuais privados ficam no módulo de `Main`.
- `Main` e `Footer` permanecem como Server Components; somente o cabeçalho, a navegação e o observador leve de revelação são hidratados no cliente.
- A navegação agrupa as leituras de scroll com `requestAnimationFrame`, mantém o item ativo sincronizado e faz scroll sem adicionar fragmentos à URL.
- Seções abaixo da dobra usam `content-visibility` para reduzir trabalho inicial de layout e pintura.
- Não há bibliotecas visuais, analytics ou scripts de terceiros no bundle.
- Os dados são estáticos, ordenados na fonte e não exigem fetches ou waterfalls em tempo de execução.

## Imagens de projetos

As capturas e imagens provisórias citadas na especificação não foram adicionadas porque ainda dependem de captura e/ou autorização. A composição atual apresenta os projetos em linhas editoriais e não renderiza capas. Antes de publicar imagens reais:

1. confirme a autorização de uso;
2. salve e otimize o arquivo em `public/projects/`;
3. preencha `image.src`, `image.alt`, `image.focalPoint`, `image.source` e `image.provisional`;
4. implemente a imagem responsiva no card, com texto alternativo contextual e fallback seguro para erro.

Não dependa permanentemente de hosts de terceiros.

## Verificação visual manual

Após alterações de interface, verifique as larguras de 320, 768, 1024 e 1440 px, navegação por teclado, skip link, menu mobile (incluindo `Escape`), foco visível e preferência de movimento reduzido. Nenhuma pontuação de Lighthouse ou validação por leitor de tela é alegada sem execução real.
