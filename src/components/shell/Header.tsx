import { useLocation } from 'react-router-dom'
import { HelpCircle } from 'lucide-react'

const pageTitles: Record<string, string> = {
  '/': 'Acme Corp',
  '/discovery': 'Discovery',
  '/workforce': 'Workforce Blueprint',
  '/agents': 'Agent Builder',
  '/deployments': 'Deployments',
  '/hitl': 'HITL Queue',
  '/analytics': 'Analytics',
  '/audit': 'Audit Log',
  '/integrations': 'Integrations',
  '/team': 'Team & Permissions',
  '/settings': 'Platform Settings',
}

export function Header() {
  const location = useLocation()
  const title = pageTitles[location.pathname] ?? 'Sebastian'

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-border bg-surface shrink-0">
      <div className="flex items-center gap-2">
        <span className="text-[14px] font-semibold text-text-1">{title}</span>
      </div>
      <div className="flex items-center gap-1">
        <button className="p-2 rounded-lg hover:bg-sidebar-hover transition-colors text-text-3 hover:text-text-2">
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
