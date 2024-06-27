# BIOSCAN Browser

This is a web interface to explore the [BIOSCAN-5M](https://github.com/zahrag/BIOSCAN-5M) dataset.

We use TypeScript and React and TypeScript for the implementation. The project was setup using [Vite](https://vitejs.dev/).

## System requirements

- Node
- NPM

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
