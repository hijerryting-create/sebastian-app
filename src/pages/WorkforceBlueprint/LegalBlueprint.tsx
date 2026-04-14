import type { Agent } from '@/types'
import { cn } from '@/lib/utils'
import { AgentStatusBadge } from '@/components/shared/StatusBadge'
import {
  Users, Bot, ArrowRight, Clock,
  FileText, Scale, DollarSign, Truck, RotateCcw, CheckCircle,
  Zap, User,
} from 'lucide-react'

interface Props {
  agents: Agent[]
}

/* ──────────────────────────────────────────────
   Section 1 & 2 — Before / After process flows
   ────────────────────────────────────────────── */

interface Step {
  label: string
  role: string
  icon: React.ReactNode
  hours: number
  isAgent?: boolean
}

const BEFORE_STEPS: Step[] = [
  { label: 'Submit contract request', role: 'Sales Rep', icon: <FileText className="w-4 h-4" />, hours: 2 },
  { label: 'Draft first version', role: 'Legal Counsel', icon: <Scale className="w-4 h-4" />, hours: 8 },
  { label: 'Review margins & pricing', role: 'Finance Analyst', icon: <DollarSign className="w-4 h-4" />, hours: 4 },
  { label: 'Approve delivery criteria', role: 'Services Lead', icon: <Truck className="w-4 h-4" />, hours: 3 },
  { label: 'Redline negotiations (2-3 rounds)', role: 'Legal + Counterparty', icon: <RotateCcw className="w-4 h-4" />, hours: 16 },
  { label: 'Re-review margins', role: 'Finance Analyst', icon: <DollarSign className="w-4 h-4" />, hours: 3 },
  { label: 'Re-approve delivery terms', role: 'Services Lead', icon: <Truck className="w-4 h-4" />, hours: 2 },
  { label: 'Final legal sign-off', role: 'Legal Counsel', icon: <Scale className="w-4 h-4" />, hours: 2 },
  { label: 'Execute & sign', role: 'VP Sales + Legal', icon: <CheckCircle className="w-4 h-4" />, hours: 2 },
]

const AFTER_STEPS: Step[] = [
  { label: 'Submit contract request', role: 'Sales Rep', icon: <FileText className="w-4 h-4" />, hours: 1 },
  { label: 'Auto-draft, review & redline', role: 'Contract Agent', icon: <Bot className="w-4 h-4" />, hours: 0.5, isAgent: true },
  { label: 'Human spot-check (if flagged)', role: 'Legal Counsel', icon: <Scale className="w-4 h-4" />, hours: 1 },
  { label: 'Execute & sign', role: 'VP Sales', icon: <CheckCircle className="w-4 h-4" />, hours: 0.5 },
]

const BEFORE_PEOPLE = [
  { role: 'Sales Rep', hours: 2 },
  { role: 'Legal Counsel', hours: 10 },
  { role: 'Finance Analyst', hours: 7 },
  { role: 'Services Lead', hours: 5 },
  { role: 'VP Sales', hours: 2 },
  { role: 'Counterparty Legal', hours: 16 },
]

const AFTER_PEOPLE = [
  { role: 'Sales Rep', hours: 1 },
  { role: 'Contract Agent', hours: 0.5, isAgent: true },
  { role: 'Legal Counsel', hours: 1 },
  { role: 'VP Sales', hours: 0.5 },
]

/* ──────────────────────────────────────────────
   Section 3 — Org chart transformation
   ────────────────────────────────────────────── */

interface OrgMember {
  name: string
  title: string
  retained?: boolean
}

const BEFORE_ORG: OrgMember[] = [
  { name: 'Sarah Chen', title: 'VP, Legal', retained: true },
  { name: 'Michael Torres', title: 'Sr. Legal Counsel', retained: true },
  { name: 'Amanda Liu', title: 'Legal Counsel' },
  { name: 'James Park', title: 'Legal Counsel' },
  { name: 'Rachel Kim', title: 'Contract Specialist', retained: true },
  { name: 'David Smith', title: 'Contract Specialist' },
  { name: 'Lisa Wang', title: 'Contract Analyst' },
  { name: 'Chris Johnson', title: 'Legal Operations' },
  { name: 'Priya Patel', title: 'Paralegal' },
  { name: 'Tom Garcia', title: 'Paralegal' },
]

