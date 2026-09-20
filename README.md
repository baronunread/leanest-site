# leanest-site

[![CI](https://github.com/baronunread/leanest-site/actions/workflows/ci.yml/badge.svg)](https://github.com/baronunread/leanest-site/actions)
[![React Doctor](https://github.com/baronunread/leanest-site/actions/workflows/react-doctor.yml/badge.svg)](https://github.com/baronunread/leanest-site/actions)

The marketing page and docs for [leanest](https://github.com/baronunread/leanest), a local-first test selector.

**Live:** [leanest.pages.dev](https://leanest.pages.dev/) &middot; [/docs](https://leanest.pages.dev/docs)

Astro + TypeScript + Tailwind v4. No backend, no analytics, no client-side framework. Deployed on Cloudflare Pages.

## Pages

- `/` &mdash; the pitch: hero, real CI diff, measured numbers, how it decides, judge providers, one CTA.
- `/docs` &mdash; the reference: install, configuration, commands, flags, judge providers, CI integration, behavior.

## Develop

```bash
bun install
bun dev
```

## Check

```bash
bun run check   # oxlint + astro check + astro build + style-doctor on this README
```

## Build

```bash
bun run build
```

Outputs a static `dist/` you can serve from anywhere (GitHub Pages, Vercel, Netlify, a plain `nginx` container).

## License

MIT, see [LICENSE](./LICENSE).
