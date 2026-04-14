import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  label: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon?: ReactNode
}

export function MetricCard({ label, value, change, changeType = 'neutral', icon }: MetricCardProps) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">{label}</span>
        {icon && <span className="text-text-3">{icon}</span>}
      </div>
      <div className="text-[28px] font-bold text-text-1 tracking-[-0.03em] leading-none mb-1">{value}</div>
      {change && (
        <span className={cn(
          'text-[12px] font-medium',
          changeType === 'positive' && 'text-success',
          changeType === 'negative' && 'text-danger',
          changeType === 'neutral' && 'text-text-3',
        )}>
          {change}
        </span>
      )}
    </div>
  )
}
