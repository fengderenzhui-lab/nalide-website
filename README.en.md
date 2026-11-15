# NALIDE Brand Website

Source code of the NALIDE brand website: https://nalide.com

中文版：[README.md](README.md)

Built with React 19, Vite 6, TypeScript and Tailwind CSS v4, plus Lenis for smooth scrolling. The site is fully static; there is no backend dependency (`public/csp-report.php` is a small CSP report collector that runs in the origin server's PHP environment).

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
node scripts/prerender.mjs
```

The prerender step is part of the release process, not optional: it writes the fully rendered page content back into `dist/index.html`. Without it the page still works in a browser, but search engines and AI crawlers receive an empty HTML shell.

## Repository layout

- `src/` — page source; all site copy lives in `src/content.ts`
- `public/` — static files served as-is: policy pages (`privacy/`, `terms/`, `security/`), self-hosted fonts (`fonts/`), `robots.txt`, `sitemap.xml`, `llms.txt`, `.well-known/security.txt`
- `scripts/` — the prerender script
- `tests/` — smoke tests for the built output, run with `npm test`

## License

- The **code** in this repository is released under the [MIT License](LICENSE).
- **Not covered by that license**: the NALIDE name, logo and other brand assets, the images under `public/media/` and `public/layers/`, and the site copy. They may not be used to impersonate NALIDE or for commercial promotion without permission.
- The fonts in `public/fonts/` (Manrope, Michroma, IBM Plex Mono) are licensed by their respective authors under the SIL Open Font License 1.1; the full license texts ship alongside the font files.

## Security issues

Please report security issues following the disclosure policy at https://nalide.com/security/ — do not open a public issue. GitHub private vulnerability reporting is also enabled for this repository (Security tab → "Report a vulnerability").

## Feedback and contributions

Bug reports and enhancement requests are welcome as GitHub Issues, in English or Chinese. For contributions, see [CONTRIBUTING.md](CONTRIBUTING.md): pull requests must pass `npm run lint`, ESLint and `npm test`, and major new functionality must come with tests.
