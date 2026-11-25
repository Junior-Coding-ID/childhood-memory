import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT = "Grandma's kitchen smelled of fried rice and kerosene, and the radio played the same song every evening while she saved the crispy bits at the bottom of the pan for me.";

// Validate: length must be 1-280 characters.
if (TEXT.length < 1 || TEXT.length > 280) {
  throw new Error(`entry must be 1-280 characters, got ${TEXT.length}`);
}

// Validate: single line, no embedded newline or surrounding whitespace.
if (TEXT.includes("\n") || TEXT.trim() !== TEXT) {
  throw new Error("entry must be a single line with no leading/trailing whitespace");
}

// Validate: exactly one sentence (one terminal period, no extra sentence breaks).
const sentenceCount = (TEXT.match(/[.!?]+/g) ?? []).length;
if (sentenceCount !== 1 || !TEXT.endsWith(".")) {
  throw new Error(`entry must be exactly one sentence, got ${sentenceCount} sentence terminators`);
}

const outDir = process.env.MAKEFUN_OUTPUT ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT + "\n", "utf8");
