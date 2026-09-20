export const REPO = 'https://github.com/baronunread/leanest'
export const NPM = 'https://www.npmjs.com/package/leanest'

export const ACTION_YAML = `- uses: actions/checkout@v4
  with:
    fetch-depth: 0

- uses: baronunread/leanest@v1
  with:
    framework: playwright
    # defaults to classifier-dev: free, no key needed`

export const TERMINAL_OUTPUT = `$ leanest select playwright --base origin/main

Changed:
  src/app/lib/api.ts
  src/app/lib/csv.ts
  src/worker/email-layout.ts
  src/worker/routes/admin.ts
  tests/e2e/admin-users-export.pw.ts

35 tests found

Selected 4 / 35 tests
  RUN tests/e2e/admin-users-export.pw.ts
  RUN tests/e2e/billing-truth.pw.ts
  RUN tests/e2e/downgrade.pw.ts
  RUN tests/e2e/privacy-and-email-abuse.pw.ts

Skipping 31 tests.`

export const PIPELINE = [
  {
    icon: 'git-branch',
    label: 'Diff',
    body: 'git diff against your base branch. No API call yet, this step is free.',
  },
  {
    icon: 'magnifying-glass',
    label: 'Discover',
    body: "Finds your e2e specs by reading the framework's own config, not a guessed glob.",
  },
  {
    icon: 'sparkle',
    label: 'Judge',
    body: 'One semantic question per test, evaluated in parallel by your judge provider: could this diff affect it.',
  },
  {
    icon: 'list-checks',
    label: 'Decide',
    body: 'Low confidence always means run. A test whose own file changed always runs.',
  },
  {
    icon: 'play-circle',
    label: 'Run',
    body: 'Hands the selected paths to your real playwright or vitest, unmodified.',
  },
] as const

export const COMMANDS: Array<{ cmd: string; body: string }> = [
  { cmd: 'leanest playwright', body: 'Select, then actually run Playwright on the selection.' },
  { cmd: 'leanest vitest', body: 'Select, then actually run Vitest on the selection.' },
  { cmd: 'leanest select playwright', body: 'Show the selection only, run nothing.' },
  { cmd: 'leanest inspect playwright', body: 'Rank every test by relevance, for debugging.' },
]

export const PROVIDERS: Array<{ name: string; how: string; key: string; default?: boolean }> = [
  {
    name: 'classifier-dev',
    how: 'classifier.dev, a free zero-shot classifier',
    key: 'none',
    default: true,
  },
  { name: 'jev', how: "TypeSafe's Jev, over HTTP", key: 'TYPESAFE_API_KEY' },
  { name: 'laya', how: 'Laya, self-hosted, runs in-process via ONNX Runtime', key: 'none' },
]

export const OPTIONS: Array<{ flag: string; body: string }> = [
  { flag: '--base <ref>', body: 'Base branch to diff against. Default main.' },
  { flag: '--dir <path>', body: 'Target directory. Default the current one.' },
  { flag: '--changed', body: 'Diff the working tree instead of a branch.' },
  { flag: '--json', body: 'Machine-readable output.' },
  { flag: '--shadow', body: 'Run the full suite, but log what would have been skipped.' },
  { flag: '--full', body: 'Skip selection, run everything.' },
]
