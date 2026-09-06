# obsidian-svelte-plugin-starter

A starter template for building [Obsidian](https://obsidian.md) plugins with [Svelte](https://svelte.dev), bundled by [esbuild](https://esbuild.github.io/) and managed with [Bun](https://bun.sh/).

This is an extension of the official [Obsidian plugin starter template](https://github.com/obsidianmd/obsidian-sample-plugin).

---

## ✨ Features

-   Write your plugin interface in Svelte
-   Fast bundling with esbuild and `esbuild-svelte`
-   Bun for dependency management, with a `bun.lock` lockfile
-   Source code in `src/`, build output in `dist/`
-   `bun run dev` rebuilds automatically as you save
-   A GitHub Actions [release workflow](.github/workflows/release.yml) that packages your plugin when you tag a version

---

## ✅ Requirements

-   [Bun](https://bun.sh/) — installs dependencies and runs the build scripts
-   Node.js v22 — recommended

Check what you have installed:

```bash
bun --version
node --version
```

---

## 📦 Getting started

1. Click **Use this template** on GitHub to create your own plugin repository
2. Install dependencies:

    ```bash
    bun install
    ```

3. Start a watch build. It compiles into `dist/` and rebuilds whenever you save:

    ```bash
    bun run dev
    ```

    For a one-off production build, run `bun run build`.

4. Link `dist/` into your vault so Obsidian can load the plugin:

    ```bash
    ln -s /path/to/your/plugin/dist /path/to/your/vault/.obsidian/plugins/your-plugin-name
    ```

    For example:

    ```bash
    ln -s ~/repos/my-plugin/dist ~/Desktop/obsidian-development/.obsidian/plugins/my-plugin
    ```

5. Open Obsidian, go to **Community plugins**, and enable your plugin

---

## 🔁 Releases

The included workflow builds your plugin and attaches the files to a GitHub release whenever you push a tag.

First, give the workflow permission to create releases:

1. Open your repository on GitHub
2. Go to **Settings → Actions → General**
3. Under **Workflow permissions**, select **Read and write permissions**
4. Click **Save**

Then tag a version and push it:

```bash
git tag 1.1.0
git push origin 1.1.0
```
