import type { Agent } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { Zap, Activity, DollarSign, CheckCircle } from 'lucide-react'

interface HiveStatsProps {
  agents: Agent[]
}

export function HiveStats({ agents }: HiveStatsProps) {
  const deployed = agents.filter(a => a.status === 'deployed').length
  const totalRuns = agents.reduce((s, a) => s + a.metrics.totalRuns, 0)
  const totalLabor = agents.reduce((s, a) => s + a.metrics.laborSavedUsd, 0)
  const avgSuccess = agents.reduce((s, a) => s + a.metrics.successRate, 0) / agents.length

  const stats = [
    { icon: Zap, label: 'Agents Live', value: String(deployed), color: 'text-accent' },
    { icon: Activity, label: 'Total Runs', value: totalRuns.toLocaleString(), color: 'text-text-1' },
    { icon: DollarSign, label: 'Labor Saved', value: formatCurrency(totalLabor), color: 'text-accent' },
    { icon: CheckCircle, label: 'Avg Success', value: `${(avgSuccess * 100).toFixed(1)}%`, color: 'text-success' },
  ]

  return (
    <div className="absolute top-4 left-4 right-4 z-10 flex items-center gap-3">
      {stats.map(s => (
        <div
          key={s.label}
          className="flex items-center gap-2.5 bg-surface/90 backdrop-blur-sm border border-border-subtle rounded-xl px-4 py-2.5 shadow-[var(--shadow-card)]"
        >
          <s.icon className="w-3.5 h-3.5 text-text-3 shrink-0" />
          <div>
            <div className="text-[10px] font-semibold text-text-3 uppercase tracking-[0.06em]">{s.label}</div>
            <div className={`text-[18px] font-bold tracking-[-0.02em] leading-none mt-0.5 tabular-nums ${s.color}`}>{s.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
