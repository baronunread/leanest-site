import { useState } from 'react'
import {
  ArrowRight,
  CaretRight,
  Check,
  Copy,
  GitBranch,
  GithubLogo,
  ListChecks,
  MagnifyingGlass,
  PlayCircle,
  Sparkle,
} from '@phosphor-icons/react'
import { Logo } from './Logo'

const REPO = 'https://github.com/baronunread/leanest'
const NPM = 'https://www.npmjs.com/package/leanest'

const ACTION_YAML = `- uses: actions/checkout@v4
  with:
    fetch-depth: 0

- uses: baronunread/leanest@v1
  with:
    framework: playwright
    typesafe-api-key: \${{ secrets.TYPESAFE_API_KEY }}`

const TERMINAL_OUTPUT = `$ leanest select playwright --base origin/main

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

const PIPELINE = [
  {
    icon: GitBranch,
    label: 'Diff',
    body: 'git diff against your base branch. No API call yet, this step is free.',
  },
  {
    icon: MagnifyingGlass,
    label: 'Discover',
    body: "Finds your e2e specs by reading the framework's own config, not a guessed glob.",
  },
  {
    icon: Sparkle,
    label: 'Judge',
    body: 'One semantic question per test, evaluated in parallel by Jev: could this diff affect it.',
  },
  {
    icon: ListChecks,
    label: 'Decide',
    body: 'Low confidence always means run. A test whose own file changed always runs.',
  },
  {
    icon: PlayCircle,
    label: 'Run',
    body: 'Hands the selected paths to your real playwright or vitest, unmodified.',
  },
]

const COMMANDS: Array<{ cmd: string; body: string }> = [
  { cmd: 'leanest playwright', body: 'Select, then actually run Playwright on the selection.' },
  { cmd: 'leanest vitest', body: 'Select, then actually run Vitest on the selection.' },
  { cmd: 'leanest select playwright', body: 'Show the selection only, run nothing.' },
  { cmd: 'leanest inspect playwright', body: 'Rank every test by relevance, for debugging.' },
]

const OPTIONS: Array<{ flag: string; body: string }> = [
  { flag: '--base <ref>', body: 'Base branch to diff against. Default main.' },
  { flag: '--dir <path>', body: 'Target directory. Default the current one.' },
  { flag: '--changed', body: 'Diff the working tree instead of a branch.' },
  { flag: '--json', body: 'Machine-readable output.' },
  { flag: '--shadow', body: 'Run the full suite, but log what would have been skipped.' },
  { flag: '--full', body: 'Skip selection, run everything.' },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text).catch(() => {})
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      }}
      className="flex items-center gap-1.5 rounded-md border border-[#263029] px-2.5 py-1.5 font-mono text-xs text-[#9aa39d] transition-colors hover:border-[#3a4a3f] hover:text-[#f2f4f2]"
    >
      {copied ? <Check size={14} weight="bold" /> : <Copy size={14} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#1c211d] bg-[#0b0d0c]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo size={26} />
          <span className="text-[17px] font-semibold tracking-tight">leanest</span>
        </a>
        <nav className="flex items-center gap-6">
          <a
            href="#cli"
            className="hidden text-sm text-[#9aa39d] transition-colors hover:text-[#f2f4f2] sm:block"
          >
            CLI
          </a>
          <a
            href="#byok"
            className="hidden text-sm text-[#9aa39d] transition-colors hover:text-[#f2f4f2] sm:block"
          >
            BYOK
          </a>
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 text-sm text-[#9aa39d] transition-colors hover:text-[#f2f4f2] sm:flex"
          >
            <GithubLogo size={17} />
            GitHub
          </a>
          <a
            href="#cta"
            className="rounded-md bg-[#5fdba0] px-3.5 py-2 text-sm font-semibold text-[#08150f] transition-colors hover:bg-[#7cf0b6]"
          >
            Add to your repo
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section
      id="top"
      className="border-b border-[#1c211d] bg-[radial-gradient(1100px_500px_at_85%_-10%,#10241b_0%,#0b0d0c_55%)]"
    >
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-24">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Run only the tests your PR can actually affect.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-[#9aa39d]">
          Diffs your PR, judges each test's relevance in parallel, and runs the real subset
          through your existing runner.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#cta"
            className="flex items-center gap-1.5 rounded-md bg-[#5fdba0] px-4 py-2.5 text-sm font-semibold text-[#08150f] transition-colors hover:bg-[#7cf0b6]"
          >
            Add to your repo
            <ArrowRight size={16} weight="bold" />
          </a>
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-[#263029] px-4 py-2.5 text-sm font-medium text-[#f2f4f2] transition-colors hover:border-[#3a4a3f]"
          >
            <GithubLogo size={16} />
            View on GitHub
          </a>
        </div>

        <div className="mt-14 overflow-hidden rounded-xl border border-[#232623] bg-[#121513]">
          <div className="flex items-center gap-2 border-b border-[#1c211d] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a3f3b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a3f3b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a3f3b]" />
            <span className="ml-2 font-mono text-xs text-[#7c8a80]">real output, rdyrct #236</span>
          </div>
          <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed text-[#c9d1cb]">
{TERMINAL_OUTPUT}
          </pre>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-b border-[#1c211d]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 divide-y divide-[#1c211d] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="py-6 sm:px-8 sm:py-0">
            <div className="font-mono text-xs tracking-wide text-[#7c8a80]">full suite</div>
            <div className="mt-3 text-4xl font-bold tracking-tight">7m 25s</div>
            <div className="mt-1 font-mono text-sm text-[#9aa39d]">153 tests · 35 spec files</div>
          </div>
          <div className="py-6 sm:px-8 sm:py-0">
            <div className="font-mono text-xs tracking-wide text-[#5fdba0]">leanest-selected</div>
            <div className="mt-3 text-4xl font-bold tracking-tight text-[#7cf0b6]">1m 28s</div>
            <div className="mt-1 font-mono text-sm text-[#8fd6ac]">7 tests · 3 spec files</div>
          </div>
          <div className="py-6 sm:px-8 sm:py-0">
            <div className="font-mono text-xs tracking-wide text-[#7c8a80]">this run</div>
            <div className="mt-3 text-4xl font-bold tracking-tight">5.1&times; faster</div>
            <div className="mt-1 font-mono text-sm text-[#9aa39d]">26.5k Jev tokens, 1.6s</div>
          </div>
        </div>
        <p className="mt-8 max-w-2xl text-sm text-[#7c8a80]">
          Measured on{' '}
          <a
            href="https://github.com/baronunread/rdyrct/pull/236"
            target="_blank"
            rel="noreferrer"
            className="text-[#9aa39d] underline decoration-[#2c332e] underline-offset-2 hover:text-[#f2f4f2]"
          >
            a real PR against rdyrct
          </a>
          's Playwright suite. A pure CI or config diff gives Jev no application code to reason
          about, so confidence drops and leanest runs closer to everything, on purpose. The number
          above is the representative case: a real
          feature change.
        </p>
      </div>
    </section>
  )
}

function Pipeline() {
  return (
    <section className="border-b border-[#1c211d]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">How it decides</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-5 sm:gap-6">
          {PIPELINE.map(({ icon: Icon, label, body }, i) => (
            <div key={label} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#232623] bg-[#121513]">
                  <Icon size={17} className="text-[#5fdba0]" />
                </div>
                {i < PIPELINE.length - 1 && (
                  <CaretRight size={14} className="hidden text-[#3a3f3b] sm:block" />
                )}
              </div>
              <div className="text-sm font-semibold">{label}</div>
              <p className="text-sm text-[#9aa39d]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Cli() {
  return (
    <section id="cli" className="border-b border-[#1c211d]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">The CLI</h2>
        <p className="mt-3 max-w-xl text-[#9aa39d]">
          One binary. It selects, then hands off to your real runner, so your reporter, retries
          and CI-required-check behavior stay exactly as they are.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <div className="border-b border-[#1c211d] pb-2 font-mono text-xs tracking-wide text-[#7c8a80]">
              commands
            </div>
            <div className="mt-4 flex flex-col gap-5">
              {COMMANDS.map(({ cmd, body }) => (
                <div key={cmd}>
                  <code className="font-mono text-sm text-[#7cf0b6]">{cmd}</code>
                  <p className="mt-1 text-sm text-[#9aa39d]">{body}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="border-b border-[#1c211d] pb-2 font-mono text-xs tracking-wide text-[#7c8a80]">
              options
            </div>
            <div className="mt-4 flex flex-col gap-5">
              {OPTIONS.map(({ flag, body }) => (
                <div key={flag}>
                  <code className="font-mono text-sm text-[#7cf0b6]">{flag}</code>
                  <p className="mt-1 text-sm text-[#9aa39d]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Byok() {
  return (
    <section id="byok" className="border-b border-[#1c211d] bg-[#0e1210]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center rounded-full border border-[#2c5842] bg-[#10241b] px-3 py-1 font-mono text-xs text-[#5fdba0]">
              bring your own key
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              Your key, your account, your data.
            </h2>
            <p className="mt-4 text-[#9aa39d]">
              leanest has no server of its own. The CLI calls TypeSafe's Jev API directly with
              your <code className="font-mono text-[#c9d1cb]">TYPESAFE_API_KEY</code>. Nothing
              routes through leanest's infrastructure, because there isn't any.
            </p>
            <p className="mt-4 text-[#9aa39d]">
              No key, an expired one, or a timeout all resolve the same way: leanest runs the full
              suite and prints why, instead of silently skipping coverage.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-lg border border-[#232623] bg-[#121513] px-4 py-3 font-mono text-[13px] text-[#c9d1cb]">
⚠ Jev unavailable (...), running the full suite.
            </pre>
          </div>

          <div>
            <div className="font-mono text-xs tracking-wide text-[#7c8a80]">
              set the secret once
            </div>
            <pre className="mt-3 overflow-x-auto rounded-lg border border-[#232623] bg-[#121513] px-4 py-3 font-mono text-[13px] text-[#c9d1cb]">
gh secret set TYPESAFE_API_KEY --repo you/your-repo
            </pre>
            <div className="mt-6 font-mono text-xs tracking-wide text-[#7c8a80]">
              reference it in the workflow
            </div>
            <pre className="mt-3 overflow-x-auto rounded-lg border border-[#232623] bg-[#121513] px-4 py-3 font-mono text-[13px] text-[#c9d1cb]">
{'typesafe-api-key: ${{ secrets.TYPESAFE_API_KEY }}'}
            </pre>
            <p className="mt-4 text-sm text-[#7c8a80]">
              GitHub does not expose repo secrets to workflows triggered from forked-repo pull
              requests by default, the same protection Codecov and similar tokens rely on.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section id="cta" className="border-b border-[#1c211d]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Add it to your repo</h2>
            <p className="mt-3 max-w-lg text-[#9aa39d]">
              Replace your existing "run e2e tests" step. Same reporter, same exit code, fewer
              tests executed.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-[#263029] px-4 py-2.5 text-sm font-medium transition-colors hover:border-[#3a4a3f]"
            >
              <GithubLogo size={16} />
              View on GitHub
            </a>
            <a
              href={NPM}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-[#263029] px-4 py-2.5 text-sm font-medium transition-colors hover:border-[#3a4a3f]"
            >
              npm
            </a>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-[#232623] bg-[#121513]">
          <div className="flex items-center justify-between border-b border-[#1c211d] px-4 py-2.5">
            <span className="font-mono text-xs text-[#7c8a80]">.github/workflows/test.yml</span>
            <CopyButton text={ACTION_YAML} />
          </div>
          <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed text-[#c9d1cb]">
{ACTION_YAML}
          </pre>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Logo size={22} />
          <span className="text-sm text-[#7c8a80]">leanest, MIT licensed</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-[#9aa39d]">
          <a href={REPO} target="_blank" rel="noreferrer" className="hover:text-[#f2f4f2]">
            GitHub
          </a>
          <a href={NPM} target="_blank" rel="noreferrer" className="hover:text-[#f2f4f2]">
            npm
          </a>
          <a
            href={`${REPO}/blob/main/LICENSE`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#f2f4f2]"
          >
            License
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-[#0b0d0c] text-[#f2f4f2]">
      <Nav />
      <Hero />
      <Stats />
      <Pipeline />
      <Cli />
      <Byok />
      <Cta />
      <Footer />
    </div>
  )
}
