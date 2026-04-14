import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/shell/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { AgentLibrary } from '@/pages/AgentBuilder/index'
import { AgentCanvas } from '@/pages/AgentBuilder/Canvas'
import { HITLQueue, HITLReview } from '@/pages/HITLQueue'
import { Analytics } from '@/pages/Analytics/index'
import { DiscoveryDashboard, DiscoveryDetail } from '@/pages/Discovery/index'
import { WorkforceBlueprintPage } from '@/pages/WorkforceBlueprint/index'

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="p-8 animate-fade-in">
      <h1 className="text-[28px] font-bold text-text-1 tracking-[-0.03em]">{title}</h1>
      <p className="text-[15px] text-text-2 mt-2">This page is coming soon.</p>
    </div>
  )
}

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
          <Route path="/deployments" element={<PlaceholderPage title="Deployments" />} />
          <Route path="/hitl" element={<HITLQueue />} />
          <Route path="/hitl/:itemId" element={<HITLReview />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/audit" element={<PlaceholderPage title="Audit Log" />} />
          <Route path="/integrations" element={<PlaceholderPage title="Integrations" />} />
          <Route path="/team" element={<PlaceholderPage title="Team & Permissions" />} />
          <Route path="/settings" element={<PlaceholderPage title="Platform Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
