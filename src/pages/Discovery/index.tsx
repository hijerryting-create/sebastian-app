import { useNavigate } from 'react-router-dom'
import { opportunities } from '@/mocks/data/discovery'
import { formatCurrency, cn } from '@/lib/utils'
import { Search, ArrowRight, Sparkles, TrendingUp } from 'lucide-react'

const statusColors: Record<string, string> = {
  identified: 'bg-accent-subtle text-accent',
  evaluating: 'bg-warning-subtle text-warning',
  approved: 'bg-success-subtle text-success',
  rejected: 'bg-danger-subtle text-danger',
}

const complexityColors: Record<string, string> = {
  low: 'text-success',
  medium: 'text-warning',
  high: 'text-danger',
}

export function DiscoveryDashboard() {
  const navigate = useNavigate()
  const totalSavings = opportunities.reduce((sum, o) => sum + o.estimatedSavings, 0)

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-fade-in">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-text-1 tracking-[-0.03em]">Discovery</h1>
          <p className="text-[15px] text-text-2 mt-2">AI-identified automation opportunities across your organization.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-[13px] font-semibold rounded-full hover:bg-accent-hover transition-colors duration-300">
          <Sparkles className="w-4 h-4" />
          Run Discovery
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em] mb-2">Total Opportunities</div>
          <div className="text-[28px] font-bold text-text-1">{opportunities.length}</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em] mb-2">Est. Annual Savings</div>
          <div className="text-[28px] font-bold text-accent">{formatCurrency(totalSavings)}</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em] mb-2">Avg ROI Potential</div>
          <div className="flex items-center gap-2">
            <span className="text-[28px] font-bold text-text-1">4.2x</span>
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="text-[15px] font-semibold text-text-1">Opportunities</h2>
          <div className="flex items-center gap-2 bg-background rounded-lg px-3 py-1.5">
            <Search className="w-3.5 h-3.5 text-text-3" />
            <input type="text" placeholder="Filter opportunities..." className="bg-transparent text-[13px] text-text-1 placeholder:text-text-3 outline-none w-48" />
          </div>
        </div>
        <div className="divide-y divide-border">
          {opportunities.map(opp => (
            <button
              key={opp.id}
              onClick={() => navigate(`/discovery/${opp.id}`)}
              className="flex items-center w-full px-6 py-4 hover:bg-background/60 transition-colors text-left group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[14px] font-semibold text-text-1">{opp.title}</span>
                  <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize', statusColors[opp.status])}>
                    {opp.status}
                  </span>
                </div>
                <span className="text-[12px] text-text-3">{opp.department}</span>
              </div>
              <div className="flex items-center gap-8 text-[13px] tabular-nums">
                <span className={cn('font-medium', complexityColors[opp.complexity])}>{opp.complexity}</span>
                <span className="w-20 text-right font-semibold text-text-1">{formatCurrency(opp.estimatedSavings)}</span>
                <ArrowRight className="w-4 h-4 text-text-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function DiscoveryDetail() {
  return (
    <div className="p-8 max-w-[1000px] mx-auto animate-fade-in">
      <h1 className="text-[24px] font-bold text-text-1 tracking-[-0.02em] mb-2">Opportunity Detail</h1>
      <p className="text-[14px] text-text-2">Detailed analysis and recommendations coming soon.</p>
    </div>
  )
}
