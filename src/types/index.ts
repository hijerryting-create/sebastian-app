export type AgentStatus = 'deployed' | 'draft' | 'paused' | 'error'
export type HITLPriority = 'critical' | 'high' | 'medium' | 'low'

export interface Agent {
  id: string
  name: string
  description: string
  status: AgentStatus
  department: string
  metrics: {
    totalRuns: number
    successRate: number
    avgLatencyMs: number
    laborSavedUsd: number
    hitlRate: number
  }
  lastRun: string
}

export interface HITLItem {
  id: string
  agentId: string
  agentName: string
  reason: string
  priority: HITLPriority
  slaDeadline: string
  createdAt: string
  agentContext: Record<string, unknown>
}

export interface DiscoveryOpportunity {
  id: string
  title: string
  department: string
  estimatedSavings: number
  complexity: 'low' | 'medium' | 'high'
  status: 'identified' | 'evaluating' | 'approved' | 'rejected'
  description: string
}
