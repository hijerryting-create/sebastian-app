import type { DiscoveryOpportunity } from '@/types'

export const opportunities: DiscoveryOpportunity[] = [
  {
    id: 'disc-001',
    title: 'Vendor Payment Matching',
    department: 'Finance',
    estimatedSavings: 145000,
    complexity: 'low',
    status: 'approved',
    description: 'Automate three-way matching of purchase orders, receipts, and invoices for vendor payments.',
  },
  {
    id: 'disc-002',
    title: 'IT Access Provisioning',
    department: 'IT',
    estimatedSavings: 89000,
    complexity: 'medium',
    status: 'evaluating',
    description: 'Streamline new hire access provisioning across SaaS tools, VPN, and internal systems.',
  },
  {
    id: 'disc-003',
    title: 'Compliance Report Assembly',
    department: 'Legal',
    estimatedSavings: 210000,
    complexity: 'high',
    status: 'identified',
    description: 'Auto-generate quarterly compliance reports by aggregating data across audit trails.',
  },
  {
    id: 'disc-004',
    title: 'Customer Renewal Outreach',
    department: 'Customer Success',
    estimatedSavings: 178000,
    complexity: 'medium',
    status: 'evaluating',
    description: 'Automated renewal reminders, health check summaries, and escalation for at-risk accounts.',
  },
  {
    id: 'disc-005',
    title: 'Expense Report Audit',
    department: 'Finance',
    estimatedSavings: 62000,
    complexity: 'low',
    status: 'approved',
    description: 'Flag policy violations and duplicate expense submissions automatically.',
  },
]
