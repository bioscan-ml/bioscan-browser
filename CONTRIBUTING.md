# Contributing to BIOSCAN Browser

BIOSCAN Browser is an open-source web interface for exploring the [BIOSCAN-5M dataset](https://github.com/bioscan-ml/BIOSCAN-5M). We welcome contributions!

This document is written primarily for the **internal team** (to record how we work) and for **coding agents** (which benefit from explicit conventions). It's also meant to help external contributors get oriented, though we cannot promise timely review or merges.

## Getting started

Setup instructions live in the [README](./README.md). In short, run `npm install` followed by `npm run dev`.

## Project conventions

See the [README](./README.md) for more information about the tech stack and code style. In short:

- **TypeScript** throughout. Shared types go in `src/types/`.
- **Tailwind CSS** for all styling. We try to avoid custom CSS files and inline styles as far as possible.
- **shadcn/ui** for UI primitives. New components can be added via the CLI (`npx shadcn-ui@latest add <component>`).
- **TanStack Query** for all server state. Fetch logic belongs in hooks under `src/hooks/`.
- Run `npm run format` (Prettier) and `npm run lint` (ESLint) before every commit. PRs with errors in either will be asked to fix them.

## Workflow

- Work on feature branches off `main` and open a PR when ready. Branch naming is flexible, something like `feat/short-description` is fine.
- Commit messages should be clear enough that someone reading the history understands what changed and why. Format is flexible.
- Keep PRs focused. Mixed-concern PRs take longer to review and are more likely to stall.
- In the PR description, include a description of what changed and why. Screenshots are helpful!
- Every PR gets a Netlify preview deploy (URL posted as a comment), which is the main review surface.
- Merges to `main` deploy to [browser.bioscan-ml.org](https://browser.bioscan-ml.org/) automatically.

## Rules for coding agents

1. **Always run format and lint before finishing.** `npm run format && npm run lint` must both pass with no errors.

2. **TypeScript strictly.** No `// @ts-ignore`, no `any`, no implicit `any`. If a type is genuinely unknown, use `unknown` and narrow it.

3. **Tailwind only for styling.** No inline `style` props, no new CSS files, no CSS modules. Class-based Tailwind utilities only.

4. **Use existing hooks and utilities.** Before writing a new hook or helper, check `src/hooks/` and `src/lib/` for something that already serves the need.

5. **Data fetching belongs in hooks.** Never call the API or a query client directly inside a component body.

6. **shadcn/ui for new primitives.** If a new UI primitive (button variant, dialog, popover, etc.) is needed, model it after what's already in `src/components/ui/`. Do not introduce an additional component library.

7. **Do not modify `src/components/ui/` unless the task explicitly requires it.** These are shared primitives; changes ripple across the app.

8. **Respect the page subfolder structure.** New pages get a new folder under `src/pages/`; don't put page code in `src/components/`.

9. **No dead code.** Remove any variables, imports, or functions that are unused in the final output.

10. **One concern per PR.** If a task naturally splits into an independent refactor and a feature, make them separate PRs.

## For external contributors

The dataset is used by a wide range of researchers, and outside contributors often bring valuable perspectives and use cases we haven't considered. Please share them!

- **Not sure where to start?** Opening an issue to discuss an idea first is always fine.
- **Issues** are also the best place for bugs, questions, and feature ideas. No template required.
- **Pull requests** are welcome with no contributor agreement or prior approval needed.
- **Review turnaround** is not guaranteed. This is a research project and team availability varies.
- **Low-effort or AI-generated submissions** that don't engage with the codebase or issue context may be closed without extended discussion, though we'll try to preserve the underlying idea as a tracked issue.

Happy coding! 👩🏼‍💻
