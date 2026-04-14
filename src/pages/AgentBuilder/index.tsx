import { useNavigate } from 'react-router-dom'
import { agents } from '@/mocks/data/agents'
import { AgentStatusBadge } from '@/components/shared/StatusBadge'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { Plus, ArrowRight } from 'lucide-react'

export function AgentLibrary() {
  const navigate = useNavigate()

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-fade-in">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-text-1 tracking-[-0.03em]">Agent Builder</h1>
          <p className="text-[15px] text-text-2 mt-2">Design, configure, and deploy AI agents.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-[13px] font-semibold rounded-full hover:bg-accent-hover transition-colors duration-300">
          <Plus className="w-4 h-4" />
          New Agent
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {agents.map(agent => (
          <button
            key={agent.id}
            onClick={() => navigate(`/agents/${agent.id}`)}
            className="bg-surface border border-border rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <h3 className="text-[16px] font-semibold text-text-1">{agent.name}</h3>
                  <AgentStatusBadge status={agent.status} />
                </div>
                <p className="text-[13px] text-text-2 leading-relaxed">{agent.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-text-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
            </div>
            <div className="flex items-center gap-6 pt-4 border-t border-border-subtle">
              <div>
                <div className="text-[11px] text-text-3 font-medium mb-0.5">Runs</div>
                <div className="text-[14px] font-semibold text-text-1 tabular-nums">{agent.metrics.totalRuns.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[11px] text-text-3 font-medium mb-0.5">Success</div>
                <div className="text-[14px] font-semibold text-text-1 tabular-nums">{formatPercent(agent.metrics.successRate)}</div>
              </div>
              <div>
                <div className="text-[11px] text-text-3 font-medium mb-0.5">Labor Saved</div>
                <div className="text-[14px] font-semibold text-accent tabular-nums">{formatCurrency(agent.metrics.laborSavedUsd)}</div>
              </div>
              <div>
                <div className="text-[11px] text-text-3 font-medium mb-0.5">HITL Rate</div>
                <div className="text-[14px] font-semibold text-text-1 tabular-nums">{formatPercent(agent.metrics.hitlRate)}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
