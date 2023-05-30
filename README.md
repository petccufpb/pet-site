# Website PET Computação 🖥️

Feito com Next.js + NestJS.

Desenvolvido por Abraão Homualdo, Aran Leite e Lucas Garrafielo.

## Pré-requisitos.
 - [pnpm](https://pnpm.io/pt/)
 - [node](https://nodejs.org/pt-br)
 - Qualquer ambiente Linux ([wsl](https://learn.microsoft.com/pt-br/windows/wsl/install) ou nativo).

## Iniciar ambiente de desenvolvimento.
 - Instalar dependências:
```
pnpm install
```
 - Iniciar servidor backend:
```
pnpm -F backend dev
```
 - Iniciar servidor frontend (em outra sessão):
```
pnpm -F frontend dev
```

## Avisos para futuros desenvolvedores:
 - Quando importar um SVG, você deverá escolher qual loader do Webpack deseja utilizar. Caso queira utilizar o SVGR, importe seu componente assim (preste atenção no **?svgr**):
```tsx
import { SVG } from "@assets/images/icon.svg?svgr";

<SVG />
```
 - Caso queira utilizar o loader padrão do next/image:
```tsx
import { SVG } from "@assets/images/icon.svg";

<Image src={SVG} />
```

## Referências:
 - [Figma SDC](https://www.figma.com/file/dDbK7BZhKKwMkDRDbWaGS8/SDC-XXX)
 - [Figma Geral](https://www.figma.com/file/2gWwDF97q7tnys2nwqBIYe/Projeto-SITE-Pet(Prototipagem)?node-id=96-17&t=zlDtkX5sw9pmRbOz-0)
 - [Trello](https://trello.com/b/pQs2hT3F/site-pet)