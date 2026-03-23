import { SectionCard } from '../components/section-card'

const workflowSteps = [
  'Read the affected layer first: main, preload, renderer, shared, db, tests, or CI.',
  'Reuse existing hooks, query helpers, services, and schemas before inventing new patterns.',
  'Keep changes minimal, typed, and validated at the boundary where data enters the system.',
  'Finish with tests, error handling, and a clear verification note for the next contributor.',
]

const guardrails = [
  'Renderer must not import Electron, Node built-ins, or SQLite directly.',
  'Preload is the only bridge and should expose explicit methods, not raw invoke/send access.',
  'Main treats all renderer input as untrusted and parses it with shared schemas.',
  'Do not widen Electron privileges, disable security defaults, or add unrelated refactors.',
]

const handoffNotes = [
  'Local AI guidance lives in `AGENTS.md` at the project root.',
  'Project overview and usage notes live in `README.md`.',
  'The settings route shows the persisted shape already wired through shared, preload, and main.',
]

export function PlaybookPage() {
  return (
    <div className="space-y-6" data-testid="playbook-page">
      <section className="rounded-[30px] border border-white/70 bg-[linear-gradient(135deg,rgba(244,234,220,0.88),rgba(255,255,255,0.96))] p-8 shadow-panel sm:p-10">
        <p className="text-xs uppercase tracking-[0.32em] text-amber-800/70">AI Playbook</p>
        <h2 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] text-stone-950 sm:text-6xl">Keep future AI edits predictable, layered, and reviewable.</h2>
        <p className="mt-6 max-w-3xl text-base leading-7 text-stone-700">
          This route translates the project rules into a short operator guide so later UI, IPC, and settings work can extend the app without breaking boundaries.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard eyebrow="Workflow" title="Recommended execution order">
          <div className="space-y-3">
            {workflowSteps.map((step, index) => (
              <div key={step} className="flex gap-3 rounded-2xl border border-stone-200/80 bg-stone-50/80 px-4 py-4 text-sm leading-6 text-stone-700">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-900">
                  0{index + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard eyebrow="Guardrails" title="Rules that should not drift">
          <div className="space-y-3">
            {guardrails.map((rule) => (
              <div key={rule} className="rounded-2xl border border-stone-200/80 bg-stone-50/80 px-4 py-4 text-sm leading-6 text-stone-700">
                {rule}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        eyebrow="Handoff"
        title="Files that guide later contributors"
        description="Keep these references up to date when the architecture, scripts, or IPC contract changes."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {handoffNotes.map((note) => (
            <div key={note} className="rounded-2xl border border-stone-200/80 bg-stone-50/80 p-4 text-sm leading-6 text-stone-700">
              {note}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
