import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { CheckCircle, AlertTriangle, Zap, FileText, Users } from 'lucide-react'

interface FeedItem {
  id: string
  agent: string
  action: string
  detail: string
  icon: 'success' | 'warning' | 'process' | 'document' | 'human'
  timestamp: number
}

const FEED_TEMPLATES: Omit<FeedItem, 'id' | 'timestamp'>[] = [
  { agent: 'Claims Processing', action: 'Approved', detail: 'Claim CLM-8447 — $12,400 auto liability', icon: 'success' },
  { agent: 'Invoice Reconciliation', action: 'Matched', detail: 'INV-20489 to PO-9934 — $8,200', icon: 'success' },
  { agent: 'Support Triage', action: 'Routed', detail: 'TKT-34298 to Tier 2 — billing dispute', icon: 'process' },
  { agent: 'Claims Processing', action: 'Flagged', detail: 'CLM-8451 exceeds threshold — sent to HITL', icon: 'warning' },
  { agent: 'Employee Onboarding', action: 'Completed', detail: 'IT provisioning for Sarah Kim — Engineering', icon: 'human' },
  { agent: 'Support Triage', action: 'Classified', detail: 'TKT-34301 as P2 — product defect', icon: 'process' },
  { agent: 'Invoice Reconciliation', action: 'Flagged', detail: 'INV-20492 — 7.2% variance above tolerance', icon: 'warning' },
  { agent: 'Claims Processing', action: 'Processed', detail: 'Claim CLM-8453 — $3,100 medical', icon: 'success' },
  { agent: 'Contract Review', action: 'Extracted', detail: 'Key clauses from Apex Solutions MSA', icon: 'document' },
  { agent: 'Employee Onboarding', action: 'Initiated', detail: 'Background check for Marcus Rivera — Sales', icon: 'human' },
  { agent: 'Support Triage', action: 'Escalated', detail: 'TKT-34305 — enterprise customer, negative sentiment', icon: 'warning' },
  { agent: 'Invoice Reconciliation', action: 'Auto-approved', detail: 'INV-20495 — $2,340 within tolerance', icon: 'success' },
]

const iconMap = {
  success: { icon: CheckCircle, color: 'text-success' },
  warning: { icon: AlertTriangle, color: 'text-warning' },
  process: { icon: Zap, color: 'text-accent' },
  document: { icon: FileText, color: 'text-accent-light' },
  human: { icon: Users, color: 'text-node-human' },
}

export function ActivityFeed() {
  const [items, setItems] = useState<FeedItem[]>(() => {
    return FEED_TEMPLATES.slice(0, 4).map((tpl, i) => ({
      ...tpl,
      id: `feed-init-${i}`,
      timestamp: Date.now() - (3 - i) * 4000,
    }))
  })

  useEffect(() => {
    let idx = 4
    const interval = setInterval(() => {
      const tpl = FEED_TEMPLATES[idx % FEED_TEMPLATES.length]
      const newItem: FeedItem = {
        ...tpl,
        id: `feed-${Date.now()}`,
        timestamp: Date.now(),
      }
      setItems(prev => [newItem, ...prev].slice(0, 8))
      idx++
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="border-t border-border bg-surface/80 backdrop-blur-sm">
      <div className="px-6 py-3 flex items-center gap-2 border-b border-border-subtle">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
        </span>
        <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">Live Activity</span>
        <span className="text-[11px] text-text-3 ml-auto tabular-nums">{items.length} events</span>
      </div>
      <div className="flex gap-3 px-6 py-3 overflow-x-auto">
        {items.map((item, i) => {
          const { icon: Icon, color } = iconMap[item.icon]
          return (
            <div
              key={item.id}
              className={cn(
                'flex items-start gap-2.5 px-3.5 py-2.5 bg-background border border-border-subtle rounded-xl min-w-[260px] max-w-[300px] shrink-0 transition-all duration-500',
                i === 0 && 'animate-scale-in'
              )}
            >
              <div className={cn('mt-0.5 shrink-0', color)}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-semibold text-text-1">{item.agent}</span>
                  <span className="text-[11px] text-text-3">{item.action}</span>
                </div>
                <div className="text-[11px] text-text-3 truncate mt-0.5">{item.detail}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
