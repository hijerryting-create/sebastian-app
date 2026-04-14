import { useNavigate } from 'react-router-dom'
import { MetricCard } from '@/components/shared/MetricCard'
import { AgentStatusBadge } from '@/components/shared/StatusBadge'
import { agents } from '@/mocks/data/agents'
import { hitlItems } from '@/mocks/data/hitlItems'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { Cpu, CheckSquare, DollarSign, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react'

export function Dashboard() {
  const navigate = useNavigate()
  const pastSla = hitlItems.filter(h => new Date(h.slaDeadline) < new Date()).length
  const totalLabor = agents.reduce((sum, a) => sum + a.metrics.laborSavedUsd, 0)

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-fade-in">
      <div className="mb-10">
        <h1 className="text-[28px] font-bold text-text-1 tracking-[-0.03em]">Good morning, Jerry</h1>
        <p className="text-[15px] text-text-2 mt-2">Here's what's happening at Acme Corp today.</p>
      </div>

      <div className="grid grid-cols-5 gap-5 mb-10">
        <MetricCard label="Agents Running" value={agents.filter(a => a.status === 'deployed').length} change="+2 this month" changeType="positive" icon={<Cpu className="w-4 h-4" />} />
        <MetricCard label="Tasks Automated" value="2,847" change="+23% MoM" changeType="positive" icon={<CheckSquare className="w-4 h-4" />} />
        <MetricCard label="Labor Saved" value={formatCurrency(totalLabor)} change="+$28K this month" changeType="positive" icon={<DollarSign className="w-4 h-4" />} />
        <MetricCard label="ROI to Date" value="3.4x" change="+0.4x MoM" changeType="positive" icon={<TrendingUp className="w-4 h-4" />} />
        <MetricCard label="HITL Rate" value="8.2%" change="-1.1% MoM" changeType="positive" icon={<AlertTriangle className="w-4 h-4" />} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Agent Performance */}
        <div className="col-span-2 bg-surface border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <h2 className="text-[15px] font-semibold text-text-1">Agent Performance</h2>
            <span className="text-[12px] text-text-3 font-medium">Last 30 days</span>
          </div>
          <div className="divide-y divide-border">
            {agents.map(agent => (
              <button
                key={agent.id}
                onClick={() => navigate(`/agents/${agent.id}`)}
                className="flex items-center w-full px-6 py-4 hover:bg-background/60 transition-colors text-left group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-semibold text-text-1">{agent.name}</span>
                    <AgentStatusBadge status={agent.status} />
                  </div>
                </div>
                <div className="flex items-center gap-10 text-[13px] text-text-2 tabular-nums">
                  <span className="w-24 text-right">{agent.metrics.totalRuns.toLocaleString()} runs</span>
                  <span className="w-16 text-right font-medium">{formatPercent(agent.metrics.successRate)}</span>
                  <span className="w-20 text-right font-semibold text-text-1">{formatCurrency(agent.metrics.laborSavedUsd)}</span>
                  <ArrowRight className="w-4 h-4 text-text-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* HITL Queue */}
        <div className="bg-surface border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <h2 className="text-[15px] font-semibold text-text-1">Pending Reviews</h2>
            <button onClick={() => navigate('/hitl')} className="text-[12px] text-accent font-semibold hover:text-accent-light transition-colors">
              View all
            </button>
          </div>
          <div>
            {pastSla > 0 && (
              <div className="px-6 py-3 bg-danger-subtle border-b border-danger/10 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-danger" />
                <span className="text-[12px] font-semibold text-danger">{pastSla} items past SLA</span>
              </div>
            )}
            <div className="divide-y divide-border">
              {hitlItems.slice(0, 5).map(item => {
                const ctx = item.agentContext as Record<string, unknown>
                const itemId = (ctx.claim_id ?? ctx.invoice_id ?? ctx.ticket_id ?? item.id) as string
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(`/hitl/${item.id}`)}
                    className="flex items-center w-full px-6 py-3.5 hover:bg-background/60 transition-colors text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold text-text-1 truncate">{itemId}</div>
                      <div className="text-[11px] text-text-3 truncate mt-0.5">{item.agentName}</div>
                    </div>
                    {new Date(item.slaDeadline) < new Date() ? (
                      <span className="text-[11px] font-bold text-danger bg-danger-subtle px-2 py-1 rounded-lg">Past SLA</span>
                    ) : (
                      <span className="text-[11px] text-text-3 font-medium tabular-nums">
                        {Math.max(0, Math.ceil((new Date(item.slaDeadline).getTime() - Date.now()) / 3600000))}h left
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
