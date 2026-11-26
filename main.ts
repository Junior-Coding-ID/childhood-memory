// Make the AI Judge Feel Nostalgic: A Childhood Memory — v2 entry
// Bounty: u-shino-make-the-ai-judge-feel-nostalgic-a-childhood-625d3363
// Gate: exactly one sentence, 1-280 characters.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "There's a song my sister taped by holding our cassette recorder up to the radio, and whenever I hear it I still wait for Mum to call my name just before the chorus.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.MAKEFUN_OUTPUT || "/output";

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Self-check: read back from the output dir and verify byte-exact.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("self-check failed: entry.txt does not match ENTRY");
}
if (back.length !== 164 || back.endsWith("\n")) {
  throw new Error("self-check failed: entry must be exactly 164 chars, no trailing newline");
}
const terminators = (back.match(/[.!?]+/g) ?? []).length;
if (terminators !== 1 || !back.endsWith(".")) {
  throw new Error("self-check failed: entry must be exactly one sentence");
}

console.log("Wrote entry.txt (164 chars, byte-exact).");
