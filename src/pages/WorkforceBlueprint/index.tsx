import { agents } from '@/mocks/data/agents'
import { AgentStatusBadge } from '@/components/shared/StatusBadge'
import { Users, Bot, ArrowRight } from 'lucide-react'
import { LegalBlueprint } from './LegalBlueprint'

const departments = ['Insurance Ops', 'Finance', 'HR', 'Legal', 'Customer Success']

export function WorkforceBlueprintPage() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-text-1 tracking-[-0.03em]">Workforce Blueprint</h1>
        <p className="text-[15px] text-text-2 mt-2">Map AI agents to your organizational structure.</p>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-text-3" />
            <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">Departments</span>
          </div>
          <div className="text-[28px] font-bold text-text-1">{departments.length}</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-4 h-4 text-text-3" />
            <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">Agents Deployed</span>
          </div>
          <div className="text-[28px] font-bold text-accent">{agents.filter(a => a.status === 'deployed').length}</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">Coverage</span>
          </div>
          <div className="text-[28px] font-bold text-text-1">
            {Math.round((new Set(agents.filter(a => a.status === 'deployed').map(a => a.department)).size / departments.length) * 100)}%
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {departments.map(dept => {
          const deptAgents = agents.filter(a => a.department === dept)
          if (dept === 'Legal') {
            return <LegalBlueprint key={dept} agents={deptAgents} />
          }
          return (
            <div key={dept} className="bg-surface border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-subtle flex items-center justify-center">
                    <Users className="w-4 h-4 text-accent" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-text-1">{dept}</h3>
                </div>
                <span className="text-[12px] text-text-3 font-medium">{deptAgents.length} agent{deptAgents.length !== 1 ? 's' : ''}</span>
              </div>
              {deptAgents.length > 0 ? (
                <div className="divide-y divide-border">
                  {deptAgents.map(agent => (
                    <div key={agent.id} className="flex items-center px-6 py-3 group">
                      <div className="flex items-center gap-3 flex-1">
                        <Bot className="w-4 h-4 text-text-3" />
                        <span className="text-[13px] font-medium text-text-1">{agent.name}</span>
                        <AgentStatusBadge status={agent.status} />
                      </div>
                      <ArrowRight className="w-4 h-4 text-text-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-4 text-[13px] text-text-3">No agents assigned yet</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
