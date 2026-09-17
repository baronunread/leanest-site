# leanest-site

[![CI](https://github.com/baronunread/leanest-site/actions/workflows/ci.yml/badge.svg)](https://github.com/baronunread/leanest-site/actions)
[![React Doctor](https://github.com/baronunread/leanest-site/actions/workflows/react-doctor.yml/badge.svg)](https://github.com/baronunread/leanest-site/actions)

The marketing page for [leanest](https://github.com/baronunread/leanest), a local-first test selector.

**Live:** [leanest.pages.dev](https://leanest.pages.dev/)

Vite + React + TypeScript + Tailwind v4. No backend, no analytics, no build step beyond `vite build`. Deployed on Cloudflare Pages.

## Develop

```bash
bun install
bun dev
```

## Build

```bash
bun run build
```

Outputs a static `dist/` you can serve from anywhere (GitHub Pages, Vercel, Netlify, a plain `nginx` container).

## License

MIT, see [LICENSE](./LICENSE).
