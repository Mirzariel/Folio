/**
 * Copy and launch checks. Zero dependencies; run after `astro build`.
 *
 * Two categories:
 *
 *   errors           always fail. Rules the repository must never break.
 *   launch blockers  fail only once `site` is set in astro.config.mjs, i.e.
 *                    once you are really deploying to a domain. Until then
 *                    they are warnings, so placeholders do not block local
 *                    work but cannot reach a buyer either.
 *
 * See docs/LAUNCH_CHECKLIST.md.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative, sep } from 'node:path';

const ROOT = process.cwd();
const errors = [];
const blockers = [];
const fail = (msg) => errors.push(msg);
const block = (msg) => blockers.push(msg);

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const srcFiles = walk(join(ROOT, 'src'));
const distFiles = walk(join(ROOT, 'dist')).filter((f) => extname(f) === '.html');
const rel = (f) => relative(ROOT, f).split(sep).join('/');

/* -- 1. No em dashes. Sentences split with periods, colons and commas. ------
   Hyphenated compounds stay: they are spelling, not punctuation. */
for (const file of srcFiles) {
  if (!/\.(astro|ts|md|css)$/.test(file)) continue;
  const text = readFileSync(file, 'utf8');
  const count = (text.match(/\u2014|&mdash;/g) ?? []).length;
  if (count > 0) fail(`${rel(file)}: ${count} em dash(es). Use a period, colon or comma.`);
}

/* -- 2. Commercial facts come from src/config/site.ts, never a literal. ----
   $20 appeared 11 times in the old markup and 84.2 eight times, which is how
   a stale price survives an edit. */
const FIGURES = [
  [/\$20\b/, '$20'],
  [/\$15\b/, '$15'],
  [/\b84\.2\b/, '84.2'],
  [/\b128,432\b/, '128,432'],
  [/\b12,480\b/, '12,480'],
  [/\b3,208\b/, '3,208'],
  [/\b1,204\b/, '1,204'],
];
for (const file of srcFiles) {
  if (!/\.(astro|ts)$/.test(file)) continue;
  const path = rel(file);
  if (path.startsWith('src/config/') || path.startsWith('src/data/')) continue;
  const text = readFileSync(file, 'utf8');
  for (const [pattern, label] of FIGURES) {
    if (pattern.test(text)) {
      fail(`${rel(file)}: hard-codes "${label}". Import it from @/config/site instead.`);
    }
  }
}

/* -- 3. Component size budget. A file an agent must read whole should stay
   small enough to be worth reading whole. --------------------------------- */
for (const file of srcFiles) {
  if (extname(file) !== '.astro') continue;
  const lines = readFileSync(file, 'utf8').split('\n').length;
  if (lines > 150) fail(`${rel(file)}: ${lines} lines, over the 150-line budget. Split it.`);
}

/* -- 4. Built output: placeholders and dead links. ------------------------- */
let siteConfigured = false;
const astroConfig = readFileSync(join(ROOT, 'astro.config.mjs'), 'utf8');
const siteMatch = /site:\s*['"](https?:\/\/[^'"]+)['"]/.exec(astroConfig);
if (siteMatch) siteConfigured = true;

if (distFiles.length === 0) {
  fail('dist/ has no HTML. Run `astro build` before this check.');
} else {
  for (const file of distFiles) {
    const html = readFileSync(file, 'utf8');

    if (html.includes('example.com')) {
      block(`${rel(file)}: still contains example.com. Set support.email in src/config/site.ts.`);
    }
    const deadLinks = (html.match(/href="#"/g) ?? []).length;
    if (deadLinks > 0) {
      block(`${rel(file)}: ${deadLinks} dead href="#" link(s).`);
    }
    if (/property="og:image" content="\//.test(html)) {
      block(`${rel(file)}: og:image is relative. Set \`site\` in astro.config.mjs.`);
    }
    if (html.includes('data-feedback-unconfigured')) {
      block(`${rel(file)}: feedback form has no Web3Forms key. Set feedback.accessKey in src/config/site.ts.`);
    }
    /* The privacy page says a page load contacts no third party. Fonts are
       self-hosted through Fontsource; a Google Fonts link would make that false. */
    if (/fonts\.(googleapis|gstatic)\.com/.test(html)) {
      fail(`${rel(file)}: requests Google Fonts. Fonts are self-hosted, see src/layouts/BaseLayout.astro.`);
    }
  }
}

/* -- 5. Legal text must be written and approved before it ships. -----------
   Two ways it can fail. Still flagged as a draft, or written but still holding
   a [[TOKEN]] for a fact only the owner has: the selling entity, the governing
   law, the payment provider, the support address. A finished-looking Terms page
   with a blank in it is worse than one that admits it is a draft. */
for (const file of walk(join(ROOT, 'src', 'content', 'legal'))) {
  const text = readFileSync(file, 'utf8');
  if (/^draft:\s*true\s*$/m.test(text)) {
    block(`${rel(file)}: still a draft. Set draft: false once the text is reviewed.`);
  }
  const tokens = [...new Set(text.match(/\[\[[A-Z_]+\]\]/g) ?? [])];
  if (tokens.length > 0) {
    block(`${rel(file)}: unfilled placeholder(s) ${tokens.join(', ')}. See docs/LAUNCH_CHECKLIST.md.`);
  }
}

/* -- report --------------------------------------------------------------- */
const label = siteConfigured ? 'error' : 'launch blocker';
if (siteConfigured) errors.push(...blockers);

for (const message of errors) console.error(`  error  ${message}`);
if (!siteConfigured) for (const message of blockers) console.warn(`  ${label}  ${message}`);

if (errors.length > 0) {
  console.error(`\ncheck:copy failed with ${errors.length} error(s).`);
  process.exit(1);
}

const note = blockers.length > 0 && !siteConfigured
  ? ` ${blockers.length} launch blocker(s) above will fail the build once \`site\` is set in astro.config.mjs.`
  : '';
console.log(`check:copy passed.${note}`);
