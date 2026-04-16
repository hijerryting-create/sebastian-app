import { cn } from '@/lib/utils'
import { Plug, CheckCircle, Circle, ExternalLink, Settings } from 'lucide-react'

interface Integration {
  id: string
  name: string
  category: string
  description: string
  status: 'connected' | 'available' | 'coming-soon'
  icon: string
}

const integrations: Integration[] = [
  { id: 'int-001', name: 'Salesforce', category: 'CRM', description: 'Sync contracts, accounts, and opportunities.', status: 'connected', icon: 'SF' },
  { id: 'int-002', name: 'SAP', category: 'ERP', description: 'Invoice and purchase order data exchange.', status: 'connected', icon: 'SAP' },
  { id: 'int-003', name: 'Workday', category: 'HCM', description: 'Employee data, onboarding workflows, and compliance.', status: 'connected', icon: 'WD' },
  { id: 'int-004', name: 'Slack', category: 'Communication', description: 'Notifications, approvals, and HITL alerts.', status: 'connected', icon: 'SL' },
  { id: 'int-005', name: 'Jira', category: 'Project Mgmt', description: 'Ticket sync and automated issue creation.', status: 'available', icon: 'JI' },
  { id: 'int-006', name: 'Zendesk', category: 'Support', description: 'Customer ticket ingestion and routing.', status: 'available', icon: 'ZD' },
  { id: 'int-007', name: 'DocuSign', category: 'E-Signature', description: 'Automated contract signing workflows.', status: 'available', icon: 'DS' },
  { id: 'int-008', name: 'Snowflake', category: 'Data', description: 'Analytics data warehouse integration.', status: 'coming-soon', icon: 'SN' },
]

const statusConfig = {
  connected: { label: 'Connected', color: 'text-success', bg: 'bg-success-subtle', icon: CheckCircle },
  available: { label: 'Available', color: 'text-accent', bg: 'bg-accent-subtle', icon: Circle },
  'coming-soon': { label: 'Coming Soon', color: 'text-text-3', bg: 'bg-background', icon: Circle },
}

export function Integrations() {
  const connected = integrations.filter(i => i.status === 'connected')
  const available = integrations.filter(i => i.status !== 'connected')

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-text-1 tracking-[-0.03em]">Integrations</h1>
        <p className="text-[15px] text-text-2 mt-2">Connect Sebastian to your enterprise tools.</p>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-2">
            <Plug className="w-4 h-4 text-text-3" />
            <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">Connected</span>
          </div>
          <div className="text-[28px] font-bold text-success">{connected.length}</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em] mb-2">Available</div>
          <div className="text-[28px] font-bold text-accent">{available.filter(i => i.status === 'available').length}</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em] mb-2">Total Catalog</div>
          <div className="text-[28px] font-bold text-text-1">{integrations.length}</div>
        </div>
      </div>

      {[{ label: 'Connected', items: connected }, { label: 'Available & Coming Soon', items: available }].map(section => (
        <div key={section.label} className="mb-6">
          <h2 className="text-[13px] font-semibold text-text-1 mb-3">{section.label}</h2>
          <div className="grid grid-cols-2 gap-4">
            {section.items.map(intg => {
              const sc = statusConfig[intg.status]
              const StatusIcon = sc.icon
              return (
                <div key={intg.id} className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center text-[12px] font-bold text-accent">{intg.icon}</div>
                      <div>
                        <div className="text-[14px] font-semibold text-text-1">{intg.name}</div>
                        <div className="text-[11px] text-text-3">{intg.category}</div>
                      </div>
                    </div>
                    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold', sc.bg, sc.color)}>
                      <StatusIcon className="w-3 h-3" />
                      {sc.label}
                    </span>
                  </div>
                  <p className="text-[12px] text-text-2 mb-3">{intg.description}</p>
                  {intg.status === 'connected' ? (
                    <button onClick={() => alert(`Configure ${intg.name}`)} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-text-2 hover:text-text-1 transition-colors">
                      <Settings className="w-3.5 h-3.5" /> Configure
                    </button>
                  ) : intg.status === 'available' ? (
                    <button onClick={() => alert(`Connect ${intg.name}`)} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent hover:text-accent-hover transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" /> Connect
                    </button>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
