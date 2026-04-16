import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Bell, Shield, Zap, Globe, Save } from 'lucide-react'

interface SettingToggle {
  id: string
  label: string
  description: string
  defaultOn: boolean
}

const sections = [
  {
    title: 'Notifications',
    icon: Bell,
    settings: [
      { id: 'notif-hitl', label: 'HITL Alerts', description: 'Get notified when items are escalated to the HITL queue.', defaultOn: true },
      { id: 'notif-deploy', label: 'Deployment Updates', description: 'Receive notifications when agents are deployed or rolled back.', defaultOn: true },
      { id: 'notif-sla', label: 'SLA Warnings', description: 'Alert when HITL items approach or exceed their SLA deadline.', defaultOn: true },
      { id: 'notif-weekly', label: 'Weekly Digest', description: 'Receive a weekly summary of agent performance metrics.', defaultOn: false },
    ] as SettingToggle[],
  },
  {
    title: 'Security',
    icon: Shield,
    settings: [
      { id: 'sec-2fa', label: 'Two-Factor Authentication', description: 'Require 2FA for all team members.', defaultOn: true },
      { id: 'sec-sso', label: 'SSO Enforcement', description: 'Require single sign-on for platform access.', defaultOn: false },
      { id: 'sec-audit', label: 'Enhanced Audit Logging', description: 'Log all API calls and data access events.', defaultOn: true },
    ] as SettingToggle[],
  },
  {
    title: 'Agent Defaults',
    icon: Zap,
    settings: [
      { id: 'agent-hitl', label: 'Auto-HITL Escalation', description: 'Automatically escalate low-confidence decisions to humans.', defaultOn: true },
      { id: 'agent-retry', label: 'Auto-Retry on Failure', description: 'Retry failed agent runs up to 3 times before alerting.', defaultOn: true },
      { id: 'agent-sandbox', label: 'Sandbox Mode for Drafts', description: 'Run draft agents in isolated sandbox before deployment.', defaultOn: true },
    ] as SettingToggle[],
  },
  {
    title: 'Platform',
    icon: Globe,
    settings: [
      { id: 'plat-analytics', label: 'Anonymous Analytics', description: 'Share anonymized usage data to improve the platform.', defaultOn: false },
      { id: 'plat-beta', label: 'Beta Features', description: 'Enable early access to new features.', defaultOn: false },
    ] as SettingToggle[],
  },
]

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'relative w-9 h-5 rounded-full transition-colors duration-200 shrink-0',
        on ? 'bg-accent' : 'bg-border',
      )}
    >
      <div className={cn(
        'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200',
        on ? 'translate-x-[18px]' : 'translate-x-0.5',
      )} />
    </button>
  )
}

export function PlatformSettings() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    for (const section of sections) {
      for (const s of section.settings) {
        init[s.id] = s.defaultOn
      }
    }
    return init
  })

  const handleToggle = (id: string) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="p-8 max-w-[900px] mx-auto animate-fade-in">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-text-1 tracking-[-0.03em]">Platform Settings</h1>
          <p className="text-[15px] text-text-2 mt-2">Configure Sebastian to fit your organization.</p>
        </div>
        <button
          onClick={() => alert('Settings saved')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-[13px] font-semibold rounded-full hover:bg-accent-hover transition-colors duration-300"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {sections.map(section => (
          <div key={section.title} className="bg-surface border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border">
              <section.icon className="w-4 h-4 text-text-3" />
              <h2 className="text-[15px] font-semibold text-text-1">{section.title}</h2>
            </div>
            <div className="divide-y divide-border">
              {section.settings.map(setting => (
                <div key={setting.id} className="flex items-center justify-between px-6 py-4">
                  <div className="min-w-0 mr-4">
                    <div className="text-[13px] font-semibold text-text-1">{setting.label}</div>
                    <div className="text-[12px] text-text-3 mt-0.5">{setting.description}</div>
                  </div>
                  <Toggle on={toggles[setting.id]} onToggle={() => handleToggle(setting.id)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
