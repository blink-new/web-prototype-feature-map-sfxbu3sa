import { useState } from 'react'
import { 
  LayoutDashboard, 
  Network, 
  Users, 
  Briefcase, 
  Calendar, 
  BarChart3, 
  User, 
  Settings,
  Target,
  Zap,
  ArrowRight,
  Info,
  CheckCircle,
  Clock,
  Star,
  Building2,
  GraduationCap,
  TrendingUp,
  MessageSquare,
  Award,
  Search,
  Filter,
  Bell,
  Shield,
  Palette,
  HelpCircle,
  Activity,
  Globe,
  Sparkles
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Link } from 'react-router-dom'

const featureCategories = {
  core: {
    title: 'Core Platform',
    color: 'bg-blue-500',
    features: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        icon: LayoutDashboard,
        href: '/',
        description: 'Central hub with personalized insights, quick actions, and activity feed',
        status: 'complete',
        subFeatures: ['Activity Feed', 'Quick Actions', 'Progress Tracking', 'Ecosystem Health']
      },
      {
        id: 'ecosystem-map',
        name: 'Interactive Ecosystem Map',
        icon: Network,
        href: '/ecosystem',
        description: 'Visual network representation of Orlando\'s tech ecosystem',
        status: 'complete',
        subFeatures: ['Network Visualization', 'Node Filtering', 'Connection Analysis', 'Multi-view Modes']
      }
    ]
  },
  ai: {
    title: 'AI-Powered Features',
    color: 'bg-purple-500',
    features: [
      {
        id: 'matchmaking',
        name: 'AI Matchmaking Hub',
        icon: Target,
        href: '/matchmaking',
        description: 'Intelligent connection recommendations based on skills and interests',
        status: 'complete',
        subFeatures: ['Smart Matching', 'Match Scoring', 'Conversation Management', 'Preference Learning']
      }
    ]
  },
  community: {
    title: 'Community & Networking',
    color: 'bg-green-500',
    features: [
      {
        id: 'directory',
        name: 'Community Directory',
        icon: Users,
        href: '/community',
        description: 'Searchable directory of members and organizations',
        status: 'complete',
        subFeatures: ['Member Profiles', 'Organization Listings', 'Skill-based Search', 'Verification System']
      },
      {
        id: 'events',
        name: 'Events Calendar',
        icon: Calendar,
        href: '/events',
        description: 'Discover and manage tech community events',
        status: 'complete',
        subFeatures: ['Event Discovery', 'Registration System', 'Calendar Integration', 'Event Creation']
      }
    ]
  },
  opportunities: {
    title: 'Opportunities & Growth',
    color: 'bg-orange-500',
    features: [
      {
        id: 'opportunities',
        name: 'Opportunities Board',
        icon: Briefcase,
        href: '/opportunities',
        description: 'Job postings, projects, and collaboration opportunities',
        status: 'complete',
        subFeatures: ['Job Listings', 'Project Opportunities', 'Application Tracking', 'Saved Opportunities']
      }
    ]
  },
  analytics: {
    title: 'Analytics & Insights',
    color: 'bg-red-500',
    features: [
      {
        id: 'analytics',
        name: 'Analytics Center',
        icon: BarChart3,
        href: '/analytics',
        description: 'Ecosystem metrics and performance insights',
        status: 'complete',
        subFeatures: ['Network Analysis', 'Growth Metrics', 'Engagement Tracking', 'Impact Assessment']
      }
    ]
  },
  personal: {
    title: 'Personal Management',
    color: 'bg-indigo-500',
    features: [
      {
        id: 'profile',
        name: 'Profile Management',
        icon: User,
        href: '/profile',
        description: 'Manage personal and professional profile information',
        status: 'complete',
        subFeatures: ['Basic Info', 'Professional Details', 'Skills Management', 'Preferences']
      },
      {
        id: 'settings',
        name: 'Settings',
        icon: Settings,
        href: '/settings',
        description: 'Platform configuration and account management',
        status: 'complete',
        subFeatures: ['Notifications', 'Privacy Controls', 'Appearance', 'Account Management']
      }
    ]
  }
}

const technicalFeatures = [
  {
    category: 'Frontend Architecture',
    items: [
      'React 18 with TypeScript',
      'Vite for fast development',
      'Tailwind CSS for styling',
      'ShadCN UI components',
      'React Router for navigation',
      'Responsive design'
    ]
  },
  {
    category: 'User Experience',
    items: [
      'Mobile-first responsive design',
      'Dark/light theme support',
      'Accessibility compliance',
      'Progressive loading',
      'Smooth animations',
      'Intuitive navigation'
    ]
  },
  {
    category: 'Data Management',
    items: [
      'Real-time data updates',
      'Local state management',
      'Optimistic UI updates',
      'Data persistence',
      'Search and filtering',
      'Pagination support'
    ]
  },
  {
    category: 'AI Integration',
    items: [
      'Machine learning matching',
      'Skill-based recommendations',
      'Behavioral analysis',
      'Predictive insights',
      'Natural language processing',
      'Continuous learning'
    ]
  }
]

