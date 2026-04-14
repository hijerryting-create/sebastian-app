import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Search, Users, Bot, Rocket, ClipboardCheck,
  BarChart3, FileText, Plug, UserCog, Settings, Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { hitlItems } from '@/mocks/data/hitlItems'

const navSections = [
  {
    label: 'Workspace',
    items: [
      { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/discovery', icon: Search, label: 'Discovery' },
      { to: '/workforce', icon: Users, label: 'Workforce Blueprint' },
      { to: '/agents', icon: Bot, label: 'Agent Builder' },
      { to: '/deployments', icon: Rocket, label: 'Deployments' },
    ],
  },
  {
    label: 'Monitor',
    items: [
      { to: '/hitl', icon: ClipboardCheck, label: 'HITL Queue', badge: hitlItems.length },
      { to: '/analytics', icon: BarChart3, label: 'Analytics' },
      { to: '/audit', icon: FileText, label: 'Audit Log' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { to: '/integrations', icon: Plug, label: 'Integrations' },
      { to: '/team', icon: UserCog, label: 'Team & Permissions' },
      { to: '/settings', icon: Settings, label: 'Platform Settings' },
    ],
  },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-[240px] h-screen flex flex-col bg-sidebar border-r border-border shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-14 border-b border-border">
        <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="text-[15px] font-semibold text-text-1 tracking-[-0.02em]">Sebastian</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navSections.map(section => (
          <div key={section.label} className="mb-5">
            <div className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em] px-2 mb-1.5">
              {section.label}
            </div>
            <div className="space-y-0.5">
              {section.items.map(item => {
                const isActive = location.pathname === item.to ||
                  (item.to !== '/' && location.pathname.startsWith(item.to))
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[13px] font-medium transition-colors duration-200',
                      isActive
                        ? 'bg-accent-subtle text-accent font-semibold'
                        : 'text-text-2 hover:bg-sidebar-hover hover:text-text-1'
                    )}
                  >
                    <item.icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-accent' : 'text-text-3')} />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge != null && (
                      <span className={cn(
                        'text-[11px] font-bold min-w-[20px] h-5 flex items-center justify-center rounded-full px-1.5',
                        isActive ? 'bg-accent text-white' : 'bg-danger-subtle text-danger'
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 pt-2 border-t border-border">
        <div className="flex items-center gap-2 text-[11px] text-text-3 px-2.5 mb-3">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3" /> Agents active
          </span>
          <span className="font-semibold text-text-2">1,248</span>
        </div>
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-sidebar-hover transition-colors cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-[11px] font-bold text-white">
            JT
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-text-1 truncate">Jerry Ting</div>
            <div className="text-[11px] text-text-3 truncate">Acme Corp</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
