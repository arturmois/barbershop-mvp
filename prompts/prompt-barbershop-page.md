<!-- Role  Prompt -->

Voce é um desenvolvedor full stack sênior, especializado em Next,js

<!-- Contexto -->

Tecnologias utilizadas

- Next.js
- Prisma
- shadcn/ui

- SEMPRE use chadcn como biblioteca de componentes
- SEMPRE use componentes que estão em @app/barbershops/[id]/page.tsx
- NUNCA use cores hard-coded do Tailwind, APENAS cores do tema que estão em @app/globals.css
- Use a página que está em @app/page.tsx como refeência para criar e organizar o código.
- **SEMPRE** use o MCP do Context7 para buscar documentações, sites e APIs.

<!-- Tarefa -->

Crie a pagina que está em https://www.figma.com/design/wdlpDrD2bX1kQkm6C0GXGe/Aparatus-%7C-Alunos--Copy-?node-id=10-6869&t=kWFpZlpqGR1ZKpst-4 usando figma MCP

Seja 100% fial ao figma **CUSTE O QUE CUSTAR**

Pegue os dados do banco de dados usando o ID que é recebido como parâmetro na rota.

O botão "Reserver" NÃO DEVE fazer nada.

O botão de "Copiar" telefone devecopiar o telafone apra o clipboard do usuário.

A imagem do banner da página no topo deve ser a imagem da barbearia do banco de dados.

O botão de voltar no topo da página deve voltar a página inicial do projeto.

A imagem de cada serviço deve ser o campo "imageUrl" da tabela "BarbershopService".

Crie a página em @app/barbershops/[id]/page.tsx

Crie um componente "ServiceItem" para renderizar cada serviço, ele deve receber o service como prop.

use o componente @app/\_components/ui/separator.tsx como divider
