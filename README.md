# BIOSCAN Browser

The BIOSCAN Browser is a web interface to navigate the [BIOSCAN-5M](https://github.com/zahrag/BIOSCAN-5M) dataset. The goal is to lower the threshold for users to explore the dataset by presenting data in interactive and comprehensive ways.

We use TypeScript and React and TypeScript for the implementation. The project was setup using [Vite](https://vitejs.dev/).

## System requirements

- [Node](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)

The `.nvmrc` file in project root describes the recommended Node version for this project.

## Getting started

```bash
# Install dependencies
npm install

# Run app in development mode
npm run dev
```

The app will now be available in a browser on http://localhost:5173/. Hot reload will be enabled by default.

## Deployment

To be added.

## Code style

We use [Prettier](https://prettier.io/) as a code formatter. The project preferences are specified in `.prettierrc`.

```bash
# Auto format all code
npm run format
```

We use [ESLint](https://eslint.org/) to detect what we consider as problems in the code. The project preferences are specified in `.eslintrc.cjs`.

```bash
# Run linter for all code
npm run lint
```

If you are using Visual Studio Code, the following extensions are recommended for code style:

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## UI components

We use [shadcn/ui](https://ui.shadcn.com/) as a component reference. Components are built using [Radix UI](https://www.radix-ui.com/) and [Tailwind CSS](https://tailwindcss.com/).

To add a new component to the project, first checkout the list of [available components](https://ui.shadcn.com/docs/components). Then use the CLI to add a component to the project. This will create a new component in folder `/src/components/ui` and install any dependencies it might have. Since components are copied to the project, not installed as dependencies, they can be tweaked as needed.
