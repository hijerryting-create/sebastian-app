import { cn } from '@/lib/utils'
import { Rocket, CheckCircle, AlertTriangle, RotateCcw } from 'lucide-react'

interface Deployment {
  id: string
  agentId: string
  agentName: string
  version: string
  env: 'production' | 'staging' | 'development'
  status: 'live' | 'deploying' | 'rolled-back' | 'failed'
  deployedAt: string
  deployedBy: string
}

const deployments: Deployment[] = [
  { id: 'dep-001', agentId: 'claims-processing', agentName: 'Claims Processing', version: 'v2.4.1', env: 'production', status: 'live', deployedAt: '2026-04-13T08:00:00Z', deployedBy: 'Jerry Ting' },
  { id: 'dep-002', agentId: 'invoice-reconciliation', agentName: 'Invoice Reconciliation', version: 'v1.8.0', env: 'production', status: 'live', deployedAt: '2026-04-12T14:30:00Z', deployedBy: 'Sarah Chen' },
  { id: 'dep-003', agentId: 'customer-support-triage', agentName: 'Support Triage', version: 'v3.1.2', env: 'production', status: 'live', deployedAt: '2026-04-11T09:15:00Z', deployedBy: 'Jerry Ting' },
  { id: 'dep-004', agentId: 'employee-onboarding', agentName: 'Employee Onboarding', version: 'v1.2.0', env: 'production', status: 'live', deployedAt: '2026-04-10T16:00:00Z', deployedBy: 'Michael Torres' },
  { id: 'dep-005', agentId: 'claims-processing', agentName: 'Claims Processing', version: 'v2.5.0-rc1', env: 'staging', status: 'deploying', deployedAt: '2026-04-13T09:45:00Z', deployedBy: 'Jerry Ting' },
  { id: 'dep-006', agentId: 'contract-review', agentName: 'Contract Review', version: 'v0.9.3', env: 'staging', status: 'failed', deployedAt: '2026-04-12T11:00:00Z', deployedBy: 'Rachel Kim' },
]

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
  live: { icon: CheckCircle, color: 'text-success', bg: 'bg-success-subtle' },
  deploying: { icon: RotateCcw, color: 'text-warning', bg: 'bg-warning-subtle' },
  'rolled-back': { icon: RotateCcw, color: 'text-text-3', bg: 'bg-background' },
  failed: { icon: AlertTriangle, color: 'text-danger', bg: 'bg-danger-subtle' },
}

const envColors: Record<string, string> = {
  production: 'bg-success-subtle text-success',
  staging: 'bg-warning-subtle text-warning',
  development: 'bg-accent-subtle text-accent',
}

export function Deployments() {
  const liveCount = deployments.filter(d => d.status === 'live').length

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-fade-in">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-text-1 tracking-[-0.03em]">Deployments</h1>
          <p className="text-[15px] text-text-2 mt-2">Track and manage agent deployments across environments.</p>
        </div>
        <button
          onClick={() => alert('Deploy wizard coming soon')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-[13px] font-semibold rounded-full hover:bg-accent-hover transition-colors duration-300"
        >
          <Rocket className="w-4 h-4" />
          New Deployment
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em] mb-2">Live in Production</div>
          <div className="text-[28px] font-bold text-success">{liveCount}</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em] mb-2">In Staging</div>
          <div className="text-[28px] font-bold text-warning">{deployments.filter(d => d.env === 'staging').length}</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em] mb-2">Total Deployments</div>
          <div className="text-[28px] font-bold text-text-1">{deployments.length}</div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
        <div className="grid grid-cols-[1fr_100px_100px_100px_140px_40px] px-6 py-3 border-b border-border bg-background text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">
          <span>Agent</span>
          <span>Version</span>
          <span>Environment</span>
          <span>Status</span>
          <span>Deployed</span>
          <span />
        </div>
        <div className="divide-y divide-border">
          {deployments.map(dep => {
            const sc = statusConfig[dep.status]
            const Icon = sc.icon
            return (
              <div key={dep.id} className="grid grid-cols-[1fr_100px_100px_100px_140px_40px] items-center px-6 py-4 hover:bg-background/60 transition-colors group">
                <div>
                  <div className="text-[14px] font-semibold text-text-1">{dep.agentName}</div>
                  <div className="text-[11px] text-text-3 mt-0.5">by {dep.deployedBy}</div>
                </div>
                <span className="text-[13px] font-mono text-text-2">{dep.version}</span>
                <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize w-fit', envColors[dep.env])}>{dep.env}</span>
                <div className="flex items-center gap-1.5">
                  <Icon className={cn('w-3.5 h-3.5', sc.color)} />
                  <span className={cn('text-[12px] font-semibold capitalize', sc.color)}>{dep.status}</span>
                </div>
                <span className="text-[12px] text-text-3 tabular-nums">{new Date(dep.deployedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                <button
                  onClick={() => alert(`Rollback ${dep.agentName} ${dep.version}`)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-background text-text-3 hover:text-text-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
