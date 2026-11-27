import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { execFileSync } from "node:child_process";
import { mkdtempSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { isWorktree, reloadSucceeded } from "./reload-plugin.mjs";

describe("reloadSucceeded", () => {
	test("true when the CLI reports a reload", () => {
		expect(reloadSucceeded("Reloaded: sample-plugin")).toBe(true);
	});

	test("true when the reload line follows other output", () => {
		expect(reloadSucceeded("some notice\nReloaded: sample-plugin")).toBe(true);
	});

	test.each([
		'Error: Plugin "note-splitter" is not enabled.',
		'Error: Plugin "does-not-exist" not found. Use "plugins" to list available plugins.',
		"Vault not found.",
		"",
	])("false for %p", (output) => {
		expect(reloadSucceeded(output)).toBe(false);
	});
});

describe("isWorktree", () => {
	let root;
	let mainCheckout;
	let worktree;
	let notARepo;

	const git = (cwd, ...args) => execFileSync("git", args, { cwd, stdio: "ignore" });

	beforeAll(() => {
		root = realpathSync(mkdtempSync(join(tmpdir(), "reload-plugin-test-")));
		mainCheckout = join(root, "main");
		worktree = join(root, "worktree");
		notARepo = mkdtempSync(join(tmpdir(), "reload-plugin-test-plain-"));

		execFileSync("git", ["init", mainCheckout], { stdio: "ignore" });
		git(mainCheckout, "-c", "user.name=t", "-c", "user.email=t@t", "-c", "commit.gpgsign=false", "commit", "--allow-empty", "-m", "init");
		git(mainCheckout, "worktree", "add", worktree);
	});

	afterAll(() => {
		rmSync(root, { recursive: true, force: true });
		rmSync(notARepo, { recursive: true, force: true });
	});

	test("false in the main checkout", async () => {
		expect(await isWorktree(mainCheckout)).toBe(false);
	});

	test("true in a linked worktree", async () => {
		expect(await isWorktree(worktree)).toBe(true);
	});

	test("false outside a git repo", async () => {
		expect(await isWorktree(notARepo)).toBe(false);
	});
});
