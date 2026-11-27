# Changelog

All notable changes to this project are documented in this file, newest first.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Entries are grouped by date rather than by version.

## 2026-11-27

### Added

-   `bun run test` script, with `bun:test` tests for the reload script's worktree detection and success check
-   README section on working in a git worktree

### Changed

-   Builds in a git worktree now skip the reload, even when `OBSIDIAN_VAULT` is set. The vault links to the main checkout's `dist/`, so a reload from a worktree would have loaded the main checkout's files
-   The release workflow now uses `actions/checkout@v7`, `actions/setup-node@v7`, `oven-sh/setup-bun@v2` and `softprops/action-gh-release@v3`, installs with `--frozen-lockfile`, and fails if a release file is missing
-   The release workflow now grants itself `contents: write`, so the repository's Actions permissions no longer need changing
-   Node.js 22 or newer is now listed as required rather than recommended
-   The README symlink step now says to link the main checkout's `dist/`, never a worktree's
-   The plugin now starts at version `0.1.0` instead of `1.0.0`
-   ESLint now ignores `.worktrees/`

### Fixed

-   A reload is only reported as successful when the Obsidian CLI prints `Reloaded:`. Previously any output that wasn't a known error, including none at all, counted as success
-   Reload errors written to stderr are now shown
-   The release workflow no longer lists `dist/styles.css`, which the build never produces (Svelte styles are injected into `main.js`)

## 2026-11-22

### Changed

-   Updated dependencies: `svelte` 5.59, `obsidian` 1.14.4, `esbuild` 0.28.2, `tslib` 2.9.1, and the Svelte and ESLint tooling
-   `@codemirror/state` and `@codemirror/view` are now pinned to the versions `obsidian` 1.14.4 expects (6.7.6 and 6.43.13)

## 2026-09-06

### Added

-   Plugin reload after each successful build, through the official Obsidian CLI. Set `OBSIDIAN_VAULT` in a local `.env` (see `.env.example`) to enable it; builds carry on unchanged without it
-   `bun run reload` script for reloading the plugin without rebuilding
-   Credit to the official Obsidian sample plugin template in the README

### Changed

-   The README symlink step now recommends naming the folder under `.obsidian/plugins` after the `id` in `manifest.json`, which is what a reload targets
-   Simplified README language and reduced emoji usage

## 2025-05-09

### Added

-   Release section in the README, covering the Actions permissions needed and how to tag a version

### Fixed

-   Missing `fs` and `path` imports in `esbuild.config.mjs`

### Changed

-   README wording and spacing

## 2025-05-08

### Added

-   Initial Obsidian plugin starter template with Svelte support: esbuild config with `esbuild-svelte` and `svelte-preprocess`, `src/obsidian` and `src/svelte` source layout, and a GitHub Actions release workflow
