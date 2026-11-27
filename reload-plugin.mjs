import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

// .env is optional, and loadEnvFile throws when it is missing
try {
	process.loadEnvFile();
} catch {}

// a watch session rebuilds constantly, so each message is only ever printed once
const reported = new Set();
let cliMissing = false;
let inWorktree;

function report(message) {
	if (reported.has(message)) return;
	reported.add(message);
	console.log(message);
}

/**
 * True when `cwd` is inside a linked git worktree rather than the main checkout.
 * Anything that isn't a git repo (or a machine without git) counts as not a worktree.
 */
export async function isWorktree(cwd = process.cwd()) {
	try {
		const { stdout } = await execFileAsync(
			"git",
			["rev-parse", "--path-format=absolute", "--git-dir", "--git-common-dir"],
			{ cwd }
		);
		const [gitDir, commonDir] = stdout.trim().split("\n");
		return Boolean(gitDir && commonDir) && gitDir !== commonDir;
	} catch {
		return false;
	}
}

/**
 * The obsidian CLI exits 0 even when it fails, so success has to be read out of its output.
 */
export function reloadSucceeded(output) {
	return output.split("\n").some((line) => line.startsWith("Reloaded: "));
}

export async function reloadPlugin() {
	if (cliMissing) return;

	// the vault links to the main checkout's dist/, so a reload from a worktree
	// would reload the main checkout's stale files instead of this build
	inWorktree ??= await isWorktree();
	if (inWorktree) {
		report(
			"[reload] skipped - this is a git worktree. Copy this build into the main checkout's dist/, then run `bun run reload` there."
		);
		return;
	}

	const vault = process.env.OBSIDIAN_VAULT;
	if (!vault) {
		report(
			"[reload] skipped - no OBSIDIAN_VAULT set. Copy .env.example to .env to enable reloads."
		);
		return;
	}

	const pluginId =
		process.env.OBSIDIAN_PLUGIN_ID ??
		JSON.parse(readFileSync("manifest.json", "utf8")).id;

	let stdout;
	let stderr;
	try {
		({ stdout, stderr } = await execFileAsync("obsidian", [
			`vault=${vault}`,
			"plugin:reload",
			`id=${pluginId}`,
		]));
	} catch (err) {
		if (err.code === "ENOENT") {
			cliMissing = true;
			report(
				"[reload] skipped - the obsidian command was not found. Enable it under Settings -> General -> Command line interface."
			);
		} else {
			report(`[reload] failed: ${err.message}`);
		}
		return;
	}

	const output = `${stdout}${stderr}`.trim();
	if (!reloadSucceeded(output)) {
		report(`[reload] failed: ${output || "no output from the obsidian command"}`);
		return;
	}

	console.log(`[reload] ${pluginId} -> ${vault}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	await reloadPlugin();
}
