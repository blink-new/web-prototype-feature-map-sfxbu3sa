import { useState } from 'react'
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign,
  Building2,
  Star,
  Bookmark,
  ExternalLink,
  Users,
  Gift,
  Banknote,
  GraduationCap,
  Lightbulb,
  Target,
  TrendingUp,
  Award,
  Handshake,
  Zap,
  Brain,
  ChevronRight,
  Heart,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Progress } from '../components/ui/progress'

const opportunities = [
  // Jobs
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'TechCorp',
    type: 'job',
    category: 'full-time',
    location: 'Orlando, FL',
    value: '$120k - $150k',
    posted: '2 days ago',
    skills: ['React', 'Node.js', 'AWS'],
    description: 'Join our growing team to build next-generation web applications.',
    applicants: 23,
    featured: true,
    matchScore: 95,
    aiRecommendation: 'Perfect match for your React and AWS expertise!'
  },
  {
    id: 2,
    title: 'Co-founder & CTO',
    company: 'FinTech Startup',
    type: 'job',
    category: 'equity',
    location: 'Remote',
    value: 'Equity + Salary',
    posted: '1 week ago',
    skills: ['Leadership', 'Blockchain', 'Fintech'],
    description: 'Looking for technical co-founder to revolutionize payments.',
    applicants: 8,
    featured: true,
    matchScore: 78,
    aiRecommendation: 'Great leadership opportunity in emerging fintech space'
  },
  // Grants
  {
    id: 3,
    title: 'Small Business Innovation Research (SBIR)',
    company: 'National Science Foundation',
    type: 'grant',
    category: 'federal',
    location: 'Nationwide',
    value: 'Up to $1.7M',
    posted: '5 days ago',
    skills: ['Innovation', 'Research', 'Technology'],
    description: 'Funding for small businesses to engage in R&D with commercialization potential.',
    applicants: 156,
    featured: true,
    deadline: '45 days',
    matchScore: 88,
    aiRecommendation: 'Your AI/ML background aligns perfectly with current SBIR priorities'
  },
  {
    id: 4,
    title: 'Orlando Economic Partnership Innovation Grant',
    company: 'Orlando Economic Partnership',
    type: 'grant',
    category: 'local',
    location: 'Orlando, FL',
    value: '$50k - $250k',
    posted: '1 week ago',
    skills: ['Local Business', 'Innovation', 'Job Creation'],
    description: 'Supporting innovative companies that create high-wage jobs in Orlando.',
    applicants: 34,
    featured: false,
    deadline: '30 days',
    matchScore: 92,
    aiRecommendation: 'Excellent fit for Orlando-based tech companies like yours'
  },
  // Special Offers
  {
    id: 5,
    title: 'AWS Credits for Startups',
    company: 'Amazon Web Services',
    type: 'offer',
    category: 'credits',
    location: 'Global',
    value: 'Up to $100k Credits',
    posted: '3 days ago',
    skills: ['Cloud Computing', 'Startup'],
    description: 'Free AWS credits, technical support, and training for qualifying startups.',
    applicants: 89,
    featured: true,
    expires: '60 days',
    matchScore: 96,
    aiRecommendation: 'Perfect for your cloud infrastructure needs - apply now!'
  },
  {
    id: 6,
    title: 'Microsoft for Startups Founders Hub',
    company: 'Microsoft',
    type: 'offer',
    category: 'platform',
    location: 'Global',
    value: '$150k+ in Benefits',
    posted: '1 day ago',
    skills: ['Azure', 'AI/ML', 'Startup'],
    description: 'Azure credits, GitHub Enterprise, Microsoft 365, and more for startups.',
    applicants: 67,
    featured: false,
    expires: '90 days',
    matchScore: 85,
    aiRecommendation: 'Great complement to your existing tech stack'
  },
  // Financing
  {
    id: 7,
    title: 'Series A Funding Round',
    company: 'Venture Capital Partners',
    type: 'financing',
    category: 'venture-capital',
    location: 'Orlando, FL',
    value: '$2M - $10M',
    posted: '4 days ago',
    skills: ['SaaS', 'B2B', 'Scalable Business'],
    description: 'Looking for B2B SaaS companies with proven traction and scalable models.',
    applicants: 12,
    featured: true,
    stage: 'Series A',
    matchScore: 82,
    aiRecommendation: 'Your SaaS metrics align with their investment criteria'
  },
  {
    id: 8,
    title: 'Revenue-Based Financing',
    company: 'Growth Capital Fund',
    type: 'financing',
    category: 'alternative',
    location: 'Remote',
    value: '$100k - $2M',
    posted: '6 days ago',
    skills: ['Recurring Revenue', 'Growth Stage'],
    description: 'Non-dilutive funding based on monthly recurring revenue for growing companies.',
    applicants: 28,
    featured: false,
    stage: 'Growth',
    matchScore: 75,
    aiRecommendation: 'Non-dilutive option that preserves equity ownership'
  },
  // Mentor Services
  {
    id: 9,
    title: 'Technical Architecture Review',
    company: 'Sarah Chen - Former CTO at Scale',
    type: 'mentor',
    category: 'technical',
    location: 'Remote',
    value: '$200/hour',
    posted: '2 days ago',
    skills: ['System Architecture', 'Scaling', 'Technical Leadership'],
    description: 'Deep-dive technical reviews and scaling strategies for growing engineering teams.',
    applicants: 15,
    featured: true,
    rating: 4.9,
    sessions: 127,
    matchScore: 91,
    aiRecommendation: 'Perfect timing for your scaling challenges - highly recommended!'
  },
  {
    id: 10,
    title: 'Go-to-Market Strategy',
    company: 'Marcus Rodriguez - VP Marketing',
    type: 'mentor',
    category: 'marketing',
    location: 'Orlando, FL',
    value: '$150/hour',
    posted: '5 days ago',
    skills: ['Product Marketing', 'B2B Sales', 'Growth Strategy'],
    description: 'Help B2B SaaS companies develop and execute winning go-to-market strategies.',
    applicants: 8,
    featured: false,
    rating: 4.8,
    sessions: 89,
    matchScore: 87,
    aiRecommendation: 'Excellent local mentor with B2B SaaS expertise'
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
    label: 'Mentor Service'
  }
}

