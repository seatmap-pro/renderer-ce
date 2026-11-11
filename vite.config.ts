// SPDX-License-Identifier: MPL-2.0
import { defineConfig } from 'vite';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const source =
  process.env.RENDERER_CE_SOURCE_URL ??
  `https://github.com/${process.env.GITHUB_REPOSITORY ?? 'seatmap-pro/renderer-ce'}/tree/${
    process.env.GITHUB_SHA ??
    execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
  }`;

export default defineConfig({
  plugins: [
    {
      name: 'demo-licenses',
      transformIndexHtml: (html) => html.replaceAll('%CE_SOURCE_URL%', source),
      generateBundle() {
        for (const file of ['LICENSE', 'LICENSE-MIT', 'LICENSING.md', 'THIRD_PARTY_NOTICES.md']) {
          const text = readFileSync(new URL(file, import.meta.url), 'utf8');
          this.emitFile({
            type: 'asset',
            fileName: `licenses/${file}`,
            source:
              file === 'THIRD_PARTY_NOTICES.md'
                ? text.replace('(demo/fonts/OFL.txt)', '(OFL.txt)')
                : text,
          });
        }
        this.emitFile({
          type: 'asset',
          fileName: 'licenses/OFL.txt',
          source: readFileSync(new URL('./demo/fonts/OFL.txt', import.meta.url)),
        });
      },
    },
  ],
  base: './',
  server: { port: 3010, strictPort: true },
  preview: { port: 3010, strictPort: true },
  build: { outDir: 'dist-demo', assetsInlineLimit: 0 },
});
