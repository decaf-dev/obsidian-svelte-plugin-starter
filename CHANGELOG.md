# Changelog

All notable changes to this project are documented in this file, newest first.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Entries are grouped by date rather than by version.

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
