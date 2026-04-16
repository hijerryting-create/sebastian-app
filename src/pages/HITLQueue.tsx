import { useNavigate, useParams } from 'react-router-dom'
import { hitlItems } from '@/mocks/data/hitlItems'
import { PriorityBadge } from '@/components/shared/StatusBadge'
import { AlertTriangle, ArrowRight, CheckCircle, XCircle } from 'lucide-react'

export function HITLQueue() {
  const navigate = useNavigate()
  const pastSla = hitlItems.filter(h => new Date(h.slaDeadline) < new Date()).length

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-text-1 tracking-[-0.03em]">HITL Queue</h1>
        <p className="text-[15px] text-text-2 mt-2">{hitlItems.length} items requiring human review.</p>
      </div>

      {pastSla > 0 && (
        <div className="flex items-center gap-2 px-5 py-3 bg-danger-subtle border border-danger/10 rounded-xl mb-6">
          <AlertTriangle className="w-4 h-4 text-danger" />
          <span className="text-[13px] font-semibold text-danger">{pastSla} items are past their SLA deadline</span>
        </div>
      )}

      <div className="bg-surface border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
        <div className="grid grid-cols-[1fr_140px_120px_100px_80px] px-6 py-3 border-b border-border bg-background text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">
          <span>Item</span>
          <span>Agent</span>
          <span>Priority</span>
          <span>SLA</span>
          <span />
        </div>
        <div className="divide-y divide-border">
          {hitlItems.map(item => {
            const ctx = item.agentContext as Record<string, unknown>
            const itemId = (ctx.claim_id ?? ctx.invoice_id ?? ctx.ticket_id ?? ctx.contract_id ?? ctx.employee_id ?? item.id) as string
            const isPastSla = new Date(item.slaDeadline) < new Date()
            return (
              <button
                key={item.id}
                onClick={() => navigate(`/hitl/${item.id}`)}
                className="grid grid-cols-[1fr_140px_120px_100px_80px] items-center w-full px-6 py-4 hover:bg-background/60 transition-colors text-left group"
              >
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-text-1 truncate">{itemId}</div>
                  <div className="text-[12px] text-text-3 truncate mt-0.5">{item.reason}</div>
                </div>
                <span className="text-[13px] text-text-2 truncate">{item.agentName}</span>
                <PriorityBadge priority={item.priority} />
                {isPastSla ? (
                  <span className="text-[11px] font-bold text-danger bg-danger-subtle px-2 py-1 rounded-lg w-fit">Past SLA</span>
                ) : (
                  <span className="text-[12px] text-text-3 font-medium tabular-nums">
                    {Math.max(0, Math.ceil((new Date(item.slaDeadline).getTime() - Date.now()) / 3600000))}h left
                  </span>
                )}
                <ArrowRight className="w-4 h-4 text-text-3 opacity-0 group-hover:opacity-100 transition-opacity justify-self-end" />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function HITLReview() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const item = hitlItems.find(h => h.id === itemId)

  if (!item) {
    return (
      <div className="p-8 animate-fade-in">
        <h1 className="text-[24px] font-bold text-text-1">Item not found</h1>
      </div>
    )
  }

  const ctx = item.agentContext as Record<string, unknown>

  return (
    <div className="p-8 max-w-[1000px] mx-auto animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-[24px] font-bold text-text-1 tracking-[-0.02em]">Review: {item.id}</h1>
          <PriorityBadge priority={item.priority} />
        </div>
        <p className="text-[14px] text-text-2">{item.reason}</p>
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-[var(--shadow-card)] p-6 mb-6">
        <h2 className="text-[15px] font-semibold text-text-1 mb-4">Agent Context</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(ctx).map(([k, v]) => (
            <div key={k} className="bg-background rounded-xl p-4">
              <div className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em] mb-1">{k.replace(/_/g, ' ')}</div>
              <div className="text-[14px] font-semibold text-text-1">{String(v)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => { alert(`Approved: ${item.id}`); navigate('/hitl') }}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-success text-white text-[13px] font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          <CheckCircle className="w-4 h-4" />
          Approve
        </button>
        <button
          onClick={() => { alert(`Rejected: ${item.id}`); navigate('/hitl') }}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-danger text-white text-[13px] font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          <XCircle className="w-4 h-4" />
          Reject
        </button>
        <button
          onClick={() => navigate('/hitl')}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-surface border border-border text-text-2 text-[13px] font-semibold rounded-full hover:bg-background transition-colors"
        >
          Back to Queue
        </button>
      </div>
    </div>
  )
}
