import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const joke = "At dinner, Mia asked why I was sketching the gravy boat. 'It's a pour-trait.'";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outputFile = join(outputDir, 'entry.txt');

try {
  // Count Unicode code points to match the entry gate.
  const length = [...joke].length;
  if (length < 1 || length > 140 || !joke.trim() || /[\r\n\u2028\u2029]/u.test(joke)) {
    throw new Error('Joke must be a nonblank single line of 1–140 code points.');
  }
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputFile, joke, 'utf8');
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  console.error(`Cannot write dad joke to ${outputFile}: ${reason}`);
  process.exitCode = 1;
}
