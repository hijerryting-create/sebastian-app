import { cn } from '@/lib/utils'
import { FileText, Bot, User, Shield, Filter } from 'lucide-react'

interface AuditEntry {
  id: string
  timestamp: string
  actor: string
  actorType: 'user' | 'agent' | 'system'
  action: string
  resource: string
  detail: string
}

const auditLog: AuditEntry[] = [
  { id: 'aud-001', timestamp: '2026-04-13T09:45:00Z', actor: 'Support Triage', actorType: 'agent', action: 'Escalated', resource: 'TKT-34305', detail: 'Enterprise customer, negative sentiment score -0.72' },
  { id: 'aud-002', timestamp: '2026-04-13T09:30:00Z', actor: 'Jerry Ting', actorType: 'user', action: 'Approved', resource: 'CLM-8421', detail: 'Manual approval for claim exceeding $50K threshold' },
  { id: 'aud-003', timestamp: '2026-04-13T09:15:00Z', actor: 'Invoice Reconciliation', actorType: 'agent', action: 'Auto-approved', resource: 'INV-20489', detail: 'Matched to PO-9934, within 2% tolerance' },
  { id: 'aud-004', timestamp: '2026-04-13T08:30:00Z', actor: 'Claims Processing', actorType: 'agent', action: 'Flagged', resource: 'CLM-8451', detail: 'Amount $72,500 exceeds $50K threshold, sent to HITL' },
  { id: 'aud-005', timestamp: '2026-04-13T08:00:00Z', actor: 'System', actorType: 'system', action: 'Deployed', resource: 'Claims Processing v2.4.1', detail: 'Production deployment completed successfully' },
  { id: 'aud-006', timestamp: '2026-04-12T17:00:00Z', actor: 'Sarah Chen', actorType: 'user', action: 'Rejected', resource: 'EMP-1094', detail: 'Background check flagged, returned for review' },
  { id: 'aud-007', timestamp: '2026-04-12T16:45:00Z', actor: 'Employee Onboarding', actorType: 'agent', action: 'Completed', resource: 'EMP-1093', detail: 'IT provisioning, VPN access, and badge issued' },
  { id: 'aud-008', timestamp: '2026-04-12T14:30:00Z', actor: 'System', actorType: 'system', action: 'Deployed', resource: 'Invoice Recon v1.8.0', detail: 'Production deployment completed successfully' },
  { id: 'aud-009', timestamp: '2026-04-12T12:00:00Z', actor: 'Contract Review', actorType: 'agent', action: 'Extracted', resource: 'CTR-5578', detail: 'Non-standard indemnification clause flagged for legal review' },
  { id: 'aud-010', timestamp: '2026-04-12T11:00:00Z', actor: 'Rachel Kim', actorType: 'user', action: 'Failed deploy', resource: 'Contract Review v0.9.3', detail: 'Staging deployment failed — integration test timeout' },
]

const actorIcons = { user: User, agent: Bot, system: Shield }
const actorColors = { user: 'text-accent', agent: 'text-success', system: 'text-text-3' }

export function AuditLog() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-fade-in">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-text-1 tracking-[-0.03em]">Audit Log</h1>
          <p className="text-[15px] text-text-2 mt-2">Complete history of all agent and user actions.</p>
        </div>
        <button
          onClick={() => alert('Export audit log as CSV')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border text-text-1 text-[13px] font-semibold rounded-xl hover:bg-background transition-colors"
        >
          <FileText className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="flex items-center gap-2 mb-5">
        <Filter className="w-3.5 h-3.5 text-text-3" />
        {['All', 'Agents', 'Users', 'System'].map(f => (
          <button key={f} className={cn(
            'px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors',
            f === 'All' ? 'bg-accent text-white' : 'bg-surface border border-border text-text-2 hover:bg-background',
          )}>
            {f}
          </button>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
        <div className="divide-y divide-border">
          {auditLog.map(entry => {
            const Icon = actorIcons[entry.actorType]
            return (
              <div key={entry.id} className="flex items-start gap-4 px-6 py-4 hover:bg-background/60 transition-colors">
                <div className={cn('mt-0.5 shrink-0', actorColors[entry.actorType])}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[13px] font-semibold text-text-1">{entry.actor}</span>
                    <span className="text-[12px] text-text-3">{entry.action}</span>
                    <span className="text-[12px] font-semibold text-accent">{entry.resource}</span>
                  </div>
                  <p className="text-[12px] text-text-3">{entry.detail}</p>
                </div>
                <span className="text-[11px] text-text-3 tabular-nums shrink-0 mt-0.5">
                  {new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
