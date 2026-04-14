import type { Agent } from '@/types'

export const agents: Agent[] = [
  {
    id: 'claims-processing',
    name: 'Claims Processing',
    description: 'Automates end-to-end insurance claims intake, validation, and routing.',
    status: 'deployed',
    department: 'Insurance Ops',
    metrics: { totalRuns: 8240, successRate: 0.972, avgLatencyMs: 1200, laborSavedUsd: 94000, hitlRate: 0.062 },
    lastRun: '2026-04-13T08:30:00Z',
  },
  {
    id: 'invoice-reconciliation',
    name: 'Invoice Reconciliation',
    description: 'Matches invoices to POs, flags discrepancies, and auto-approves within tolerance.',
    status: 'deployed',
    department: 'Finance',
    metrics: { totalRuns: 3102, successRate: 0.994, avgLatencyMs: 800, laborSavedUsd: 52000, hitlRate: 0.031 },
    lastRun: '2026-04-13T09:15:00Z',
  },
  {
    id: 'employee-onboarding',
    name: 'Employee Onboarding',
    description: 'Orchestrates onboarding workflows across HR, IT, and Facilities.',
    status: 'deployed',
    department: 'HR',
    metrics: { totalRuns: 847, successRate: 0.943, avgLatencyMs: 45000, laborSavedUsd: 28000, hitlRate: 0.128 },
    lastRun: '2026-04-12T16:45:00Z',
  },
  {
    id: 'contract-review',
    name: 'Contract Review',
    description: 'Extracts key clauses, identifies risks, and generates compliance summaries.',
    status: 'draft',
    department: 'Legal',
    metrics: { totalRuns: 156, successRate: 0.891, avgLatencyMs: 32000, laborSavedUsd: 8200, hitlRate: 0.214 },
    lastRun: '2026-04-10T11:00:00Z',
  },
  {
    id: 'customer-support-triage',
    name: 'Support Triage',
    description: 'Classifies and routes support tickets by urgency, category, and department.',
    status: 'deployed',
    department: 'Customer Success',
    metrics: { totalRuns: 12430, successRate: 0.968, avgLatencyMs: 350, laborSavedUsd: 67000, hitlRate: 0.044 },
    lastRun: '2026-04-13T09:45:00Z',
  },
]
