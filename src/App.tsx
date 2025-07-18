import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import { Layout } from './components/Layout'
import { WelcomePage } from './components/WelcomePage'
import { Dashboard } from './pages/Dashboard'
import { EcosystemMap } from './pages/EcosystemMap'
import { MatchmakingHub } from './pages/MatchmakingHub'
import { CommunityDirectory } from './pages/CommunityDirectory'
import { OpportunitiesBoard } from './pages/OpportunitiesBoard'
import { EventsCalendar } from './pages/EventsCalendar'
import Resources from './pages/Resources'
import { AnalyticsCenter } from './pages/AnalyticsCenter'
import { ProfileManagement } from './pages/ProfileManagement'
import { Settings } from './pages/Settings'
import { Rewards } from './pages/Rewards'
import DemoTextPage from './pages/DemoTextPage'

function WelcomeWrapper() {
  const navigate = useNavigate()
  return <WelcomePage onGetStarted={() => navigate('/dashboard')} />
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<WelcomeWrapper />} />
          <Route path="/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/ecosystem" element={
            <Layout>
              <EcosystemMap />
            </Layout>
          } />
          <Route path="/matchmaking" element={
            <Layout>
              <MatchmakingHub />
            </Layout>
          } />
          <Route path="/community" element={
            <Layout>
              <CommunityDirectory />
            </Layout>
          } />
          <Route path="/opportunities" element={
            <Layout>
              <OpportunitiesBoard />
            </Layout>
          } />
          <Route path="/events" element={
            <Layout>
              <EventsCalendar />
            </Layout>
          } />
          <Route path="/resources" element={
            <Layout>
              <Resources />
            </Layout>
          } />
          <Route path="/analytics" element={
            <Layout>
              <AnalyticsCenter />
            </Layout>
          } />
          <Route path="/rewards" element={
            <Layout>
              <Rewards />
            </Layout>
          } />
          <Route path="/profile" element={
            <Layout>
              <ProfileManagement />
            </Layout>
          } />
          <Route path="/settings" element={
            <Layout>
              <Settings />
            </Layout>
          } />
          <Route path="/demo-text" element={<DemoTextPage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App