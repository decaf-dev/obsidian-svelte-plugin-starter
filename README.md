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
-   Node.js 22 or newer — runs the build and reload scripts

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

    Always link the **main checkout's** `dist/`, never a git worktree's. A worktree's `dist/` is deleted along with the worktree, which leaves the link dangling.

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

### Working in a git worktree

Your vault links to the main checkout's `dist/`, so a reload from a worktree would load the main checkout's files, not the worktree's. Builds in a worktree therefore skip the reload. To try a worktree build in Obsidian:

1. Stop any `bun run dev` watch running in the main checkout, or its next rebuild will overwrite the files you copy in.
2. Copy `dist/main.js` and `dist/manifest.json` from the worktree into the main checkout's `dist/`.
3. Run `bun run reload` from the main checkout.

When you're done, rebuild in the main checkout to switch back.

---

## 🔁 Releases

The included workflow builds your plugin and attaches `main.js` and `manifest.json` to a GitHub release whenever you push a tag. It requests the `contents: write` permission itself, so you don't need to change your repository's Actions settings.

Tag a version and push it:

```bash
git tag 0.1.0
git push origin 0.1.0
```
