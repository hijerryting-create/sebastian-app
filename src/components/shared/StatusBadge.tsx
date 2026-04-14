import { cn } from '@/lib/utils'
import type { AgentStatus, HITLPriority } from '@/types'

const statusStyles: Record<AgentStatus, string> = {
  deployed: 'bg-success-subtle text-success',
  draft: 'bg-accent-subtle text-accent',
  paused: 'bg-warning-subtle text-warning',
  error: 'bg-danger-subtle text-danger',
}

export function AgentStatusBadge({ status }: { status: AgentStatus }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize',
      statusStyles[status]
    )}>
      <span className={cn(
        'w-1.5 h-1.5 rounded-full',
        status === 'deployed' && 'bg-success',
        status === 'draft' && 'bg-accent',
        status === 'paused' && 'bg-warning',
        status === 'error' && 'bg-danger',
      )} />
      {status}
    </span>
  )
}

const priorityStyles: Record<HITLPriority, string> = {
  critical: 'bg-danger-subtle text-danger',
  high: 'bg-warning-subtle text-warning',
  medium: 'bg-accent-subtle text-accent',
  low: 'bg-border-subtle text-text-3',
}

export function PriorityBadge({ priority }: { priority: HITLPriority }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize',
      priorityStyles[priority]
    )}>
      {priority}
    </span>
  )
}
