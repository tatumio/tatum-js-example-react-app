__**This is a WIP, stay tuned.**__

# Tatum Next.js Example

Next.js application.

## Getting Started

### 1. Install dependencies

```bash
yarn
```

### 2. Run the development server

```bash
yarn dev
```

### 3. Start hacking

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/pages/*` and other components.

---

## Commit Message Convention

This repo is using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), it is mandatory to use it to commit changes.

## Tests

Project is using Jest for unit testing, with testing-library/react for FE tests.

```bash
yarn test
```

## Linting

Linting is done in a pre-commit hook if possible, but feel free to go manual mode. The project uses ESLint and Prettier with some plugins.

```bash
yarn lint
yarn lint:fix
```

**Plugins**  
[Simple Import Sort](https://www.npmjs.com/package/eslint-plugin-simple-import-sort)  
[Unused Imports](https://www.npmjs.com/package/eslint-plugin-unused-imports)  
[Prettier Tailwind](https://www.npmjs.com/package/prettier-plugin-tailwind)
