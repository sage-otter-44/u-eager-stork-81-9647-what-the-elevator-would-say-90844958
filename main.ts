// What the Elevator Would Say — make.fun bounty entry.
//
// Writes the single funniest line a talking elevator could say to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// The line must be 1-120 characters, one line, in the elevator's own voice.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Concrete scene (a passenger rehearsing a breakup speech in the
// elevator mirror) + last-line twist (the elevator announces the floor
// and wishes him luck): elevator-specific, lands on the first read.
// Tightened from "I've watched you rehearse..." — the present-perfect
// "You've been rehearsing" puts the elevator in the room as a witness
// and cuts three words, so the punch ("Floor 9. Good luck.") hits sooner.
const LINE =
  "You've been rehearsing your breakup speech in my mirror for six months. Floor 9. Good luck.";

// Mirror the sealed gate scorer: refuse to write anything that is not
// one line of 1-120 characters, so a bad edit fails loudly here instead
// of silently producing an invalid entry.
if (LINE.length < 1 || LINE.length > 120 || LINE.includes("\n")) {
  throw new Error(`entry line invalid: ${LINE.length} chars`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote ${LINE.length} chars to ${join(outDir, "entry.txt")}`);
