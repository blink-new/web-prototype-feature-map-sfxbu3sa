import { useState } from 'react'
import { 
  Users, 
  Search, 
  Filter, 
  MapPin, 
  Building2, 
  Mail, 
  Phone,
  Globe,
  Star,
  MessageSquare,
  UserPlus,
  Award,
  Briefcase
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

const communityMembers = [
  {
    id: 1,
    name: 'Alex Chen',
    title: 'Startup Founder',
    company: 'TechVenture Inc.',
    location: 'Orlando, FL',
    avatar: '/api/placeholder/40/40',
    skills: ['React', 'Node.js', 'Product Management'],
    rating: 4.9,
    connections: 234,
    verified: true,
    type: 'founder'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    title: 'Senior Developer',
    company: 'Microsoft',
    location: 'Orlando, FL',
    avatar: '/api/placeholder/40/40',
    skills: ['Python', 'Machine Learning', 'Cloud Architecture'],
    rating: 4.8,
    connections: 189,
    verified: true,
    type: 'developer'
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    title: 'Investment Partner',
    company: 'Orlando Ventures',
    location: 'Orlando, FL',
    avatar: '/api/placeholder/40/40',
    skills: ['Venture Capital', 'Due Diligence', 'Portfolio Management'],
    rating: 4.7,
    connections: 456,
    verified: true,
    type: 'investor'
  },
  {
    id: 4,
    name: 'Dr. Emily Watson',
    title: 'Research Director',
    company: 'UCF Innovation Lab',
    location: 'Orlando, FL',
    avatar: '/api/placeholder/40/40',
    skills: ['AI Research', 'Data Science', 'Academic Partnerships'],
    rating: 4.9,
    connections: 312,
    verified: true,
    type: 'researcher'
  },
  {
    id: 5,
    name: 'David Kim',
    title: 'UX Designer',
    company: 'Design Studio',
    location: 'Orlando, FL',
    avatar: '/api/placeholder/40/40',
    skills: ['UI/UX Design', 'Figma', 'User Research'],
    rating: 4.6,
    connections: 167,
    verified: false,
    type: 'designer'
  },
  {
    id: 6,
    name: 'Lisa Thompson',
    title: 'Marketing Director',
    company: 'Growth Agency',
    location: 'Orlando, FL',
    avatar: '/api/placeholder/40/40',
    skills: ['Digital Marketing', 'Growth Hacking', 'Analytics'],
    rating: 4.8,
    connections: 298,
    verified: true,
    type: 'marketer'
  }
]

const organizations = [
  {
    id: 1,
    name: 'Orlando Tech Association',
    type: 'Community',
    members: 1247,
    description: 'The largest tech community in Central Florida',
    logo: '/api/placeholder/60/60'
  },
  {
    id: 2,
    name: 'UCF Innovation Lab',
    type: 'Research',
    members: 89,
    description: 'University research and development center',
    logo: '/api/placeholder/60/60'
  },
  {
    id: 3,
    name: 'Orlando Ventures',
    type: 'Investment',
    members: 23,
    description: 'Early-stage venture capital fund',
    logo: '/api/placeholder/60/60'
  },
  {
    id: 4,
    name: 'Startup Orlando',
    type: 'Incubator',
    members: 156,
    description: 'Supporting local entrepreneurs and startups',
    logo: '/api/placeholder/60/60'
  }
]

const typeColors = {
  founder: 'bg-purple-100 text-purple-700',
  developer: 'bg-blue-100 text-blue-700',
  investor: 'bg-green-100 text-green-700',
  researcher: 'bg-orange-100 text-orange-700',
  designer: 'bg-pink-100 text-pink-700',
  marketer: 'bg-yellow-100 text-yellow-700'
}

export function CommunityDirectory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [activeTab, setActiveTab] = useState('members')

  const filteredMembers = communityMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = filterType === 'all' || member.type === filterType
    return matchesSearch && matchesType
  })

  const MemberCard = ({ member }: { member: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={member.avatar} />
            <AvatarFallback>{member.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{member.name}</CardTitle>
              {member.verified && (
                <Award className="h-4 w-4 text-blue-500" />
              )}
            </div>
            <CardDescription>{member.title}</CardDescription>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Building2 className="h-3 w-3" />
              {member.company}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {member.location}
            </div>
          </div>
          <Badge className={typeColors[member.type as keyof typeof typeColors]}>
            {member.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{member.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{member.connections} connections</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {member.skills.slice(0, 3).map((skill: string) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {member.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{member.skills.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1">
            <MessageSquare className="h-4 w-4 mr-1" />
            Message
          </Button>
          <Button size="sm" className="flex-1">
            <UserPlus className="h-4 w-4 mr-1" />
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const OrganizationCard = ({ org }: { org: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={org.logo} />
            <AvatarFallback>{org.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{org.name}</CardTitle>
            <CardDescription>{org.description}</CardDescription>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <Badge variant="secondary">{org.type}</Badge>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {org.members} members
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button className="w-full">
          <UserPlus className="h-4 w-4 mr-2" />
          Join Organization
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community Directory</h1>
          <p className="text-muted-foreground">
            Connect with Orlando's tech innovators and organizations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{communityMembers.length} Members</Badge>
          <Badge variant="secondary">{organizations.length} Organizations</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">2,847</p>
                <p className="text-xs text-muted-foreground">Active Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Organizations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-xs text-muted-foreground">Connections Made</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-xs text-muted-foreground">Avg Rating</p>
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
              placeholder="Search members, companies, or skills..."
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
              <SelectItem value="founder">Founders</SelectItem>
              <SelectItem value="developer">Developers</SelectItem>
              <SelectItem value="investor">Investors</SelectItem>
              <SelectItem value="researcher">Researchers</SelectItem>
              <SelectItem value="designer">Designers</SelectItem>
              <SelectItem value="marketer">Marketers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {filteredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="organizations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {organizations.map((org) => (
              <OrganizationCard key={org.id} org={org} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Featured Members
              </CardTitle>
              <CardDescription>
                Top contributors to Orlando's tech ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {communityMembers.filter(m => m.verified).slice(0, 4).map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}