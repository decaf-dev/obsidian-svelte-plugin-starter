# obsidian-svelte-plugin-starter

A modern [Obsidian](https://obsidian.md) plugin starter template that integrates [Svelte](https://svelte.dev) for UI development, powered by [esbuild](https://esbuild.github.io/) and [Bun](https://bun.sh/) for fast builds and dependency management.

This is an extension of the official [Obsidian plugin starter template](https://github.com/obsidianmd/obsidian-sample-plugin).

---

### ✨ Features

-   ✅ **Svelte Integration** – Build reactive plugin interfaces using [Svelte](https://svelte.dev)
-   ⚡ **Esbuild for Svelte** – Fast bundling via [esbuild](https://esbuild.github.io/) with Svelte support
-   🐰 **Bun Lockfile** – Uses [Bun](https://bun.sh/) for dependency resolution and a `bun.lockb` file
-   📦 **Standard Structure** – Source code in a `src/` folder, output to a `dist/` folder
-   🔁 **Automatic Rebuilds** – Run `bun run dev` to watch for changes and auto-export to `dist/`
-   🚀 **Release Ready** – Includes a GitHub Actions [`release.yml`](.github/workflows/release.yml) workflow for building and publishing releases

---

### ✅ Requirements

Before you begin, make sure you have the following installed:

-   [**Bun**](https://bun.sh/) – required for dependency management and running build scripts
-   **Node.js v22** _(suggested)_ – for optimal compatibility with modern APIs and tooling

You can verify your environment with:

```bash
bun --version
node --version
```

---

### 📦 Getting Started

1. Click **"Use this template"** on GitHub to create your own plugin repository
2. Install dependencies:
    ```bash
    bun install
    ```
3. Build the plugin into the `dist/` folder, run:
    ```
    bun run dev
    ```
4. To test the plugin locally in your Obsidian vault, create a symbolic link:

    ```bash
    ln -s /path/to/your/template/dist /path/to/your/vault/.obsidian/plugins/your-plugin-name
    ```

    e.g.

    ```bash
    ln -s /decaf-dev/repos/my-plugin/dist /decaf-dev/desktop/obsidian-development/.obsidian/plugins/my-plugin
    ```

5. Open Obsidian. Navigate to **Community Plugins** and enable your plugin

### 🔁 Setting Up GitHub Releases

To automatically generate plugin bundles when tagging a new release:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Actions** → **General**
3. Under **Workflow permissions**, select:  
   ✅ **Read and write permissions**
4. Click **Save** to apply changes

    Now, to trigger a release, simply tag a version:

    ```bash
    git tag 1.1.0
    git push 1.1.0
    ```

    This will run the `release.yml` workflow and generate your plugin build in the release assets.