const roadmapItems = [
  {
    phase: 'Phase 1: Foundation',
    status: 'complete',
    items: [
      'Core platform architecture',
      'User authentication system',
      'Basic profile management',
      'Community directory',
      'Event management system'
    ]
  },
  {
    phase: 'Phase 2: Intelligence',
    status: 'complete',
    items: [
      'AI matchmaking engine',
      'Network visualization',
      'Analytics dashboard',
      'Smart recommendations',
      'Behavioral insights'
    ]
  },
  {
    phase: 'Phase 3: Enhancement',
    status: 'in-progress',
    items: [
      'Real-time messaging',
      'Video conferencing integration',
      'Mobile app development',
      'API ecosystem',
      'Third-party integrations'
    ]
  },
  {
    phase: 'Phase 4: Scale',
    status: 'planned',
    items: [
      'Multi-city expansion',
      'Enterprise features',
      'Advanced analytics',
      'Blockchain integration',
      'Global community network'
    ]
  }
]

export function FeatureMap() {
  const [selectedFeature, setSelectedFeature] = useState<any>(null)
  const [activeView, setActiveView] = useState('overview')

  const FeatureNode = ({ feature, category }: { feature: any, category: any }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary/50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                <feature.icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-sm">{feature.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant={feature.status === 'complete' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {feature.status === 'complete' ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {feature.status}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground line-clamp-2">
              {feature.description}
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
              <feature.icon className="h-5 w-5 text-white" />
            </div>
            {feature.name}
          </DialogTitle>
          <DialogDescription>
            {feature.description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Key Features</h4>
            <div className="grid gap-2 md:grid-cols-2">
              {feature.subFeatures.map((subFeature: string) => (
                <div key={subFeature} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {subFeature}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 pt-4 border-t">
            <Button asChild>
              <Link to={feature.href}>
                <ArrowRight className="h-4 w-4 mr-2" />
                Explore Feature
              </Link>
            </Button>
            <Badge variant="outline">
              Status: {feature.status}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  const CategorySection = ({ categoryKey, category }: { categoryKey: string, category: any }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 ${category.color} rounded-full`} />
        <h3 className="text-lg font-semibold">{category.title}</h3>
        <Badge variant="secondary">{category.features.length} features</Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {category.features.map((feature) => (
          <FeatureNode key={feature.id} feature={feature} category={category} />
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">ApolloRise Feature Map</h2>
        <p className="text-muted-foreground">
          Comprehensive overview of Orlando's Tech Connect 2.0 Platform
        </p>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {Object.entries(featureCategories).map(([key, category]) => (
            <CategorySection key={key} categoryKey={key} category={category} />
          ))}
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {technicalFeatures.map((section) => (
              <Card key={section.category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <div className="space-y-6">
            {roadmapItems.map((phase, index) => (
              <Card key={phase.phase} className={`border-l-4 ${
                phase.status === 'complete' ? 'border-l-green-500' :
                phase.status === 'in-progress' ? 'border-l-blue-500' :
                'border-l-gray-300'
              }`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {phase.status === 'complete' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : phase.status === 'in-progress' ? (
                      <Clock className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-gray-400" />
                    )}
                    {phase.phase}
                    <Badge 
                      variant={
                        phase.status === 'complete' ? 'default' :
                        phase.status === 'in-progress' ? 'secondary' :
                        'outline'
                      }
                    >
                      {phase.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 md:grid-cols-2">
                    {phase.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm">
                        {phase.status === 'complete' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : phase.status === 'in-progress' ? (
                          <Clock className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-gray-400" />
                        )}
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">9</p>
                    <p className="text-xs text-muted-foreground">Core Features</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">100%</p>
                    <p className="text-xs text-muted-foreground">Feature Complete</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">6</p>
                    <p className="text-xs text-muted-foreground">Feature Categories</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">35+</p>
                    <p className="text-xs text-muted-foreground">Sub-features</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Feature Distribution</CardTitle>
                <CardDescription>Features by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(featureCategories).map(([key, category]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${category.color} rounded-full`} />
                      <span className="text-sm">{category.title}</span>
                    </div>
                    <Badge variant="secondary">{category.features.length}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Development Status</CardTitle>
                <CardDescription>Current implementation status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Complete</span>
                  </div>
                  <Badge variant="default">9 features</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">In Progress</span>
                  </div>
                  <Badge variant="secondary">0 features</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Planned</span>
                  </div>
                  <Badge variant="outline">0 features</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}