import { useState } from 'react'
import { 
  Target, 
  Sparkles, 
  Users, 
  Briefcase, 
  Heart,
  Filter,
  Search,
  MessageSquare,
  Star,
  Clock,
  CheckCircle,
  X,
  Gift,
  Banknote,
  GraduationCap,
  Brain,
  TrendingUp,
  Zap,
  Award,
  ChevronRight,
  Building2,
  MapPin,
  DollarSign
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Progress } from '../components/ui/progress'

const aiMatches = [
  // Job Opportunities
  {
    id: 1,
    type: 'job',
    category: 'full-time',
    title: 'Senior Full Stack Developer',
    organization: 'TechCorp',
    avatar: '/api/placeholder/40/40',
    matchScore: 95,
    skills: ['React', 'Node.js', 'AWS'],
    description: 'Perfect match for your React and AWS expertise! Join our growing team.',
    location: 'Orlando, FL',
    value: '$120k - $150k',
    timePosted: '2 hours ago',
    status: 'new',
    aiReason: 'Your React and AWS skills are exactly what they need, plus 95% salary match'
  },
  // Grant Opportunities
  {
    id: 2,
    type: 'grant',
    category: 'federal',
    title: 'SBIR Phase II Grant',
    organization: 'National Science Foundation',
    avatar: '/api/placeholder/40/40',
    matchScore: 92,
    skills: ['AI/ML', 'Innovation', 'Research'],
    description: 'Your AI/ML background aligns perfectly with current SBIR priorities.',
    location: 'Nationwide',
    value: 'Up to $1.7M',
    timePosted: '4 hours ago',
    status: 'recommended',
    deadline: '45 days',
    aiReason: 'Your AI research history and patent applications make you a strong candidate'
  },
  // Special Offers
  {
    id: 3,
    type: 'offer',
    category: 'credits',
    title: 'AWS Credits for Startups',
    organization: 'Amazon Web Services',
    avatar: '/api/placeholder/40/40',
    matchScore: 96,
    skills: ['Cloud Computing', 'Startup', 'AWS'],
    description: 'Perfect for your cloud infrastructure needs - apply now!',
    location: 'Global',
    value: 'Up to $100k Credits',
    timePosted: '1 day ago',
    status: 'urgent',
    expires: '30 days',
    aiReason: 'Your current AWS usage patterns indicate you could maximize these credits'
  },
  // Financing
  {
    id: 4,
    type: 'financing',
    category: 'venture-capital',
    title: 'Series A Funding Round',
    organization: 'Venture Capital Partners',
    avatar: '/api/placeholder/40/40',
    matchScore: 88,
    skills: ['SaaS', 'B2B', 'Scalable Business'],
    description: 'Your SaaS metrics align with their investment criteria.',
    location: 'Orlando, FL',
    value: '$2M - $10M',
    timePosted: '2 days ago',
    status: 'interested',
    stage: 'Series A',
    aiReason: 'Your MRR growth and customer retention rates match their portfolio criteria'
  },
  // Mentor Services
  {
    id: 5,
    type: 'mentor',
    category: 'technical',
    title: 'Technical Architecture Review',
    organization: 'Sarah Chen - Former CTO',
    avatar: '/api/placeholder/40/40',
    matchScore: 91,
    skills: ['System Architecture', 'Scaling', 'Technical Leadership'],
    description: 'Perfect timing for your scaling challenges - highly recommended!',
    location: 'Remote',
    value: '$200/hour',
    timePosted: '3 days ago',
    status: 'new',
    rating: 4.9,
    sessions: 127,
    aiReason: 'Your current scaling challenges match her expertise in distributed systems'
  },
  // Collaboration
  {
    id: 6,
    type: 'collaboration',
    category: 'partnership',
    title: 'Co-founder Opportunity',
    organization: 'FinTech Solutions',
    avatar: '/api/placeholder/40/40',
    matchScore: 85,
    skills: ['Technical Leadership', 'Full-Stack', 'Team Building'],
    description: 'Seeking technical co-founder for revolutionary payment platform.',
    location: 'Remote',
    value: 'Equity + Salary',
    timePosted: '1 week ago',
    status: 'pending',
    aiReason: 'Your fintech experience and leadership skills are exactly what they need'
  }
]

