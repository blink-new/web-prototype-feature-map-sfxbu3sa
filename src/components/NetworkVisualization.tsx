import { useState, useRef, useEffect, useCallback } from 'react'
import { 
  Network, 
  Users, 
  Building2, 
  Lightbulb, 
  GraduationCap,
  TrendingUp,
  MapPin,
  Move,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface NetworkNode {
  id: number
  name: string
  type: 'corporation' | 'startup' | 'research' | 'individual' | 'investor' | 'community'
  size: 'small' | 'medium' | 'large'
  connections: number
  x: number
  y: number
  sector?: string
  employees?: number
  revenue?: string
  funding?: string
  investments?: number
  members?: number
  companies?: number
  lat?: number
  lng?: number
}

interface Connection {
  from: number
  to: number
  strength: 'weak' | 'medium' | 'strong'
  type: string
  distance?: number
}

interface NetworkVisualizationProps {
  nodes: NetworkNode[]
  connections: Connection[]
  selectedNode: NetworkNode | null
  onNodeSelect: (node: NetworkNode | null) => void
}

const nodeTypeColors = {
  corporation: 'bg-blue-500',
  startup: 'bg-emerald-500',
  research: 'bg-violet-500',
  individual: 'bg-amber-500',
  investor: 'bg-rose-500',
  community: 'bg-cyan-500'
}

const nodeTypeIcons = {
  corporation: Building2,
  startup: Lightbulb,
  research: GraduationCap,
  individual: Users,
  investor: TrendingUp,
  community: Network
}

const connectionTypeColors = {
  investment: '#10b981',
  partnership: '#3b82f6',
  research: '#8b5cf6',
  talent: '#f59e0b',
  community: '#ef4444',
  economic: '#06b6d4',
  collaboration: '#84cc16',
  acquisition: '#f97316',
  vendor: '#6b7280',
  'co-investment': '#ec4899',
  development: '#14b8a6',
  acceleration: '#22c55e',
  support: '#a855f7',
  incubation: '#0ea5e9',
  clinical: '#dc2626',
  sponsorship: '#7c3aed'
}

// Mock Orlando company locations
const orlandoCompanies = [
  { id: 1, name: 'Lockheed Martin', lat: 28.5383, lng: -81.3792, type: 'corporation' },
  { id: 2, name: 'EA Sports', lat: 28.4177, lng: -81.5812, type: 'corporation' },
  { id: 3, name: 'UCF Innovation', lat: 28.6024, lng: -81.2001, type: 'research' },
  { id: 4, name: 'AdventHealth', lat: 28.5421, lng: -81.3790, type: 'corporation' },
  { id: 5, name: 'Fattmerchant', lat: 28.5383, lng: -81.3792, type: 'startup' },
  { id: 6, name: 'Gyrus AIMS', lat: 28.4177, lng: -81.5812, type: 'startup' },
  { id: 7, name: 'Luminar', lat: 28.6024, lng: -81.2001, type: 'startup' },
  { id: 8, name: 'Canvs AI', lat: 28.5421, lng: -81.3790, type: 'startup' },
  { id: 9, name: 'Orlando Ventures', lat: 28.5383, lng: -81.3792, type: 'investor' },
  { id: 10, name: 'Embarc Collective', lat: 28.4177, lng: -81.5812, type: 'investor' },
]

export function NetworkVisualization({ nodes, connections, selectedNode, onNodeSelect }: NetworkVisualizationProps) {
  const [connectionFilter, setConnectionFilter] = useState<'all' | 'direct' | '2-degree' | '3-degree'>('all')
  const [viewMode, setViewMode] = useState<'network' | 'map'>('map')
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [visibleConnections, setVisibleConnections] = useState<Set<string>>(new Set())
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate connection degrees for LinkedIn-style filtering
  const getConnectionDegrees = useCallback((targetNodeId: number, currentUserId: number = 1) => {
    const visited = new Set<number>()
    const degrees = new Map<number, number>()
    const queue: { nodeId: number, degree: number }[] = [{ nodeId: currentUserId, degree: 0 }]
    
    degrees.set(currentUserId, 0)
    
    while (queue.length > 0) {
      const { nodeId, degree } = queue.shift()!
      
      if (visited.has(nodeId)) continue
      visited.add(nodeId)
      
      // Find all connected nodes
      const connectedNodes = connections
        .filter(conn => conn.from === nodeId || conn.to === nodeId)
        .map(conn => conn.from === nodeId ? conn.to : conn.from)
      
      for (const connectedNodeId of connectedNodes) {
        if (!degrees.has(connectedNodeId) || degrees.get(connectedNodeId)! > degree + 1) {
          degrees.set(connectedNodeId, degree + 1)
          if (degree + 1 <= 3) { // Only go up to 3 degrees
            queue.push({ nodeId: connectedNodeId, degree: degree + 1 })
          }
        }
      }
    }
    
    return degrees
  }, [connections])

  // Filter nodes and connections based on connection filter
  const filteredData = useCallback(() => {
    if (connectionFilter === 'all') {
      return { nodes, connections }
    }
    
    const currentUserId = selectedNode?.id || 1 // Default to first node as current user
    const degrees = getConnectionDegrees(currentUserId, currentUserId)
    
    let maxDegree = 0
    switch (connectionFilter) {
      case 'direct':
        maxDegree = 1
        break
      case '2-degree':
        maxDegree = 2
        break
      case '3-degree':
        maxDegree = 3
        break
    }
    
    const filteredNodeIds = new Set<number>()
    degrees.forEach((degree, nodeId) => {
      if (degree <= maxDegree) {
        filteredNodeIds.add(nodeId)
      }
    })
    
    const filteredNodes = nodes.filter(node => filteredNodeIds.has(node.id))
    const filteredConnections = connections.filter(conn => 
      filteredNodeIds.has(conn.from) && filteredNodeIds.has(conn.to)
    )
    
    return { nodes: filteredNodes, connections: filteredConnections }
  }, [nodes, connections, connectionFilter, selectedNode, getConnectionDegrees])

  const { nodes: displayNodes, connections: displayConnections } = filteredData()

  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsDragging(true)
      setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setTransform(prev => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setTransform(prev => ({
      ...prev,
      scale: Math.max(0.1, Math.min(3, prev.scale * delta))
    }))
  }

  // Reset view
  const resetView = () => {
    setTransform({ x: 0, y: 0, scale: 1 })
  }

  // Zoom controls
  const zoomIn = () => {
    setTransform(prev => ({ ...prev, scale: Math.min(3, prev.scale * 1.2) }))
  }

  const zoomOut = () => {
    setTransform(prev => ({ ...prev, scale: Math.max(0.1, prev.scale / 1.2) }))
  }

  // Toggle connection visibility
  const toggleConnection = (connectionId: string) => {
    setVisibleConnections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(connectionId)) {
        newSet.delete(connectionId)
      } else {
        newSet.add(connectionId)
      }
      return newSet
    })
  }

  const NetworkView = () => (
    <div className="relative w-full h-[600px] bg-muted/20 rounded-lg border overflow-hidden">
      {/* Connection Filter Buttons */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={connectionFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setConnectionFilter('all')}
              >
                All
              </Button>
            </TooltipTrigger>
            <TooltipContent>Show all connections</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={connectionFilter === 'direct' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setConnectionFilter('direct')}
              >
                Direct
              </Button>
            </TooltipTrigger>
            <TooltipContent>Direct connections only</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={connectionFilter === '2-degree' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setConnectionFilter('2-degree')}
              >
                2
              </Button>
            </TooltipTrigger>
            <TooltipContent>2nd degree connections</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={connectionFilter === '3-degree' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setConnectionFilter('3-degree')}
              >
                3
              </Button>
            </TooltipTrigger>
            <TooltipContent>Up to 3rd degree connections</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button variant="outline" size="sm" onClick={zoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={zoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={resetView}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Drag Instructions */}
      <div className="absolute bottom-4 left-4 z-10 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
        <Move className="h-3 w-3 inline mr-1" />
        Drag to pan • Scroll to zoom
      </div>

      {/* Network SVG */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <svg
          ref={svgRef}
          className="w-full h-full"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`
          }}
        >
          {/* Render connections */}
          {displayConnections.map((conn, index) => {
            const fromNode = displayNodes.find(n => n.id === conn.from)
            const toNode = displayNodes.find(n => n.id === conn.to)
            if (!fromNode || !toNode) return null
            
            const connectionColor = connectionTypeColors[conn.type as keyof typeof connectionTypeColors] || '#6b7280'
            const connectionId = `${conn.from}-${conn.to}-${conn.type}`
            const isVisible = visibleConnections.size === 0 || visibleConnections.has(connectionId)
            
            return (
              <line
                key={index}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={connectionColor}
                strokeWidth={conn.strength === 'strong' ? 3 : conn.strength === 'medium' ? 2 : 1}
                opacity={isVisible ? 0.7 : 0.1}
                strokeDasharray={conn.type === 'talent' ? '5,5' : conn.type === 'vendor' ? '3,3' : 'none'}
                className="cursor-pointer hover:opacity-100 transition-opacity"
                onClick={() => toggleConnection(connectionId)}
              />
            )
          })}
          
          {/* Render nodes */}
          {displayNodes.map((node) => {
            const Icon = nodeTypeIcons[node.type as keyof typeof nodeTypeIcons]
            const size = node.size === 'large' ? 40 : node.size === 'medium' ? 30 : 20
            const isSelected = selectedNode?.id === node.id
            
            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={size / 2}
                  fill={node.type === 'corporation' ? '#3b82f6' : 
                        node.type === 'startup' ? '#10b981' : 
                        node.type === 'research' ? '#8b5cf6' : 
                        node.type === 'individual' ? '#f59e0b' : 
                        node.type === 'investor' ? '#f43f5e' : '#06b6d4'}
                  className="cursor-pointer hover:opacity-80 transition-all"
                  onClick={(e) => {
                    e.stopPropagation()
                    onNodeSelect(node)
                  }}
                  stroke={isSelected ? "#fbbf24" : "#ffffff"}
                  strokeWidth={isSelected ? "4" : "2"}
                  filter={isSelected ? "drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))" : "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))"}
                />
                <text
                  x={node.x}
                  y={node.y + size / 2 + 15}
                  textAnchor="middle"
                  className="text-xs font-medium fill-current pointer-events-none"
                >
                  {node.name.length > 12 ? node.name.substring(0, 12) + '...' : node.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Connection Stats */}
      <div className="absolute bottom-4 right-4 z-10 bg-background/95 backdrop-blur-sm p-3 rounded-lg border text-xs">
        <div className="space-y-1">
          <div>Showing: {displayNodes.length} nodes, {displayConnections.length} connections</div>
          <div>Filter: {connectionFilter === 'all' ? 'All connections' : 
                      connectionFilter === 'direct' ? 'Direct only' :
                      connectionFilter === '2-degree' ? '2nd degree' : '3rd degree'}</div>
        </div>
      </div>
    </div>
  )

  const MapView = () => (
    <div className="relative w-full h-[600px] bg-muted/20 rounded-lg border overflow-hidden">
      {/* Connection Filter Buttons */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button
          variant={connectionFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setConnectionFilter('all')}
        >
          All
        </Button>
        <Button
          variant={connectionFilter === 'direct' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setConnectionFilter('direct')}
        >
          Direct
        </Button>
        <Button
          variant={connectionFilter === '2-degree' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setConnectionFilter('2-degree')}
        >
          2
        </Button>
        <Button
          variant={connectionFilter === '3-degree' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setConnectionFilter('3-degree')}
        >
          3
        </Button>
      </div>

      {/* Mock Orlando Map */}
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative">
        {/* Orlando City Outline */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-96 h-96 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-400">Orlando</span>
            
            {/* Company Markers */}
            {orlandoCompanies.map((company) => {
              const filteredCompany = displayNodes.find(n => n.name === company.name)
              if (!filteredCompany) return null
              
              const Icon = nodeTypeIcons[company.type as keyof typeof nodeTypeIcons]
              const isSelected = selectedNode?.id === filteredCompany.id
              
              // Convert lat/lng to relative position within the circle
              const angle = (company.id * 45) % 360 // Distribute around circle
              const radius = 120 + (company.id % 3) * 30 // Vary distance from center
              const x = Math.cos(angle * Math.PI / 180) * radius
              const y = Math.sin(angle * Math.PI / 180) * radius
              
              return (
                <div
                  key={company.id}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
                    isSelected ? 'scale-125 z-10' : ''
                  }`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`
                  }}
                  onClick={() => onNodeSelect(filteredCompany)}
                >
                  <div className={`w-8 h-8 ${nodeTypeColors[company.type as keyof typeof nodeTypeColors]} rounded-full flex items-center justify-center shadow-lg ${
                    isSelected ? 'ring-4 ring-yellow-400' : ''
                  }`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap">
                    {company.name}
                  </div>
                </div>
              )
            })}
            
            {/* Connection Lines on Map */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {displayConnections.map((conn, index) => {
                const fromCompany = orlandoCompanies.find(c => displayNodes.find(n => n.id === conn.from)?.name === c.name)
                const toCompany = orlandoCompanies.find(c => displayNodes.find(n => n.id === conn.to)?.name === c.name)
                
                if (!fromCompany || !toCompany) return null
                
                const fromAngle = (fromCompany.id * 45) % 360
                const fromRadius = 120 + (fromCompany.id % 3) * 30
                const fromX = 192 + Math.cos(fromAngle * Math.PI / 180) * fromRadius
                const fromY = 192 + Math.sin(fromAngle * Math.PI / 180) * fromRadius
                
                const toAngle = (toCompany.id * 45) % 360
                const toRadius = 120 + (toCompany.id % 3) * 30
                const toX = 192 + Math.cos(toAngle * Math.PI / 180) * toRadius
                const toY = 192 + Math.sin(toAngle * Math.PI / 180) * toRadius
                
                const connectionColor = connectionTypeColors[conn.type as keyof typeof connectionTypeColors] || '#6b7280'
                
                return (
                  <line
                    key={index}
                    x1={fromX}
                    y1={fromY}
                    x2={toX}
                    y2={toY}
                    stroke={connectionColor}
                    strokeWidth={conn.strength === 'strong' ? 3 : conn.strength === 'medium' ? 2 : 1}
                    opacity={0.6}
                    strokeDasharray={conn.type === 'talent' ? '5,5' : conn.type === 'vendor' ? '3,3' : 'none'}
                  />
                )
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 z-10 bg-background/95 backdrop-blur-sm p-3 rounded-lg border max-w-xs">
        <h4 className="text-sm font-semibold mb-2">Orlando Tech Map</h4>
        <div className="grid grid-cols-2 gap-1 text-xs">
          {Object.entries(nodeTypeColors).map(([type, color]) => {
            const Icon = nodeTypeIcons[type as keyof typeof nodeTypeIcons]
            const count = displayNodes.filter(n => n.type === type).length
            return (
              <div key={type} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <Icon className="h-2 w-2" />
                <span className="capitalize">{type} ({count})</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Network Visualization
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {displayNodes.length} nodes
            </Badge>
            <Badge variant="outline">
              {displayConnections.length} connections
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'network' | 'map')}>
          <TabsList className="mb-4">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              City Map
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              Network View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map">
            <MapView />
          </TabsContent>

          <TabsContent value="network">
            <NetworkView />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}