const AFTER_ORG: (OrgMember & { isAgent?: boolean })[] = [
  { name: 'Sarah Chen', title: 'VP, Legal', retained: true },
  { name: 'Michael Torres', title: 'Sr. Legal Counsel', retained: true },
  { name: 'Rachel Kim', title: 'Contract Specialist', retained: true },
  { name: 'Contract Agent', title: 'Sales Contract Negotiation AI', isAgent: true },
]

function ProcessFlow({ steps, variant }: { steps: Step[]; variant: 'before' | 'after' }) {
  const isBefore = variant === 'before'
  return (
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={i}>
          <div className={cn(
            'flex items-start gap-3 px-4 py-3 rounded-xl transition-colors',
            step.isAgent ? 'bg-accent-subtle/60' : 'bg-transparent',
          )}>
            {/* Timeline dot + line */}
            <div className="flex flex-col items-center pt-0.5">
              <div className={cn(
                'w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
                step.isAgent
                  ? 'bg-accent text-white'
                  : isBefore ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success',
              )}>
                {step.icon}
              </div>
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-text-1">{step.label}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={cn(
                  'text-[11px] font-medium',
                  step.isAgent ? 'text-accent' : 'text-text-3',
                )}>
                  {step.role}
                </span>
              </div>
            </div>
            {/* Hours */}
            <div className="text-right shrink-0 pt-0.5">
              <div className={cn(
                'text-[14px] font-bold tabular-nums',
                step.isAgent ? 'text-accent' : isBefore ? 'text-text-1' : 'text-success',
              )}>
                {step.hours < 1 ? `${step.hours * 60}m` : `${step.hours}h`}
              </div>
            </div>
          </div>
          {/* Connector */}
          {i < steps.length - 1 && (
            <div className="flex items-center pl-[22px] py-0.5">
              <div className={cn(
                'w-px h-4',
                isBefore ? 'bg-border' : 'bg-accent/20',
              )} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function PeopleList({ people, variant }: { people: typeof BEFORE_PEOPLE; variant: 'before' | 'after' }) {
  const total = people.reduce((s, p) => s + p.hours, 0)
  const isBefore = variant === 'before'
  return (
    <div className={cn(
      'rounded-xl border p-4 mt-4',
      isBefore ? 'border-danger/10 bg-danger-subtle/30' : 'border-success/10 bg-success-subtle/30',
    )}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">People Involved</span>
        <span className={cn(
          'text-[13px] font-bold tabular-nums',
          isBefore ? 'text-danger' : 'text-success',
        )}>
          {total}h total
        </span>
      </div>
      <div className="space-y-1.5">
        {people.map((p, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {'isAgent' in p && p.isAgent ? (
                <Bot className="w-3 h-3 text-accent" />
              ) : (
                <User className="w-3 h-3 text-text-3" />
              )}
              <span className={cn(
                'text-[12px] font-medium',
                'isAgent' in p && p.isAgent ? 'text-accent' : 'text-text-1',
              )}>{p.role}</span>
            </div>
            <span className="text-[12px] text-text-2 tabular-nums font-medium">{p.hours < 1 ? `${p.hours * 60}m` : `${p.hours}h`}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function OrgChart({ members, label, variant }: { members: (OrgMember & { isAgent?: boolean })[]; label: string; variant: 'before' | 'after' }) {
  const head = members[0]
  const rest = members.slice(1)
  return (
    <div>
      <div className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em] mb-4">{label}</div>

      {/* Head */}
      <div className="flex flex-col items-center mb-3">
        <div className="bg-surface border border-border rounded-xl px-4 py-3 shadow-[var(--shadow-card)] text-center">
          <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
            <span className="text-[12px] font-bold text-accent">{head.name.split(' ').map(w => w[0]).join('')}</span>
          </div>
          <div className="text-[12px] font-semibold text-text-1">{head.name}</div>
          <div className="text-[10px] text-text-3">{head.title}</div>
        </div>
        <div className="w-px h-4 bg-border" />
      </div>

      {/* Reports — use grid to keep cards neatly sized */}
      <div className={cn(
        'grid gap-2 justify-items-center',
        rest.length <= 3 ? 'grid-cols-3' : rest.length <= 5 ? 'grid-cols-5' : 'grid-cols-3',
      )}>
        {rest.map((m, i) => (
          <div
            key={i}
            className={cn(
              'rounded-xl px-2.5 py-2 text-center border w-full',
              m.isAgent
                ? 'bg-accent-subtle border-accent/20 shadow-[0_0_12px_rgba(71,0,222,0.08)]'
                : variant === 'before' && !m.retained
                  ? 'bg-surface border-danger/15 opacity-40'
                  : 'bg-surface border-border shadow-[var(--shadow-card)]',
            )}
          >
            <div className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center mx-auto mb-1',
              m.isAgent ? 'bg-accent' : 'bg-background',
            )}>
              {m.isAgent ? (
                <Bot className="w-3 h-3 text-white" />
              ) : (
                <span className="text-[9px] font-bold text-text-2">{m.name.split(' ').map(w => w[0]).join('')}</span>
              )}
            </div>
            <div className={cn(
              'text-[10px] font-semibold truncate',
              m.isAgent ? 'text-accent' : variant === 'before' && !m.retained ? 'text-text-3 line-through decoration-danger/40' : 'text-text-1',
            )}>{m.name}</div>
            <div className="text-[8px] text-text-3 leading-tight mt-0.5 truncate">{m.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Main component
   ────────────────────────────────────────────── */

export function LegalBlueprint({ agents: deptAgents }: Props) {
  const beforeTotal = BEFORE_STEPS.reduce((s, st) => s + st.hours, 0)
  const afterTotal = AFTER_STEPS.reduce((s, st) => s + st.hours, 0)

  return (
    <div className="bg-surface border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-subtle flex items-center justify-center">
            <Scale className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-text-1">Legal</h3>
            <span className="text-[12px] text-text-3">Sales Contract Approval & Review</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {deptAgents.map(agent => (
            <div key={agent.id} className="flex items-center gap-2">
              <Bot className="w-3.5 h-3.5 text-text-3" />
              <span className="text-[12px] font-medium text-text-1">{agent.name}</span>
              <AgentStatusBadge status={agent.status} />
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* ── Section 1 & 2: Before vs After ── */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* BEFORE */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-danger" />
                <span className="text-[13px] font-semibold text-text-1">Before — Manual Process</span>
              </div>
              <div className="flex items-center gap-1.5 bg-danger-subtle px-2.5 py-1 rounded-lg">
                <Clock className="w-3 h-3 text-danger" />
                <span className="text-[12px] font-bold text-danger tabular-nums">{beforeTotal}h per contract</span>
              </div>
            </div>

            <div className="border border-border rounded-xl overflow-hidden">
              <ProcessFlow steps={BEFORE_STEPS} variant="before" />
            </div>

            <PeopleList people={BEFORE_PEOPLE} variant="before" />
          </div>

          {/* AFTER */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-[13px] font-semibold text-text-1">After — Agent-Assisted</span>
              </div>
              <div className="flex items-center gap-1.5 bg-success-subtle px-2.5 py-1 rounded-lg">
                <Zap className="w-3 h-3 text-success" />
                <span className="text-[12px] font-bold text-success tabular-nums">{afterTotal}h per contract</span>
              </div>
            </div>

            <div className="border border-accent/15 rounded-xl overflow-hidden bg-accent-subtle/20">
              <ProcessFlow steps={AFTER_STEPS} variant="after" />
            </div>

            <PeopleList people={AFTER_PEOPLE} variant="after" />

            {/* Savings callout */}
            <div className="mt-4 flex items-center justify-center gap-3 bg-accent-subtle rounded-xl px-4 py-3 border border-accent/10">
              <div className="text-center">
                <div className="text-[11px] font-semibold text-accent uppercase tracking-[0.06em]">Time Reduction</div>
                <div className="text-[22px] font-bold text-accent tabular-nums">{Math.round((1 - afterTotal / beforeTotal) * 100)}%</div>
              </div>
              <div className="w-px h-8 bg-accent/15" />
              <div className="text-center">
                <div className="text-[11px] font-semibold text-accent uppercase tracking-[0.06em]">Hours Saved</div>
                <div className="text-[22px] font-bold text-accent tabular-nums">{beforeTotal - afterTotal}h</div>
              </div>
              <div className="w-px h-8 bg-accent/15" />
              <div className="text-center">
                <div className="text-[11px] font-semibold text-accent uppercase tracking-[0.06em]">People Needed</div>
                <div className="flex items-center gap-1 justify-center">
                  <span className="text-[22px] font-bold text-danger tabular-nums line-through decoration-2">{BEFORE_PEOPLE.length}</span>
                  <ArrowRight className="w-4 h-4 text-text-3" />
                  <span className="text-[22px] font-bold text-success tabular-nums">{AFTER_PEOPLE.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 3: Org Chart Transformation ── */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-4 h-4 text-text-3" />
            <h4 className="text-[15px] font-semibold text-text-1">Legal Team Transformation</h4>
            <span className="text-[12px] text-text-3 ml-2">Org chart before and after agent deployment</span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Before org */}
            <div className="border border-border rounded-xl p-5">
              <OrgChart members={BEFORE_ORG} label="Current Team — 10 Members" variant="before" />
              <div className="mt-5 flex items-center justify-center gap-2 bg-danger-subtle/40 rounded-lg px-3 py-2 border border-danger/10">
                <Users className="w-3.5 h-3.5 text-danger" />
                <span className="text-[12px] font-semibold text-danger">10 FTEs</span>
                <span className="text-[11px] text-text-3 mx-1">&middot;</span>
                <span className="text-[12px] text-text-2">~$1.8M annual cost</span>
              </div>
            </div>

            {/* After org */}
            <div className="border border-accent/15 rounded-xl p-5 bg-accent-subtle/10">
              <OrgChart members={AFTER_ORG} label="Transformed Team — 3 Members + 1 Agent" variant="after" />
              <div className="mt-5 flex items-center justify-center gap-2 bg-success-subtle/40 rounded-lg px-3 py-2 border border-success/10">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-success" />
                  <span className="text-[12px] font-semibold text-success">3 FTEs</span>
                </div>
                <span className="text-[11px] text-text-3">&middot;</span>
                <div className="flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[12px] font-semibold text-accent">1 Agent</span>
                </div>
                <span className="text-[11px] text-text-3">&middot;</span>
                <span className="text-[12px] text-text-2">~$640K annual cost</span>
              </div>
            </div>
          </div>

          {/* Bottom savings bar */}
          <div className="mt-4 flex items-center justify-center gap-6 bg-accent-subtle rounded-xl px-6 py-4 border border-accent/10">
            <div className="text-center">
              <div className="text-[10px] font-semibold text-accent uppercase tracking-[0.06em]">Headcount Reduction</div>
              <div className="text-[26px] font-bold text-accent leading-none mt-1">70%</div>
            </div>
            <div className="w-px h-10 bg-accent/15" />
            <div className="text-center">
              <div className="text-[10px] font-semibold text-accent uppercase tracking-[0.06em]">Annual Savings</div>
              <div className="text-[26px] font-bold text-accent leading-none mt-1">$1.16M</div>
            </div>
            <div className="w-px h-10 bg-accent/15" />
            <div className="text-center">
              <div className="text-[10px] font-semibold text-accent uppercase tracking-[0.06em]">Retained Expertise</div>
              <div className="text-[26px] font-bold text-text-1 leading-none mt-1">VP + Sr. Counsel + Specialist</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
