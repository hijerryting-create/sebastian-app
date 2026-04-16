import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/shell/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { AgentLibrary } from '@/pages/AgentBuilder/index'
import { AgentCanvas } from '@/pages/AgentBuilder/Canvas'
import { HITLQueue, HITLReview } from '@/pages/HITLQueue'
import { Analytics } from '@/pages/Analytics/index'
import { DiscoveryDashboard, DiscoveryDetail } from '@/pages/Discovery/index'
import { WorkforceBlueprintPage } from '@/pages/WorkforceBlueprint/index'
import { Deployments } from '@/pages/Deployments/index'
import { AuditLog } from '@/pages/AuditLog/index'
import { Integrations } from '@/pages/Integrations/index'
import { TeamPermissions } from '@/pages/Team/index'
import { PlatformSettings } from '@/pages/Settings/index'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/discovery" element={<DiscoveryDashboard />} />
          <Route path="/discovery/:discoveryId" element={<DiscoveryDetail />} />
          <Route path="/workforce" element={<WorkforceBlueprintPage />} />
          <Route path="/agents" element={<AgentLibrary />} />
          <Route path="/agents/:agentId" element={<AgentCanvas />} />
          <Route path="/deployments" element={<Deployments />} />
          <Route path="/hitl" element={<HITLQueue />} />
          <Route path="/hitl/:itemId" element={<HITLReview />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/audit" element={<AuditLog />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/team" element={<TeamPermissions />} />
          <Route path="/settings" element={<PlatformSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
