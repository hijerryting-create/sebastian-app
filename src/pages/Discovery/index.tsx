import { useNavigate, useParams } from 'react-router-dom'
import { opportunities } from '@/mocks/data/discovery'
import { formatCurrency, cn } from '@/lib/utils'
import { Search, ArrowRight, Sparkles, TrendingUp, ArrowLeft, CheckCircle, Clock, BarChart3 } from 'lucide-react'

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
        <button
          onClick={() => alert('Discovery scan initiated. Analyzing workflows across 5 departments...')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-[13px] font-semibold rounded-full hover:bg-accent-hover transition-colors duration-300"
        >
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
  const { discoveryId } = useParams()
  const navigate = useNavigate()
  const opp = opportunities.find(o => o.id === discoveryId)

  if (!opp) {
    return (
      <div className="p-8 animate-fade-in">
        <h1 className="text-[24px] font-bold text-text-1">Opportunity not found</h1>
        <button onClick={() => navigate('/discovery')} className="mt-4 text-[13px] text-accent font-semibold hover:text-accent-hover">Back to Discovery</button>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-[1000px] mx-auto animate-fade-in">
      <button onClick={() => navigate('/discovery')} className="flex items-center gap-1.5 text-[13px] text-text-3 hover:text-text-1 font-medium mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Discovery
      </button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-[24px] font-bold text-text-1 tracking-[-0.02em]">{opp.title}</h1>
            <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize', statusColors[opp.status])}>
              {opp.status}
            </span>
          </div>
          <p className="text-[14px] text-text-2">{opp.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-xl p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-text-3" />
            <span className="text-[10px] font-semibold text-text-3 uppercase tracking-[0.06em]">Est. Savings</span>
          </div>
          <div className="text-[22px] font-bold text-accent">{formatCurrency(opp.estimatedSavings)}</div>
          <div className="text-[11px] text-text-3 mt-0.5">per year</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-text-3" />
            <span className="text-[10px] font-semibold text-text-3 uppercase tracking-[0.06em]">Complexity</span>
          </div>
          <div className={cn('text-[22px] font-bold capitalize', complexityColors[opp.complexity])}>{opp.complexity}</div>
          <div className="text-[11px] text-text-3 mt-0.5">implementation effort</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-3.5 h-3.5 text-text-3" />
            <span className="text-[10px] font-semibold text-text-3 uppercase tracking-[0.06em]">Department</span>
          </div>
          <div className="text-[22px] font-bold text-text-1">{opp.department}</div>
          <div className="text-[11px] text-text-3 mt-0.5">business unit</div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-[var(--shadow-card)] p-6 mb-6">
        <h2 className="text-[15px] font-semibold text-text-1 mb-4">Implementation Plan</h2>
        <div className="space-y-3">
          {[
            { phase: 'Discovery & Scoping', weeks: '1-2', status: 'complete' },
            { phase: 'Agent Design & Configuration', weeks: '3-4', status: opp.status === 'approved' ? 'in-progress' : 'pending' },
            { phase: 'Integration & Testing', weeks: '5-6', status: 'pending' },
            { phase: 'Pilot Deployment', weeks: '7-8', status: 'pending' },
            { phase: 'Full Rollout', weeks: '9-10', status: 'pending' },
          ].map((phase, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 bg-background rounded-xl">
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center shrink-0',
                phase.status === 'complete' ? 'bg-success-subtle' : phase.status === 'in-progress' ? 'bg-accent-subtle' : 'bg-border-subtle',
              )}>
                {phase.status === 'complete' ? (
                  <CheckCircle className="w-3.5 h-3.5 text-success" />
                ) : (
                  <span className={cn('text-[10px] font-bold', phase.status === 'in-progress' ? 'text-accent' : 'text-text-3')}>{i + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <span className="text-[13px] font-semibold text-text-1">{phase.phase}</span>
              </div>
              <span className="text-[12px] text-text-3 tabular-nums">Weeks {phase.weeks}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {opp.status === 'identified' || opp.status === 'evaluating' ? (
          <>
            <button onClick={() => alert(`Approved: ${opp.title}`)} className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-white text-[13px] font-semibold rounded-full hover:bg-accent-hover transition-colors">
              <CheckCircle className="w-4 h-4" /> Approve & Begin
            </button>
            <button onClick={() => alert(`Rejected: ${opp.title}`)} className="inline-flex items-center gap-2 px-6 py-2.5 bg-surface border border-border text-text-2 text-[13px] font-semibold rounded-full hover:bg-background transition-colors">
              Dismiss
            </button>
          </>
        ) : (
          <button onClick={() => navigate('/agents')} className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-white text-[13px] font-semibold rounded-full hover:bg-accent-hover transition-colors">
            <Sparkles className="w-4 h-4" /> View Agent
          </button>
        )}
      </div>
    </div>
  )
}
