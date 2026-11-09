// SPDX-License-Identifier: MPL-2.0
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const archive = process.argv[2];
assert(archive, 'Usage: node tools/check-package.mjs <archive.tgz>');
const entries = execFileSync('tar', ['-tzf', archive], { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter((file) => !file.endsWith('/'));
const notices = ['LICENSE', 'LICENSE-MIT', 'LICENSING.md', 'THIRD_PARTY_NOTICES.md', 'README.md'];
const allowedRoot = new Set(['package.json', ...notices]);
const sources = execFileSync('git', ['ls-files', '--', 'src'], { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter((file) => file.endsWith('.ts') && !file.endsWith('.test.ts'));
const allowedSources = new Set(sources);
const allowedBuild = new Set([
  'dist/renderer-ce.js',
  'dist/renderer-ce.cjs',
  ...sources.map((file) => file.replace(/^src\//, 'dist/types/').replace(/\.ts$/, '.d.ts')),
]);

for (const entry of entries) {
  const file = entry.replace(/^package\//, '');
  assert(
    entry.startsWith('package/') &&
      !file.split('/').includes('..') &&
      (allowedRoot.has(file) || allowedBuild.has(file) || allowedSources.has(file)),
    `Unexpected package file: ${entry}`,
  );
}

function read(file) {
  assert(entries.includes(`package/${file}`), `Missing package file: ${file}`);
  return execFileSync('tar', ['-xOf', archive, `package/${file}`], { encoding: 'utf8' });
}

const metadata = JSON.parse(readFileSync('package.json', 'utf8'));
const packed = JSON.parse(read('package.json'));
assert.equal(metadata.license, 'MPL-2.0');
assert(!/^0\.1\./.test(metadata.version), 'Prior MIT versions must not be reused');
for (const key of ['name', 'version', 'license']) assert.equal(packed[key], metadata[key]);
for (const file of notices) assert.equal(read(file), readFileSync(file, 'utf8'));
read(metadata.types.replace(/^\.\//, ''));

for (const path of sources) {
  const source = readFileSync(path, 'utf8');
  assert(source.startsWith('// SPDX-License-Identifier: MPL-2.0\n'), `Missing SPDX: ${path}`);
  assert.equal(read(path), source, `Stale package source: ${path}`);
}

const sourceUrl = `https://registry.npmjs.org/${metadata.name}/-/${metadata.name.split('/').at(-1)}-${metadata.version}.tgz`;
for (const file of ['dist/renderer-ce.js', 'dist/renderer-ce.cjs']) {
  const banner = read(file).slice(0, 1024);
  assert(banner.includes(`/*! ${metadata.name} v${metadata.version}`), `Missing banner: ${file}`);
  assert(banner.includes(` | ${metadata.license}\n`), `Missing license: ${file}`);
  assert(banner.includes(`Source: ${sourceUrl}`), `Wrong source link: ${file}`);
}

console.log('Package checked: license, matching source, both banners and allowed files.');
