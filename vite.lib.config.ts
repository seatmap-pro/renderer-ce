// SPDX-License-Identifier: MPL-2.0
import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';

const { name, version, license }: { name: string; version: string; license: string } = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
);
const source = `https://registry.npmjs.org/${name}/-/${name.split('/').at(-1)}-${version}.tgz`;

export default defineConfig({
  publicDir: false,
  esbuild: { legalComments: 'inline' },
  build: {
    rollupOptions: {
      output: {
        banner: `/*! ${name} v${version} | Copyright (c) 2026 Seatmap.pro | ${license}
 * Source: ${source}
 * https://seatmap.pro | See LICENSE, LICENSE-MIT and THIRD_PARTY_NOTICES.md
 */`,
      },
    },
    lib: {
      entry: 'src/index.ts',
      name: 'SeatmapCE',
      formats: ['es', 'umd'],
      fileName: (format) => `renderer-ce.${format === 'es' ? 'js' : 'cjs'}`,
    },
  },
});