export function OpportunitiesBoard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [activeTab, setActiveTab] = useState('all')

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = filterType === 'all' || opp.type === filterType
    return matchesSearch && matchesType
  })

  const aiRecommendations = opportunities
    .filter(opp => opp.matchScore >= 85)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3)

  const OpportunityCard = ({ opportunity }: { opportunity: any }) => {
    const TypeIcon = typeConfig[opportunity.type as keyof typeof typeConfig].icon
    
    return (
      <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <TypeIcon className="h-4 w-4 text-primary" />
                <Badge className={typeConfig[opportunity.type as keyof typeof typeConfig].color}>
                  {typeConfig[opportunity.type as keyof typeof typeConfig].label}
                </Badge>
                {opportunity.featured && (
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                )}
                {opportunity.matchScore >= 85 && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <Target className="h-3 w-3 mr-1" />
                    {opportunity.matchScore}% Match
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg mb-1">{opportunity.title}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {opportunity.company}
              </CardDescription>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {opportunity.location}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {opportunity.value}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {opportunity.posted}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{opportunity.description}</p>
          
          {opportunity.aiRecommendation && opportunity.matchScore >= 85 && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-100">
              <div className="flex items-start gap-2">
                <Brain className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-blue-700 mb-1">AI Recommendation</p>
                  <p className="text-xs text-blue-600">{opportunity.aiRecommendation}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-1">
            {opportunity.skills.map((skill: string) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
          
          {/* Type-specific info */}
          {opportunity.type === 'grant' && opportunity.deadline && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-3 w-3 text-orange-500" />
              <span className="text-orange-600 font-medium">Deadline: {opportunity.deadline}</span>
            </div>
          )}
          
          {opportunity.type === 'offer' && opportunity.expires && (
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-3 w-3 text-red-500" />
              <span className="text-red-600 font-medium">Expires in: {opportunity.expires}</span>
            </div>
          )}
          
          {opportunity.type === 'financing' && opportunity.stage && (
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-600 font-medium">Stage: {opportunity.stage}</span>
            </div>
          )}
          
          {opportunity.type === 'mentor' && opportunity.rating && (
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{opportunity.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{opportunity.sessions} sessions</span>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-3 w-3" />
              {opportunity.applicants} {opportunity.type === 'mentor' ? 'bookings' : 'applicants'}
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Bookmark className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <ExternalLink className="h-4 w-4 mr-1" />
                {opportunity.type === 'mentor' ? 'Book' : 'Apply'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Opportunities Hub</h1>
          <p className="text-muted-foreground">
            Jobs, grants, special offers, financing, and mentor services - all in one place
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Lightbulb className="h-4 w-4 mr-2" />
          Post Opportunity
        </Button>
      </div>

      {/* AI Recommendations Section */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">AI-Powered Recommendations</CardTitle>
          </div>
          <CardDescription>
            Based on your profile, skills, and company needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {aiRecommendations.map((rec) => {
              const TypeIcon = typeConfig[rec.type as keyof typeof typeConfig].icon
              return (
                <div key={rec.id} className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-white/50 hover:bg-white/90 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <TypeIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{rec.title}</h4>
                      <p className="text-xs text-muted-foreground truncate">{rec.company}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={rec.matchScore} className="flex-1 h-1" />
                        <span className="text-xs font-medium text-primary">{rec.matchScore}%</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Open Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">43</p>
                <p className="text-xs text-muted-foreground">Active Grants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">28</p>
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
                <p className="text-2xl font-bold">19</p>
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
                <p className="text-2xl font-bold">67</p>
                <p className="text-xs text-muted-foreground">Expert Mentors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search opportunities, companies, or skills..."
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
              <SelectItem value="mentor">Mentor Services</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Opportunities</TabsTrigger>
          <TabsTrigger value="recommended">AI Recommended</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {filteredOpportunities.filter(opp => opp.matchScore >= 85).map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {filteredOpportunities.filter(opp => opp.featured).map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No saved opportunities</h3>
              <p className="text-muted-foreground">Start saving opportunities to view them here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}