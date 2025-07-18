import { useState } from 'react'
import { 
  Network, 
  Users, 
  Building2, 
  Lightbulb, 
  GraduationCap,
  Filter,
  Search,
  Maximize2,
  Minimize2,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { NetworkVisualization } from '../components/NetworkVisualization'

const networkNodes = [
  { id: 1, name: 'Lockheed Martin', type: 'corporation', size: 'large', connections: 45, x: 300, y: 200, sector: 'Aerospace & Defense', employees: 15000, revenue: '$65B+' },
  { id: 2, name: 'EA Sports', type: 'corporation', size: 'large', connections: 38, x: 150, y: 150, sector: 'Gaming & Entertainment', employees: 2500, revenue: '$7B+' },
  { id: 3, name: 'UCF Innovation', type: 'research', size: 'large', connections: 67, x: 450, y: 300, sector: 'Research & Education', employees: 1200, companies: 150 },
  { id: 4, name: 'AdventHealth', type: 'corporation', size: 'large', connections: 34, x: 250, y: 250, sector: 'Healthcare', employees: 83000, revenue: '$13B+' },
  { id: 5, name: 'Fattmerchant', type: 'startup', size: 'medium', connections: 28, x: 400, y: 150, sector: 'FinTech', employees: 150, funding: '$22M' },
  { id: 6, name: 'Gyrus AIMS', type: 'startup', size: 'medium', connections: 25, x: 200, y: 350, sector: 'Healthcare Tech', employees: 85, funding: '$15M' },
  { id: 7, name: 'Luminar', type: 'startup', size: 'medium', connections: 32, x: 350, y: 400, sector: 'Automotive Tech', employees: 600, funding: '$590M' },
  { id: 8, name: 'Canvs AI', type: 'startup', size: 'medium', connections: 31, x: 500, y: 250, sector: 'AI & Analytics', employees: 45, funding: '$8M' },
  { id: 9, name: 'Orlando Ventures', type: 'investor', size: 'medium', connections: 52, x: 180, y: 300, sector: 'Venture Capital', investments: 25 },
  { id: 10, name: 'FIHMC', type: 'research', size: 'medium', connections: 28, x: 380, y: 320, sector: 'Healthcare Research', employees: 800 },
  { id: 11, name: 'Orlando Health Research', type: 'research', size: 'medium', connections: 24, x: 280, y: 380, sector: 'Medical Research', employees: 450 },
  { id: 12, name: 'Embarc Collective', type: 'investor', size: 'medium', connections: 41, x: 420, y: 180, sector: 'Startup Accelerator', investments: 35 },
  { id: 13, name: 'CNL City Commons', type: 'investor', size: 'medium', connections: 29, x: 320, y: 150, sector: 'Real Estate & VC', investments: 18 },
  { id: 14, name: 'Orlando Tech Association', type: 'community', size: 'medium', connections: 89, x: 250, y: 320, sector: 'Tech Community', members: 5000 },
  { id: 15, name: 'Starter Studio', type: 'community', size: 'medium', connections: 56, x: 380, y: 280, sector: 'Startup Incubator', companies: 40 },
  { id: 16, name: 'Economic Partnership', type: 'community', size: 'medium', connections: 73, x: 300, y: 350, sector: 'Economic Development', members: 200 },
  { id: 17, name: 'Limbitless Solutions', type: 'startup', size: 'small', connections: 19, x: 460, y: 340, sector: 'Medical Devices', employees: 25, funding: '$3M' },
  { id: 18, name: 'Voalte', type: 'startup', size: 'medium', connections: 22, x: 220, y: 280, sector: 'Healthcare Tech', employees: 120, funding: 'Acquired' },
  { id: 19, name: 'RedAwning', type: 'startup', size: 'small', connections: 16, x: 340, y: 240, sector: 'Travel Tech', employees: 35, funding: '$5M' },
  { id: 20, name: 'Darden Business School', type: 'research', size: 'medium', connections: 33, x: 180, y: 200, sector: 'Business Education', employees: 300 }
]

const connections = [
  // Corporate partnerships
  { from: 1, to: 9, strength: 'strong', type: 'partnership' }, // Lockheed Martin <-> UCF Innovation
  { from: 2, to: 15, strength: 'strong', type: 'sponsorship' }, // EA Sports <-> Orlando Tech Association
  { from: 4, to: 11, strength: 'strong', type: 'collaboration' }, // AdventHealth <-> Orlando Health Research
  
  // Investment relationships
  { from: 12, to: 5, strength: 'strong', type: 'investment' }, // Orlando Ventures -> Fattmerchant
  { from: 13, to: 7, strength: 'strong', type: 'investment' }, // Embarc Collective -> Luminar
  { from: 14, to: 8, strength: 'medium', type: 'investment' }, // CNL City Commons -> Canvs AI
  { from: 12, to: 18, strength: 'medium', type: 'investment' }, // Orlando Ventures -> Limbitless
  { from: 13, to: 6, strength: 'strong', type: 'acceleration' }, // Embarc Collective -> Gyrus AIMS
  
  // Research collaborations
  { from: 9, to: 10, strength: 'strong', type: 'research' }, // UCF <-> FIHMC
  { from: 9, to: 18, strength: 'medium', type: 'incubation' }, // UCF -> Limbitless
  { from: 10, to: 8, strength: 'medium', type: 'research' }, // FIHMC <-> Canvs AI
  { from: 11, to: 4, strength: 'strong', type: 'clinical' }, // Research Institute <-> AdventHealth
  
  // Community connections
  { from: 15, to: 16, strength: 'strong', type: 'community' }, // Orlando Tech <-> Starter Studio
  { from: 15, to: 17, strength: 'strong', type: 'partnership' }, // Orlando Tech <-> Economic Partnership
  { from: 16, to: 5, strength: 'medium', type: 'support' }, // Starter Studio -> Fattmerchant
  { from: 16, to: 20, strength: 'medium', type: 'incubation' }, // Starter Studio -> RedAwning
  
  // Talent pipeline
  { from: 9, to: 1, strength: 'medium', type: 'talent' }, // UCF -> Lockheed Martin
  { from: 9, to: 2, strength: 'medium', type: 'talent' }, // UCF -> EA Sports
  { from: 9, to: 5, strength: 'weak', type: 'talent' }, // UCF -> Fattmerchant
  
  // Acquisition/Exit connections
  { from: 19, to: 4, strength: 'medium', type: 'acquisition' }, // Voalte -> AdventHealth (related)
  
  // Cross-sector collaborations
  { from: 3, to: 17, strength: 'medium', type: 'economic' }, // Darden <-> Economic Partnership
  { from: 1, to: 17, strength: 'strong', type: 'economic' }, // Lockheed <-> Economic Partnership
  { from: 2, to: 9, strength: 'medium', type: 'research' }, // EA Sports <-> UCF (gaming research)
  
  // Supply chain / vendor relationships
  { from: 1, to: 7, strength: 'weak', type: 'vendor' }, // Lockheed Martin <-> Luminar (potential)
  { from: 4, to: 19, strength: 'medium', type: 'vendor' }, // AdventHealth <-> Voalte
  
  // Funding ecosystem
  { from: 12, to: 13, strength: 'medium', type: 'co-investment' }, // Orlando Ventures <-> Embarc
  { from: 14, to: 12, strength: 'medium', type: 'co-investment' }, // CNL <-> Orlando Ventures
  
  // Innovation hubs
  { from: 17, to: 9, strength: 'strong', type: 'development' }, // Economic Partnership <-> UCF Innovation
  { from: 17, to: 14, strength: 'medium', type: 'development' }, // Economic Partnership <-> CNL
]

const nodeTypeColors = {
  corporation: 'bg-blue-500',
  startup: 'bg-green-500',
  research: 'bg-purple-500',
  individual: 'bg-orange-500',
  investor: 'bg-red-500',
  community: 'bg-yellow-500'
}

const nodeTypeIcons = {
  corporation: Building2,
  startup: Lightbulb,
  research: GraduationCap,
  individual: Users,
  investor: TrendingUp,
  community: Network
}

export function EcosystemMap() {
  const [selectedNode, setSelectedNode] = useState<any>(null)
  const [filterType, setFilterType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [viewMode, setViewMode] = useState('network')

  const filteredNodes = networkNodes.filter(node => {
    const matchesType = filterType === 'all' || node.type === filterType
    const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const connectionTypeColors = {
    investment: '#10b981', // green
    partnership: '#3b82f6', // blue
    research: '#8b5cf6', // purple
    talent: '#f59e0b', // amber
    community: '#ef4444', // red
    economic: '#06b6d4', // cyan
    collaboration: '#84cc16', // lime
    acquisition: '#f97316', // orange
    vendor: '#6b7280', // gray
    'co-investment': '#ec4899', // pink
    development: '#14b8a6', // teal
    acceleration: '#22c55e', // green-500
    support: '#a855f7', // violet
    incubation: '#0ea5e9', // sky
    clinical: '#dc2626', // red-600
    sponsorship: '#7c3aed' // violet-600
  }



  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orlando Economic Ecosystem Map</h1>
          <p className="text-muted-foreground">
            Comprehensive visualization of Orlando's innovation economy and business network
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
        </div>
      </div>

      {/* Economic Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">
                  {networkNodes.reduce((sum, node) => sum + (typeof node.employees === 'number' ? node.employees : 0), 0).toLocaleString()}+
                </p>
                <p className="text-xs text-muted-foreground">Total Employment</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">$3.0B+</p>
                <p className="text-xs text-muted-foreground">Economic Impact</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {networkNodes.filter(node => node.type === 'startup').length}
                </p>
                <p className="text-xs text-muted-foreground">Active Startups</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{connections.length}</p>
                <p className="text-xs text-muted-foreground">Active Connections</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search organizations, people, or projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="corporation">Corporations</SelectItem>
              <SelectItem value="startup">Startups</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="investor">Investors</SelectItem>
              <SelectItem value="community">Community</SelectItem>
            </SelectContent>
          </Select>
          <Select value={viewMode === 'sector' ? 'sector' : 'all'} onValueChange={(value) => value === 'sector' ? setViewMode('sector') : null}>
            <SelectTrigger className="w-40">
              <Building2 className="h-4 w-4 mr-2" />
              <SelectValue placeholder="By Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              <SelectItem value="sector">By Sector</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={viewMode} onValueChange={setViewMode}>
        <TabsList>
          <TabsTrigger value="network">Map View</TabsTrigger>
          <TabsTrigger value="list">Directory</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="network" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <NetworkVisualization 
                nodes={filteredNodes}
                connections={connections}
                selectedNode={selectedNode}
                onNodeSelect={setSelectedNode}
              />
            </div>

            <div className="space-y-6">
              {selectedNode && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {(() => {
                        const Icon = nodeTypeIcons[selectedNode.type as keyof typeof nodeTypeIcons]
                        return <Icon className="h-5 w-5" />
                      })()}
                      {selectedNode.name}
                    </CardTitle>
                    <CardDescription>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="capitalize">
                          {selectedNode.type}
                        </Badge>
                        {selectedNode.sector && (
                          <Badge variant="outline">{selectedNode.sector}</Badge>
                        )}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Revenue</span>
                        <Badge variant="outline">{selectedNode.revenue || 'N/A'}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Employees</span>
                        <Badge variant="outline">{selectedNode.employees?.toLocaleString() || 'N/A'}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Connections</span>
                        <Badge variant="outline">{selectedNode.connections}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Network Size</span>
                        <Badge variant="outline" className="capitalize">{selectedNode.size}</Badge>
                      </div>
                      {selectedNode.funding && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Funding</span>
                          <Badge variant="secondary">{selectedNode.funding}</Badge>
                        </div>
                      )}
                      {selectedNode.investments && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Investments</span>
                          <Badge variant="secondary">{selectedNode.investments}</Badge>
                        </div>
                      )}
                      {selectedNode.members && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Members</span>
                          <Badge variant="secondary">{selectedNode.members.toLocaleString()}</Badge>
                        </div>
                      )}
                      {selectedNode.companies && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Companies</span>
                          <Badge variant="secondary">{selectedNode.companies}</Badge>
                        </div>
                      )}
                    </div>
                    <Button className="w-full" size="sm">
                      <Target className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Economic Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Organizations</span>
                    <Badge variant="secondary">{networkNodes.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Connections</span>
                    <Badge variant="secondary">{connections.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Employment</span>
                    <Badge variant="secondary">
                      {networkNodes.reduce((sum, node) => sum + (typeof node.employees === 'number' ? node.employees : 0), 0).toLocaleString()}+
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Major Corporations</span>
                    <Badge variant="secondary">
                      {networkNodes.filter(node => node.type === 'corporation').length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Startups</span>
                    <Badge variant="secondary">
                      {networkNodes.filter(node => node.type === 'startup').length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Research Institutions</span>
                    <Badge variant="secondary">
                      {networkNodes.filter(node => node.type === 'research').length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Investment Firms</span>
                    <Badge variant="secondary">
                      {networkNodes.filter(node => node.type === 'investor').length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Network Density</span>
                    <Badge variant="secondary">
                      {Math.round((connections.length / (networkNodes.length * (networkNodes.length - 1) / 2)) * 100)}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredNodes.map((node) => {
              const Icon = nodeTypeIcons[node.type as keyof typeof nodeTypeIcons]
              return (
                <Card key={node.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedNode(node)}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className={`w-8 h-8 ${nodeTypeColors[node.type as keyof typeof nodeTypeColors]} rounded-lg flex items-center justify-center`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{node.name}</div>
                        {node.sector && (
                          <div className="text-sm text-muted-foreground">{node.sector}</div>
                        )}
                      </div>
                    </CardTitle>
                    <CardDescription>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="capitalize">
                          {node.type}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {node.size}
                        </Badge>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Revenue:</span>
                        <div className="font-medium">{node.revenue || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Employees:</span>
                        <div className="font-medium">{typeof node.employees === 'number' ? node.employees.toLocaleString() : 'N/A'}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Connections:</span>
                        <div className="font-medium">{node.connections}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          {node.type === 'startup' ? 'Funding:' : 
                           node.type === 'investor' ? 'Investments:' : 
                           node.type === 'community' ? 'Members:' : 'Network:'}
                        </span>
                        <div className="font-medium">
                          {node.funding || 
                           (node.investments && `${node.investments} cos`) || 
                           (node.members && node.members.toLocaleString()) ||
                           (node.companies && `${node.companies} cos`) || 
                           'Active'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-6">
          <div className="grid gap-6">
            {(() => {
              const sectorGroups = networkNodes.reduce((acc, node) => {
                if (node.sector) {
                  if (!acc[node.sector]) {
                    acc[node.sector] = []
                  }
                  acc[node.sector].push(node)
                }
                return acc
              }, {} as Record<string, typeof networkNodes>)

              return Object.entries(sectorGroups)
                .sort(([,a], [,b]) => b.length - a.length)
                .map(([sector, nodes]) => {
                  const totalEmployees = nodes.reduce((sum, node) => sum + (typeof node.employees === 'number' ? node.employees : 0), 0)
                  const totalConnections = nodes.reduce((sum, node) => sum + node.connections, 0)
                  const avgConnections = Math.round(totalConnections / nodes.length)
                  
                  return (
                    <Card key={sector}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{sector}</span>
                          <Badge variant="secondary">{nodes.length} organizations</Badge>
                        </CardTitle>
                        <CardDescription>
                          <div className="flex gap-4 text-sm">
                            <span>{totalEmployees.toLocaleString()}+ employees</span>
                            <span>{avgConnections} avg connections</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                          {nodes.map((node) => {
                            const Icon = nodeTypeIcons[node.type as keyof typeof nodeTypeIcons]
                            return (
                              <div 
                                key={node.id} 
                                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                                onClick={() => setSelectedNode(node)}
                              >
                                <div className={`w-6 h-6 ${nodeTypeColors[node.type as keyof typeof nodeTypeColors]} rounded flex items-center justify-center`}>
                                  <Icon className="h-3 w-3 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm truncate">{node.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {typeof node.employees === 'number' ? `${node.employees.toLocaleString()} employees` : node.revenue || 'N/A'}
                                  </div>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {node.connections}
                                </Badge>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
            })()}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Economic Impact</CardTitle>
                <CardDescription>Key economic indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Employment</span>
                  <Badge variant="secondary">
                    {networkNodes.reduce((sum, node) => sum + (typeof node.employees === 'number' ? node.employees : 0), 0).toLocaleString()}+
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avg. Company Size</span>
                  <Badge variant="secondary">
                    {Math.round(networkNodes.reduce((sum, node) => sum + (typeof node.employees === 'number' ? node.employees : 0), 0) / networkNodes.filter(node => typeof node.employees === 'number').length).toLocaleString()}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Startup Funding</span>
                  <Badge variant="secondary">$700M+</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Research Funding</span>
                  <Badge variant="secondary">$2.3B+</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Distribution</CardTitle>
                <CardDescription>Organizations by industry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {(() => {
                  const sectorCounts = networkNodes.reduce((acc, node) => {
                    if (node.sector) {
                      acc[node.sector] = (acc[node.sector] || 0) + 1
                    }
                    return acc
                  }, {} as Record<string, number>)
                  
                  return Object.entries(sectorCounts)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 6)
                    .map(([sector, count]) => (
                      <div key={sector} className="flex items-center justify-between">
                        <span className="text-sm">{sector}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    ))
                })()}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connection Types</CardTitle>
                <CardDescription>Relationship distribution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {(() => {
                  const connectionTypes = connections.reduce((acc, conn) => {
                    const type = conn.type || 'other'
                    acc[type] = (acc[type] || 0) + 1
                    return acc
                  }, {} as Record<string, number>)
                  
                  const total = connections.length
                  
                  return Object.entries(connectionTypes)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([type, count]) => (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{type}</span>
                        <Badge variant="secondary">
                          {count} ({Math.round((count / total) * 100)}%)
                        </Badge>
                      </div>
                    ))
                })()}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Activity</CardTitle>
                <CardDescription>Funding and investment metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Investors</span>
                  <Badge variant="secondary">
                    {networkNodes.filter(node => node.type === 'investor').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Portfolio Companies</span>
                  <Badge variant="secondary">
                    {networkNodes.filter(node => node.type === 'investor').reduce((sum, node) => sum + (node.investments || 0), 0)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Funded Startups</span>
                  <Badge variant="secondary">
                    {networkNodes.filter(node => node.type === 'startup' && node.funding).length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Investment Connections</span>
                  <Badge variant="secondary">
                    {connections.filter(conn => conn.type === 'investment' || conn.type === 'acceleration').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Innovation Hubs</CardTitle>
                <CardDescription>Research and development centers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Research Institutions</span>
                  <Badge variant="secondary">
                    {networkNodes.filter(node => node.type === 'research').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Research Employees</span>
                  <Badge variant="secondary">
                    {networkNodes.filter(node => node.type === 'research').reduce((sum, node) => sum + (typeof node.employees === 'number' ? node.employees : 0), 0).toLocaleString()}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Incubated Companies</span>
                  <Badge variant="secondary">
                    {networkNodes.filter(node => node.companies).reduce((sum, node) => sum + (node.companies || 0), 0)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Research Partnerships</span>
                  <Badge variant="secondary">
                    {connections.filter(conn => conn.type === 'research' || conn.type === 'incubation').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network Health</CardTitle>
                <CardDescription>Ecosystem connectivity metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Network Density</span>
                  <Badge variant="secondary">
                    {Math.round((connections.length / (networkNodes.length * (networkNodes.length - 1) / 2)) * 100)}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avg. Connections</span>
                  <Badge variant="secondary">
                    {Math.round(networkNodes.reduce((sum, node) => sum + node.connections, 0) / networkNodes.length)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Strong Connections</span>
                  <Badge variant="secondary">
                    {connections.filter(conn => conn.strength === 'strong').length} ({Math.round((connections.filter(conn => conn.strength === 'strong').length / connections.length) * 100)}%)
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cross-Sector Links</span>
                  <Badge variant="secondary">
                    {connections.filter(conn => {
                      const fromNode = networkNodes.find(n => n.id === conn.from)
                      const toNode = networkNodes.find(n => n.id === conn.to)
                      return fromNode && toNode && fromNode.type !== toNode.type
                    }).length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}