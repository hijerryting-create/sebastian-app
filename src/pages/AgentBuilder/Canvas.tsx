import { useParams } from 'react-router-dom'
import { agents } from '@/mocks/data/agents'
import { AgentStatusBadge } from '@/components/shared/StatusBadge'
import { formatPercent } from '@/lib/utils'
import { Activity, Clock, Zap, AlertTriangle } from 'lucide-react'

export function AgentCanvas() {
  const { agentId } = useParams()
  const agent = agents.find(a => a.id === agentId)

  if (!agent) {
    return (
      <div className="p-8 animate-fade-in">
        <h1 className="text-[24px] font-bold text-text-1">Agent not found</h1>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-[28px] font-bold text-text-1 tracking-[-0.03em]">{agent.name}</h1>
          <AgentStatusBadge status={agent.status} />
        </div>
        <p className="text-[15px] text-text-2">{agent.description}</p>
      </div>

      <div className="grid grid-cols-4 gap-5 mb-8">
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-text-3" />
            <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">Total Runs</span>
          </div>
          <div className="text-[24px] font-bold text-text-1 tabular-nums">{agent.metrics.totalRuns.toLocaleString()}</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-text-3" />
            <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">Success Rate</span>
          </div>
          <div className="text-[24px] font-bold text-success tabular-nums">{formatPercent(agent.metrics.successRate)}</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-text-3" />
            <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">Avg Latency</span>
          </div>
          <div className="text-[24px] font-bold text-text-1 tabular-nums">{(agent.metrics.avgLatencyMs / 1000).toFixed(1)}s</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-text-3" />
            <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">HITL Rate</span>
          </div>
          <div className="text-[24px] font-bold text-text-1 tabular-nums">{formatPercent(agent.metrics.hitlRate)}</div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-[var(--shadow-card)] p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[15px] font-semibold text-text-1">Workflow Canvas</h2>
          <span className="text-[12px] text-text-3 font-medium">Visual editor coming soon</span>
        </div>
        <div className="h-[400px] rounded-xl border border-dashed border-border flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-accent-subtle flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <p className="text-[14px] font-semibold text-text-1 mb-1">Agent workflow canvas</p>
            <p className="text-[13px] text-text-3">Drag and drop nodes to build agent logic</p>
          </div>
        </div>
      </div>
    </div>
  )
}
