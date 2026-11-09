# Licensing

Project-authored code and documentation in renderer-ce use the Mozilla Public License 2.0 from version 0.2.0. The full license is in `LICENSE`; production source files carry SPDX notices. Other Seatmap.pro products are outside this grant.

## Use and changes

You can use CE commercially and combine it with proprietary code. If you distribute modified MPL-covered files, you must make their source available to recipients under MPL. New files containing MPL-covered code are covered too. Independent files containing no covered code can stay proprietary. You don't have to contribute changes upstream or show Seatmap branding in your interface.

JavaScript delivered to a browser is distributed software. Minified bundles and type declarations don't replace the original TypeScript. The npm archive includes the matching source under `src/`, and the banner identifies that archive by version. Forks must provide source matching their own distributed changes and update the source link accordingly.

The GitHub Pages demo links to its deployed source revision and includes license copies. Other demo deployments must provide the matching source; `RENDERER_CE_SOURCE_URL` sets the link.

## Prior MIT releases

Versions through 0.1.1 were released under MIT. Those releases and copies remain usable under MIT. `LICENSE-MIT` preserves the earlier notice for that code; it is not an MIT option for new MPL-covered changes. Before publishing the first MPL release, the maintainers must confirm the rights to relicense contributed code.

## Third-party materials

KDBush retains its ISC license in `THIRD_PARTY_NOTICES.md`. Red Hat fonts retain their SIL Open Font License in `demo/fonts/OFL.txt`. This change does not relicense third-party venue artwork or marks; their existing notices still apply.

The [Mozilla FAQ](https://www.mozilla.org/en-US/MPL/2.0/FAQ/) explains file boundaries, browser JavaScript, and source distribution. The license itself controls the terms.
