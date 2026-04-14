import { agents } from '@/mocks/data/agents'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { MetricCard } from '@/components/shared/MetricCard'
import { BarChart3, TrendingUp, Clock, Zap } from 'lucide-react'

export function Analytics() {
  const totalRuns = agents.reduce((s, a) => s + a.metrics.totalRuns, 0)
  const totalLabor = agents.reduce((s, a) => s + a.metrics.laborSavedUsd, 0)
  const avgSuccess = agents.reduce((s, a) => s + a.metrics.successRate, 0) / agents.length
  const avgLatency = agents.reduce((s, a) => s + a.metrics.avgLatencyMs, 0) / agents.length

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-text-1 tracking-[-0.03em]">Analytics</h1>
        <p className="text-[15px] text-text-2 mt-2">Platform performance overview.</p>
      </div>

      <div className="grid grid-cols-4 gap-5 mb-8">
        <MetricCard label="Total Runs" value={totalRuns.toLocaleString()} change="+18% MoM" changeType="positive" icon={<BarChart3 className="w-4 h-4" />} />
        <MetricCard label="Labor Saved" value={formatCurrency(totalLabor)} change="+$28K this month" changeType="positive" icon={<TrendingUp className="w-4 h-4" />} />
        <MetricCard label="Avg Success Rate" value={formatPercent(avgSuccess)} changeType="positive" icon={<Zap className="w-4 h-4" />} />
        <MetricCard label="Avg Latency" value={`${(avgLatency / 1000).toFixed(1)}s`} change="-12% MoM" changeType="positive" icon={<Clock className="w-4 h-4" />} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
          <div className="px-6 py-5 border-b border-border">
            <h2 className="text-[15px] font-semibold text-text-1">Runs by Agent</h2>
          </div>
          <div className="p-6 space-y-4">
            {agents.map(agent => {
              const pct = (agent.metrics.totalRuns / totalRuns) * 100
              return (
                <div key={agent.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-text-1">{agent.name}</span>
                    <span className="text-[12px] text-text-3 tabular-nums">{agent.metrics.totalRuns.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-background overflow-hidden">
                    <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
          <div className="px-6 py-5 border-b border-border">
            <h2 className="text-[15px] font-semibold text-text-1">Labor Savings by Agent</h2>
          </div>
          <div className="p-6 space-y-4">
            {agents.map(agent => {
              const pct = (agent.metrics.laborSavedUsd / totalLabor) * 100
              return (
                <div key={agent.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-text-1">{agent.name}</span>
                    <span className="text-[12px] font-semibold text-accent tabular-nums">{formatCurrency(agent.metrics.laborSavedUsd)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-background overflow-hidden">
                    <div className="h-full rounded-full bg-accent-light transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
