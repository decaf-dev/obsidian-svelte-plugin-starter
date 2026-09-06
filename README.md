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
-   Reloads the plugin in Obsidian after each build, via the official Obsidian CLI
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

4. Link `dist/` into your vault so Obsidian can load the plugin. Name the folder to match the `id` in your `manifest.json`:

    ```bash
    ln -s /path/to/your/plugin/dist /path/to/your/vault/.obsidian/plugins/your-plugin-id
    ```

    For example:

    ```bash
    ln -s ~/repos/my-plugin/dist ~/Desktop/obsidian-development/.obsidian/plugins/my-plugin
    ```

5. Open Obsidian, go to **Community plugins**, and enable your plugin

---

## ♻️ Reloading after each build

Obsidian does not pick up new plugin files on its own. If you have the official [Obsidian CLI](https://obsidian.md/help/cli) enabled, the build reloads the plugin for you.

1. Turn the CLI on in Obsidian under **Settings → General → Command line interface** (needs the 1.12.7 installer or newer), then follow the prompt to add it to your PATH. Check it with:

    ```bash
    obsidian version
    ```

2. Copy the example env file and fill in the vault you develop against:

    ```bash
    cp .env.example .env
    ```

    ```bash
    OBSIDIAN_VAULT=obsidian-development
    ```

    Run `obsidian vaults` to list the vault names Obsidian knows about.

Every successful build now reloads the plugin in that vault, whether it came from `bun run dev` or `bun run build`. To reload without rebuilding:

```bash
bun run reload
```

The plugin to reload comes from the `id` field in `manifest.json`. If the folder you linked into `.obsidian/plugins` is named something else, set `OBSIDIAN_PLUGIN_ID` in `.env` to match the folder.

Reloading is entirely optional. With no `.env`, or without the CLI installed, the build prints a short note once and carries on. Note that the CLI starts Obsidian if it is not already running.

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
