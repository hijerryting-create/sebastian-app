import { cn } from '@/lib/utils'
import { Users, Shield, UserPlus, MoreHorizontal } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  department: string
  lastActive: string
}

const team: TeamMember[] = [
  { id: 'tm-001', name: 'Jerry Ting', email: 'jerry@acmecorp.com', role: 'admin', department: 'Executive', lastActive: '2026-04-13T09:45:00Z' },
  { id: 'tm-002', name: 'Sarah Chen', email: 'sarah.chen@acmecorp.com', role: 'admin', department: 'Legal', lastActive: '2026-04-13T09:30:00Z' },
  { id: 'tm-003', name: 'Michael Torres', email: 'michael.t@acmecorp.com', role: 'editor', department: 'Legal', lastActive: '2026-04-13T08:15:00Z' },
  { id: 'tm-004', name: 'Amanda Liu', email: 'amanda.liu@acmecorp.com', role: 'editor', department: 'Finance', lastActive: '2026-04-12T17:00:00Z' },
  { id: 'tm-005', name: 'Rachel Kim', email: 'rachel.kim@acmecorp.com', role: 'editor', department: 'Legal', lastActive: '2026-04-13T07:45:00Z' },
  { id: 'tm-006', name: 'David Park', email: 'david.park@acmecorp.com', role: 'viewer', department: 'Insurance Ops', lastActive: '2026-04-12T14:00:00Z' },
  { id: 'tm-007', name: 'Lisa Wang', email: 'lisa.wang@acmecorp.com', role: 'viewer', department: 'HR', lastActive: '2026-04-11T16:30:00Z' },
  { id: 'tm-008', name: 'Chris Johnson', email: 'chris.j@acmecorp.com', role: 'viewer', department: 'Customer Success', lastActive: '2026-04-12T11:00:00Z' },
]

const roleColors: Record<string, string> = {
  admin: 'bg-accent-subtle text-accent',
  editor: 'bg-success-subtle text-success',
  viewer: 'bg-background text-text-3',
}

export function TeamPermissions() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-fade-in">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-text-1 tracking-[-0.03em]">Team & Permissions</h1>
          <p className="text-[15px] text-text-2 mt-2">Manage team members and their access levels.</p>
        </div>
        <button
          onClick={() => alert('Invite team member')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-[13px] font-semibold rounded-full hover:bg-accent-hover transition-colors duration-300"
        >
          <UserPlus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-text-3" />
            <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">Team Members</span>
          </div>
          <div className="text-[28px] font-bold text-text-1">{team.length}</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-text-3" />
            <span className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">Admins</span>
          </div>
          <div className="text-[28px] font-bold text-accent">{team.filter(t => t.role === 'admin').length}</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-[var(--shadow-card)]">
          <div className="text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em] mb-2">Departments</div>
          <div className="text-[28px] font-bold text-text-1">{new Set(team.map(t => t.department)).size}</div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
        <div className="grid grid-cols-[1fr_180px_120px_100px_140px_40px] px-6 py-3 border-b border-border bg-background text-[11px] font-semibold text-text-3 uppercase tracking-[0.06em]">
          <span>Name</span>
          <span>Email</span>
          <span>Department</span>
          <span>Role</span>
          <span>Last Active</span>
          <span />
        </div>
        <div className="divide-y divide-border">
          {team.map(member => (
            <div key={member.id} className="grid grid-cols-[1fr_180px_120px_100px_140px_40px] items-center px-6 py-4 hover:bg-background/60 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-[11px] font-bold text-accent">
                  {member.name.split(' ').map(w => w[0]).join('')}
                </div>
                <span className="text-[14px] font-semibold text-text-1">{member.name}</span>
              </div>
              <span className="text-[12px] text-text-3 truncate">{member.email}</span>
              <span className="text-[12px] text-text-2">{member.department}</span>
              <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize w-fit', roleColors[member.role])}>
                {member.role}
              </span>
              <span className="text-[12px] text-text-3 tabular-nums">
                {new Date(member.lastActive).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
              <button
                onClick={() => alert(`Manage ${member.name}`)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-background text-text-3 hover:text-text-1"
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