const typeConfig = {
  job: {
    icon: Briefcase,
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    label: 'Job'
  },
  grant: {
    icon: Gift,
    color: 'bg-green-100 text-green-700 border-green-200',
    label: 'Grant'
  },
  offer: {
    icon: Star,
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    label: 'Special Offer'
  },
  financing: {
    icon: Banknote,
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    label: 'Financing'
  },
  mentor: {
    icon: GraduationCap,
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    label: 'Mentor'
  },
  collaboration: {
    icon: Users,
    color: 'bg-pink-100 text-pink-700 border-pink-200',
    label: 'Collaboration'
  }
}

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  recommended: 'bg-green-100 text-green-700',
  urgent: 'bg-red-100 text-red-700',
  interested: 'bg-purple-100 text-purple-700',
  pending: 'bg-yellow-100 text-yellow-700',
  declined: 'bg-gray-100 text-gray-700'
}

export function MatchmakingHub() {
  const [selectedMatch, setSelectedMatch] = useState<any>(null)
  const [filterType, setFilterType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('matches')

  const filteredMatches = aiMatches.filter(match => {
    const matchesType = filterType === 'all' || match.type === filterType
    const matchesSearch = match.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         match.organization.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const topMatches = aiMatches
    .filter(match => match.matchScore >= 90)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3)

  const MatchCard = ({ match }: { match: any }) => {
    const TypeIcon = typeConfig[match.type as keyof typeof typeConfig].icon
    
    return (
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/50 border-l-4 border-l-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={match.avatar} />
                <AvatarFallback>{match.organization[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TypeIcon className="h-4 w-4 text-primary" />
                  <Badge className={typeConfig[match.type as keyof typeof typeConfig].color}>
                    {typeConfig[match.type as keyof typeof typeConfig].label}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{match.title}</CardTitle>
                <CardDescription>{match.organization}</CardDescription>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className={statusColors[match.status as keyof typeof statusColors]}>
                {match.status}
              </Badge>
              {match.matchScore >= 90 && (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <Target className="h-3 w-3 mr-1" />
                  {match.matchScore}%
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* AI Match Score */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI Match Analysis</span>
              <Progress value={match.matchScore} className="flex-1 h-2" />
              <span className="text-sm font-bold text-primary">{match.matchScore}%</span>
            </div>
            <p className="text-xs text-blue-600">{match.aiReason}</p>
          </div>
          
          <p className="text-sm text-muted-foreground">{match.description}</p>
          
          {/* Location and Value */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {match.location}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {match.value}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {match.timePosted}
            </div>
          </div>
          
          {/* Type-specific info */}
          {match.type === 'grant' && match.deadline && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-3 w-3 text-orange-500" />
              <span className="text-orange-600 font-medium">Deadline: {match.deadline}</span>
            </div>
          )}
          
          {match.type === 'offer' && match.expires && (
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-3 w-3 text-red-500" />
              <span className="text-red-600 font-medium">Expires in: {match.expires}</span>
            </div>
          )}
          
          {match.type === 'financing' && match.stage && (
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-600 font-medium">Stage: {match.stage}</span>
            </div>
          )}
          
          {match.type === 'mentor' && match.rating && (
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{match.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{match.sessions} sessions</span>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-1">
            {match.skills.map((skill: string) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              AI Recommended
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <X className="h-4 w-4 mr-1" />
                Pass
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Heart className="h-4 w-4 mr-1" />
                Interested
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Matchmaking Hub</h1>
          <p className="text-muted-foreground">
            Intelligent matching across jobs, grants, offers, financing, and mentorship
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Brain className="h-3 w-3" />
            AI Powered
          </Badge>
          <Button>
            <Target className="h-4 w-4 mr-2" />
            Update Preferences
          </Button>
        </div>
      </div>

      {/* Top AI Recommendations */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Top AI Recommendations</CardTitle>
          </div>
          <CardDescription>
            Highest matching opportunities based on your profile and goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {topMatches.map((match) => {
              const TypeIcon = typeConfig[match.type as keyof typeof typeConfig].icon
              return (
                <div key={match.id} className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-white/50 hover:bg-white/90 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <TypeIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{match.title}</h4>
                      <p className="text-xs text-muted-foreground truncate">{match.organization}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={match.matchScore} className="flex-1 h-1" />
                        <span className="text-xs font-medium text-primary">{match.matchScore}%</span>
                      </div>
                      <p className="text-xs text-blue-600 mt-1 line-clamp-2">{match.aiReason}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">47</p>
                <p className="text-xs text-muted-foreground">Total Matches</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">18</p>
                <p className="text-xs text-muted-foreground">Job Matches</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Grant Matches</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Special Offers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Banknote className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-muted-foreground">Funding Options</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-muted-foreground">Mentor Matches</p>
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
              placeholder="Search matches by title, organization, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="job">Jobs</SelectItem>
              <SelectItem value="grant">Grants</SelectItem>
              <SelectItem value="offer">Special Offers</SelectItem>
              <SelectItem value="financing">Financing</SelectItem>
              <SelectItem value="mentor">Mentors</SelectItem>
              <SelectItem value="collaboration">Collaboration</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="matches">AI Matches</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Active Conversations
              </CardTitle>
              <CardDescription>
                Ongoing discussions with your matches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'TechCorp - Senior Developer', type: 'job', messages: 3, time: '2 hours ago' },
                  { name: 'NSF - SBIR Grant', type: 'grant', messages: 1, time: '1 day ago' },
                  { name: 'AWS Credits Program', type: 'offer', messages: 2, time: '3 days ago' }
                ].map((conv, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <Avatar>
                      <AvatarFallback>{conv.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{conv.name}</p>
                      <p className="text-sm text-muted-foreground">Last message: {conv.time}</p>
                    </div>
                    <Badge variant="secondary">{conv.messages} new</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Match Preferences</CardTitle>
                <CardDescription>
                  Customize your AI matching criteria
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferred Opportunity Types</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(typeConfig).map(([type, config]) => (
                      <Badge key={type} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                        <config.icon className="h-3 w-3 mr-1" />
                        {config.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Skills & Interests</label>
                  <Input placeholder="Add skills, technologies, or interests..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Experience Level</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
                      <SelectItem value="senior">Senior (6+ years)</SelectItem>
                      <SelectItem value="executive">Executive/Leadership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location Preferences</label>
                  <Input placeholder="Orlando, FL or Remote" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Control how you receive match notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">High-quality matches (90%+)</p>
                    <p className="text-sm text-muted-foreground">Immediate notifications</p>
                  </div>
                  <Badge variant="secondary">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Good matches (80-89%)</p>
                    <p className="text-sm text-muted-foreground">Daily digest</p>
                  </div>
                  <Badge variant="secondary">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Potential matches (70-79%)</p>
                    <p className="text-sm text-muted-foreground">Weekly summary</p>
                  </div>
                  <Badge variant="outline">Disabled</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>AI Profile Analysis</CardTitle>
                <CardDescription>
                  How the AI understands your profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Technical Skills</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Leadership Experience</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Network Strength</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Market Readiness</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <Button className="w-full mt-4">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Improve AI Understanding
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Match Quality Trends</CardTitle>
                <CardDescription>
                  Your matching performance over time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-700">This Week</p>
                    <p className="text-sm text-green-600">12 high-quality matches</p>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-700">Average Match Score</p>
                    <p className="text-sm text-blue-600">87% (↑5% from last week)</p>
                  </div>
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium text-purple-700">Response Rate</p>
                    <p className="text-sm text-purple-600">73% (above average)</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}