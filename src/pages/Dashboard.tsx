import { useNavigate } from 'react-router-dom'
import { Heartbeat } from '@/components/dashboard/Heartbeat'
import { SwarmCanvas } from '@/components/dashboard/SwarmCanvas'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { HiveStats } from '@/components/dashboard/HiveStats'
import { agents } from '@/mocks/data/agents'
import { hitlItems } from '@/mocks/data/hitlItems'
import { AlertTriangle } from 'lucide-react'

export function Dashboard() {
  const navigate = useNavigate()
  const pastSla = hitlItems.filter(h => new Date(h.slaDeadline) < new Date()).length
  const deployedAgents = agents.filter(a => a.status === 'deployed')

  return (
    <div className="h-full flex flex-col overflow-hidden animate-fade-in">
      {/* Hero: Heartbeat + Swarm */}
      <div className="relative flex-1 min-h-0">
        {/* Background swarm canvas */}
        <SwarmCanvas agents={deployedAgents} />

        {/* Center heartbeat overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Heartbeat agents={agents} />
        </div>

        {/* Floating stats */}
        <HiveStats agents={agents} />

        {/* HITL alert banner */}
        {pastSla > 0 && (
          <button
            onClick={() => navigate('/hitl')}
            className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2.5 bg-danger-subtle border border-danger/15 rounded-xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-danger" />
            </span>
            <AlertTriangle className="w-3.5 h-3.5 text-danger" />
            <span className="text-[12px] font-semibold text-danger">{pastSla} items past SLA</span>
          </button>
        )}
      </div>

      {/* Bottom: Activity Feed */}
      <ActivityFeed />
    </div>
  )
}
