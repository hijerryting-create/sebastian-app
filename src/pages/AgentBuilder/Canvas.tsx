import { useParams, useNavigate } from 'react-router-dom'
import { agents } from '@/mocks/data/agents'
import { AgentStatusBadge } from '@/components/shared/StatusBadge'
import { formatPercent } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Activity, Clock, Zap, AlertTriangle, ArrowLeft, Play, Pause, Settings, ArrowRight } from 'lucide-react'

interface WorkflowNode {
  id: string
  label: string
  type: 'trigger' | 'ai' | 'human' | 'integration' | 'logic' | 'output'
}

const WORKFLOW_NODES: Record<string, WorkflowNode[]> = {
  'claims-processing': [
    { id: 'n1', label: 'New Claim Filed', type: 'trigger' },
    { id: 'n2', label: 'Extract Claim Data', type: 'ai' },
    { id: 'n3', label: 'Validate Policy', type: 'logic' },
    { id: 'n4', label: 'Check Fraud Score', type: 'ai' },
    { id: 'n5', label: 'Amount > $50K?', type: 'logic' },
    { id: 'n6', label: 'Human Review', type: 'human' },
    { id: 'n7', label: 'Update Salesforce', type: 'integration' },
    { id: 'n8', label: 'Send Notification', type: 'output' },
  ],
  'invoice-reconciliation': [
    { id: 'n1', label: 'Invoice Received', type: 'trigger' },
    { id: 'n2', label: 'Extract Line Items', type: 'ai' },
    { id: 'n3', label: 'Match to PO', type: 'logic' },
    { id: 'n4', label: 'Check Variance', type: 'logic' },
    { id: 'n5', label: 'Variance > 5%?', type: 'logic' },
    { id: 'n6', label: 'Flag for Review', type: 'human' },
    { id: 'n7', label: 'Update SAP', type: 'integration' },
    { id: 'n8', label: 'Approve Payment', type: 'output' },
  ],
  'employee-onboarding': [
    { id: 'n1', label: 'New Hire Created', type: 'trigger' },
    { id: 'n2', label: 'Generate Checklist', type: 'ai' },
    { id: 'n3', label: 'Provision IT Access', type: 'integration' },
    { id: 'n4', label: 'Background Check', type: 'integration' },
    { id: 'n5', label: 'BG Check OK?', type: 'logic' },
    { id: 'n6', label: 'HR Review', type: 'human' },
    { id: 'n7', label: 'Create Badge', type: 'integration' },
    { id: 'n8', label: 'Welcome Email', type: 'output' },
  ],
  'contract-review': [
    { id: 'n1', label: 'Contract Uploaded', type: 'trigger' },
    { id: 'n2', label: 'Extract Clauses', type: 'ai' },
    { id: 'n3', label: 'Risk Assessment', type: 'ai' },
    { id: 'n4', label: 'Check Compliance', type: 'logic' },
    { id: 'n5', label: 'High Risk?', type: 'logic' },
    { id: 'n6', label: 'Legal Review', type: 'human' },
    { id: 'n7', label: 'Generate Summary', type: 'ai' },
    { id: 'n8', label: 'Send Report', type: 'output' },
  ],
  'customer-support-triage': [
    { id: 'n1', label: 'Ticket Created', type: 'trigger' },
    { id: 'n2', label: 'Classify Intent', type: 'ai' },
    { id: 'n3', label: 'Sentiment Analysis', type: 'ai' },
    { id: 'n4', label: 'Priority Score', type: 'logic' },
    { id: 'n5', label: 'Negative Sentiment?', type: 'logic' },
    { id: 'n6', label: 'Escalate to Manager', type: 'human' },
    { id: 'n7', label: 'Route to Team', type: 'integration' },
    { id: 'n8', label: 'Auto-Response', type: 'output' },
  ],
}

const NODE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  trigger: { bg: 'bg-node-trigger/10', border: 'border-node-trigger/30', text: 'text-node-trigger' },
  ai: { bg: 'bg-node-ai/10', border: 'border-node-ai/30', text: 'text-node-ai' },
  human: { bg: 'bg-node-human/10', border: 'border-node-human/30', text: 'text-node-human' },
  integration: { bg: 'bg-node-integration/10', border: 'border-node-integration/30', text: 'text-node-integration' },
  logic: { bg: 'bg-node-logic/10', border: 'border-node-logic/30', text: 'text-node-logic' },
  output: { bg: 'bg-node-output/10', border: 'border-node-output/30', text: 'text-node-output' },
}

