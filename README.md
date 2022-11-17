**This is a WIP, stay tuned.**

# Tatum Next.js Example

Next.js project setup with the Tatum-JS SDK and populated with a multitude of different feature examples. You can kick-start your Tatum web application development with this simple boilerplate and see how simple it can be.

## Getting Started

### 1. Install dependencies

```bash
yarn
```

### 2. Create .env file and add your Tatum API KEY

Navigate to the root folder of the project and create an .env file with the TATUM_API_KEY environment variable.

```sh
TATUM_API_KEY='YOUR_API_KEY'
```

### 3. Run the development server

```bash
yarn dev
```

### 4. Start hacking

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result and play with the examples. You can start editing the page by modifying `src/pages/*` or other components.

---

## Deployment (heroku)

1. Create a Heroku application

```sh
heroku create $APP_NAME
```

2. Set your Heroku environment variables

```sh
heroku config:set TATUM_API_KEY=$YOUR_API_KEY
```

3. Push the repository to Heroku

```sh
git push heroku [$YOUR_BRANCH_NAME]:master
```

**You're good to go live!**

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
