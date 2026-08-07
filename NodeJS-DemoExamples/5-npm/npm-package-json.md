# 📦 NPM & package.json — Classroom Guide

This README explains **npm** (Node Package Manager), common `npm` commands, how `package.json` and `package-lock.json` are created and used, and best practices for installing dependencies **locally** and **globally**. It's written for students learning how to manage Node.js projects and dependencies.

---

## 🔧 What is npm?

`npm` is the default package manager for Node.js. It lets you:

- Install third-party packages (libraries) from the npm registry.
- Manage project dependencies and their versions.
- Run scripts defined in `package.json`.
- Publish packages to the npm registry (advanced topic).

npm ships with Node.js. Check your versions:

```bash
node -v
npm -v
```

---

## 🆕 Creating a project and `package.json`

`package.json` is a manifest file that describes your Node project and its dependencies. It stores metadata (name, version, scripts) and dependency lists.

### Initialize a project (interactive)

```bash
mkdir demo-project
cd demo-project
npm init
```

This runs a prompt and creates `package.json` with fields you provide.

### Quick initialize (useful for classrooms)

```bash
npm init -y
```

This creates a `package.json` with reasonable defaults (accepts all prompts). Example result:

```json
{
  "name": "demo-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo "Error: no test specified" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

---

## 📂 package.json structure — important fields

- `name` — package name (lowercase, no spaces).
- `version` — semantic version of your project (e.g., `1.0.0`).
- `description` — short description.
- `main` — entry point file (e.g., `index.js`).
- `scripts` — command shortcuts you can run via `npm run <script>`.
- `dependencies` — packages required at runtime (installed with `--save` by older npm; default now).
- `devDependencies` — packages only for development (tests, linters, build tools).
- `engines` — recommend Node.js versions (optional).

Example `scripts` block:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "mocha"
}
```

Run scripts with:

```bash
npm run start
npm run dev
npm test   # shorthand for `npm run test`
```

---

## 📥 Installing packages

npm installs packages either **locally** (project-level) or **globally** (system-level). Prefer **local** installs for project dependencies.

### Install locally (recommended)

```bash
# Install and save to dependencies
npm install express

# Install and save to devDependencies
npm install --save-dev nodemon

# Install multiple packages
npm install lodash axios
```

This updates `package.json` (adds `dependencies`) and creates/updates `package-lock.json` and the `node_modules/` folder.

### Install globally

```bash
npm install -g nodemon
```

Global installs make CLI tools available system-wide (e.g., `nodemon`, `eslint`). Use global installs for tools you use across many projects, but prefer local installs with `npx` for reproducibility.

### Using npx (run local binaries easily)

`npx` runs binaries either from local `node_modules/.bin` or fetches them temporarily:

```bash
# Run package binary without installing globally
npx create-react-app my-app

# Run local dev dependency binary
npx nodemon server.js
```

---

## 🔐 package-lock.json — why it matters

`package-lock.json` is generated automatically when you install packages. It **locks** the exact versions (including nested dependencies) used in your project. This ensures deterministic installs across machines and time.

- `package.json` lists version ranges (e.g. `^1.2.0`), which allow semver updates.
- `package-lock.json` records the exact resolved version for each dependency and sub-dependency.
- Commit `package-lock.json` to version control for consistent builds (especially for apps).

---

## 🔄 Common npm commands — quick reference

| Command                        | What it does                                                                           |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| `npm init`                     | Start interactive creation of `package.json`                                           |
| `npm init -y`                  | Create default `package.json` quickly                                                  |
| `npm install`                  | Install dependencies listed in `package.json` (after cloning)                          |
| `npm install <pkg>`            | Install and add to `dependencies`                                                      |
| `npm install <pkg> --save-dev` | Install and add to `devDependencies`                                                   |
| `npm uninstall <pkg>`          | Remove package and update `package.json`                                               |
| `npm update <pkg>`             | Update package to a newer version within allowed range                                 |
| `npm outdated`                 | Show outdated packages                                                                 |
| `npm ls`                       | Show dependency tree                                                                   |
| `npm run <script>`             | Run a script defined in `package.json`                                                 |
| `npm start`                    | Shortcut for `npm run start` if defined                                                |
| `npm test`                     | Shortcut for `npm run test` if defined                                                 |
| `npm cache clean --force`      | Clear npm cache (use carefully)                                                        |
| `npm ci`                       | Clean install from `package-lock.json` (use in CI environments for reproducible build) |

**Note:** `npm ci` requires `package-lock.json` and removes `node_modules` before installing. Use it in automated pipelines.

---

## ✅ Best Practices & Classroom Tips

- **Always commit `package.json` and `package-lock.json`.** This ensures others can reproduce your environment.
- **Prefer local devDependencies** and run with `npx` instead of installing CLIs globally in projects you share with students.
- **Use semantic versioning** carefully. `^` and `~` allow minor/patch upgrades — discuss pros/cons with students.
- **Explain `node_modules`**: it's large and should **not** be committed to git. Add `node_modules/` to `.gitignore`.
- **Use `npm audit`** to check for known vulnerabilities and discuss security implications (optional advanced topic).

---

## 🧩 Classroom Exercises

1. Initialize a new project and add two dependencies:

```bash
mkdir npm-exercise
cd npm-exercise
npm init -y
npm install express
npm install --save-dev nodemon
```

Open `package.json` and point out the differences between `dependencies` and `devDependencies`.

2. Run a script:

```bash
# add to package.json scripts:
# "start": "node index.js"

npm run start
```

Explain what happens if `start` is missing, and the difference between `npm start` and `npm run start`.

3. Reproducible install:

```bash
# simulate sharing project:
git clone <repo>
cd repo
npm ci
```

Show that `npm ci` installs exact versions from `package-lock.json` and is faster/predictable in CI.

4. Global vs Local:

```bash
npm install -g http-server
# vs
npm install --save-dev http-server
npx http-server
```

Discuss why `npx` is often preferred in modern workflows.

---

## 🛑 Troubleshooting Tips

- `EACCES` or permission errors on global installs: prefer `nvm` (Node Version Manager) or use a node installation that doesn’t require sudo.
- If `node_modules` is corrupt: delete `node_modules` and run `npm ci` or `npm install` again.
- If package version conflicts appear: check `npm ls <pkg>` and `package-lock.json` to inspect nested versions.
- Use `npm cache verify` to check cache health.

---

## 📚 Further Reading & Resources

- npm docs: https://docs.npmjs.com/ (students can search for commands)
- semver: https://semver.org/
- npx docs: https://www.npmjs.com/package/npx

---

## 🧾 Example package.json (demo)

```json
{
  "name": "npm-demo",
  "version": "1.0.0",
  "description": "Small demo to teach npm basics",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"No tests yet\" && exit 0"
  },
  "keywords": [],
  "author": "Instructor",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```
