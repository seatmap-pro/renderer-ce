# Contributing

Use Node.js 22.12 or later and the Yarn version pinned in `package.json`. Run `corepack yarn install --immutable` before making changes.

Keep the renderer independent of frameworks, backend services, and other Seatmap.pro products. KDBush is the spatial-index dependency; keep its major version aligned with the main renderer. Keep the public entry point a compatible subset of the main renderer: no CE-only helpers or public methods. Public types are exported from `src/index.ts`; use explicit types and no `any`. Keep modules under 600 lines and express intent through names and structure instead of explanatory code comments.

Add tests for behaviour changes. Run type checking, lint, formatting, unit tests, library build, and browser tests as listed in the README. Browser tests exercise the built demo, including keyboard navigation, pointer input, selection limits, export, and responsive layout.

Use public CE sources and synthetic fixtures when working with external AI tools; review their output before publishing it. Code hidden from the public API is still public source.

Before the first public push, check new code and assets for publication rights, credentials, and customer data. A draft PR or public branch already exposes its commits. Copies from private Seatmap.pro code, customer schemas, or support exports need explicit authorization for public release. Synthetic venue examples belong in `demo/venues.ts`; other maps and artwork need a documented source and permission to redistribute.

Keep private product implementations and deployment files out of CE. Do not include credentials, real attendee data, generated bundles, or dependency directories. Before a release, review the source diff and the contents of both the npm archive and the deployed demo. The package's `files` list limits npm contents; it does not limit what is public in Git. Report suspected leaks privately to hello@seatmap.pro without copying sensitive material into a public issue. Revoke exposed credentials; deleting a file does not revoke them.