const NODE_LABELS: Record<string, string> = {
  trigger: 'Trigger', ai: 'AI', human: 'Human', integration: 'Integration', logic: 'Logic', output: 'Output',
}

export function AgentCanvas() {
  const { agentId } = useParams()
  const navigate = useNavigate()
  const agent = agents.find(a => a.id === agentId)

  if (!agent) {
    return (
      <div className="p-8 animate-fade-in">
        <h1 className="text-[24px] font-bold text-text-1">Agent not found</h1>
        <button onClick={() => navigate('/agents')} className="mt-4 text-[13px] text-accent font-semibold hover:text-accent-hover">Back to Agents</button>
      </div>
    )
  }

  const nodes = WORKFLOW_NODES[agent.id] ?? WORKFLOW_NODES['claims-processing']

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-fade-in">
      <button onClick={() => navigate('/agents')} className="flex items-center gap-1.5 text-[13px] text-text-3 hover:text-text-1 font-medium mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Agents
      </button>

      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-[28px] font-bold text-text-1 tracking-[-0.03em]">{agent.name}</h1>
            <AgentStatusBadge status={agent.status} />
          </div>
          <p className="text-[15px] text-text-2">{agent.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {agent.status === 'deployed' ? (
            <button onClick={() => alert(`Pausing ${agent.name}`)} className="inline-flex items-center gap-2 px-4 py-2 bg-warning-subtle text-warning text-[13px] font-semibold rounded-full hover:opacity-90 transition-opacity border border-warning/15">
              <Pause className="w-3.5 h-3.5" /> Pause
            </button>
          ) : (
            <button onClick={() => alert(`Deploying ${agent.name}`)} className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white text-[13px] font-semibold rounded-full hover:bg-accent-hover transition-colors">
              <Play className="w-3.5 h-3.5" /> Deploy
            </button>
          )}
          <button onClick={() => alert(`Agent settings for ${agent.name}`)} className="p-2 rounded-lg border border-border hover:bg-background transition-colors text-text-3 hover:text-text-1">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5 mb-8">
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-text-3" />
            <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">Total Runs</span>
          </div>
          <div className="text-[24px] font-bold text-text-1 tabular-nums">{agent.metrics.totalRuns.toLocaleString()}</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-text-3" />
            <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">Success Rate</span>
          </div>
          <div className="text-[24px] font-bold text-success tabular-nums">{formatPercent(agent.metrics.successRate)}</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-text-3" />
            <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">Avg Latency</span>
          </div>
          <div className="text-[24px] font-bold text-text-1 tabular-nums">{(agent.metrics.avgLatencyMs / 1000).toFixed(1)}s</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-text-3" />
            <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">HITL Rate</span>
          </div>
          <div className="text-[24px] font-bold text-text-1 tabular-nums">{formatPercent(agent.metrics.hitlRate)}</div>
        </div>
      </div>

      {/* Workflow visualization */}
      <div className="bg-surface border border-border rounded-2xl shadow-[var(--shadow-card)] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[15px] font-semibold text-text-1">Workflow</h2>
          <div className="flex items-center gap-3">
            {Object.entries(NODE_LABELS).map(([type, label]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className={cn('w-2.5 h-2.5 rounded-sm', `bg-node-${type}`)} />
                <span className="text-[10px] text-text-3 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {nodes.map((node, i) => {
            const colors = NODE_COLORS[node.type]
            return (
              <div key={node.id} className="flex items-center gap-2 shrink-0">
                <div className={cn(
                  'rounded-xl border px-4 py-3 min-w-[140px] text-center transition-shadow hover:shadow-[var(--shadow-card-hover)]',
                  colors.bg, colors.border,
                )}>
                  <div className={cn('text-[10px] font-semibold uppercase tracking-[0.06em] mb-1', colors.text)}>
                    {NODE_LABELS[node.type]}
                  </div>
                  <div className="text-[12px] font-semibold text-text-1">{node.label}</div>
                </div>
                {i < nodes.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-text-3 shrink-0" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
