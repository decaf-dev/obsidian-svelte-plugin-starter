import { execFile } from "node:child_process";
import { readFileSync } from "fs";
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

function report(message) {
	if (reported.has(message)) return;
	reported.add(message);
	console.log(message);
}

export async function reloadPlugin() {
	if (cliMissing) return;

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
	try {
		({ stdout } = await execFileAsync("obsidian", [
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

	// the CLI exits 0 even when it fails, so problems have to be read out of stdout
	const output = stdout.trim();
	if (output.startsWith("Error:") || output === "Vault not found.") {
		report(`[reload] ${output}`);
		return;
	}

	console.log(`[reload] ${pluginId} -> ${vault}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	await reloadPlugin();
}
