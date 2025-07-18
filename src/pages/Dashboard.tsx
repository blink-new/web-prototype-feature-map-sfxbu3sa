import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Network, 
  Zap,
  Target,
  Award,
  MessageSquare,
  ArrowRight,
  Activity,
  Crown,
  Heart,
  Sparkles
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Link } from 'react-router-dom'

const stats = [
  {
    title: 'Active Members',
    value: '2,847',
    change: '+12%',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Open Opportunities',
    value: '156',
    change: '+8%',
    icon: Briefcase,
    color: 'text-green-600'
  },
  {
    title: 'Upcoming Events',
    value: '23',
    change: '+15%',
    icon: Calendar,
    color: 'text-purple-600'
  },
  {
    title: 'AI Matches Made',
    value: '1,234',
    change: '+25%',
    icon: Target,
    color: 'text-orange-600'
  }
]

const recentActivity = [
  {
    type: 'match',
    title: 'New AI Match Found',
    description: 'TechCorp is looking for blockchain developers',
    time: '2 minutes ago',
    icon: Target,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    type: 'event',
    title: 'Orlando Tech Meetup',
    description: 'Starting in 2 hours at Innovation District',
    time: '5 minutes ago',
    icon: Calendar,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    type: 'opportunity',
    title: 'New Startup Opportunity',
    description: 'FinTech startup seeking co-founder',
    time: '10 minutes ago',
    icon: Briefcase,
    color: 'bg-green-100 text-green-600'
  },
  {
    type: 'achievement',
    title: 'Achievement Unlocked',
    description: 'Community Connector - Made 10 introductions',
    time: '1 hour ago',
    icon: Award,
    color: 'bg-yellow-100 text-yellow-600'
  }
]

const quickActions = [
  {
    title: 'Find AI Matches',
    description: 'Discover relevant connections',
    href: '/matchmaking',
    icon: Target,
    color: 'bg-orange-500'
  },
  {
    title: 'Explore Ecosystem',
    description: 'View network visualization',
    href: '/ecosystem',
    icon: Network,
    color: 'bg-blue-500'
  },
  {
    title: 'Browse Opportunities',
    description: 'Find jobs and projects',
    href: '/opportunities',
    icon: Briefcase,
    color: 'bg-green-500'
  },
  {
    title: 'Join Events',
    description: 'Attend community events',
    href: '/events',
    icon: Calendar,
    color: 'bg-purple-500'
  }
]

export function Dashboard() {
  return (
    <div className="space-y-0">
      {/* Welcome Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 border-b">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-orange-500/10 opacity-50" />
        <div className="relative px-6 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Heart className="h-5 w-5" />
                <span className="text-sm font-medium">Welcome to Orlando's Tech Community</span>
                <Heart className="h-5 w-5" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Orlando's Hub for<br />Technology + Innovation
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with your community, discover opportunities, and be part of Orlando's thriving tech ecosystem
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/community">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-8">
                  <Users className="mr-2 h-5 w-5" />
                  Join the Community
                </Button>
              </Link>
              <Link to="/ecosystem">
                <Button size="lg" variant="outline" className="px-8 border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Network className="mr-2 h-5 w-5" />
                  Explore Ecosystem
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>2,847+ Members</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>156 Opportunities</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>23 Events</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6 space-y-6">
        {/* User Status Bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back, Yurii!</h2>
            <p className="text-muted-foreground">
              Here's what's happening in Orlando's tech ecosystem today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Activity className="h-3 w-3" />
              Online
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Award className="h-3 w-3" />
              Level 5 Connector
            </Badge>
            <Link to="/rewards">
              <Badge variant="default" className="gap-1 cursor-pointer hover:bg-primary/90">
                <Target className="h-3 w-3" />
                2,847 XP
              </Badge>
            </Link>
            <Link to="/profile">
              <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-muted bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 text-amber-700">
                <Crown className="h-3 w-3" />
                Free Plan
              </Badge>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Gamification Card */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Your Progress
                </CardTitle>
                <CardDescription>
                  Level up and earn rewards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 flex flex-col">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Level 5 → Level 6</span>
                    <span>2,847/3,000 XP</span>
                  </div>
                  <Progress value={94.9} className="h-3" />
                  <div className="text-xs text-center text-muted-foreground">
                    153 XP to next level
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-purple-600">12</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-blue-600">#23</div>
                    <div className="text-xs text-muted-foreground">Rank</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-2 bg-white/50 rounded-lg">
                    <div className="text-sm font-bold text-green-600">47</div>
                    <div className="text-xs text-muted-foreground">Connections</div>
                  </div>
                  <div className="p-2 bg-white/50 rounded-lg">
                    <div className="text-sm font-bold text-orange-600">8</div>
                    <div className="text-xs text-muted-foreground">Achievements</div>
                  </div>
                </div>
                <div className="mt-auto">
                  <Link to="/rewards">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      View Rewards
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Jump into key platform features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action) => (
                  <Link key={action.title} to={action.href}>
                    <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors cursor-pointer">
                      <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{action.title}</p>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest updates from your network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Impact</CardTitle>
              <CardDescription>Track your community contributions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Connections Made</span>
                  <span>47/50</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Events Attended</span>
                  <span>12/15</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Opportunities Shared</span>
                  <span>8/10</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ecosystem Health</CardTitle>
              <CardDescription>Orlando tech community metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Network Growth</span>
                <Badge variant="secondary">+15% this month</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Collaborations</span>
                <Badge variant="secondary">234 ongoing</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Success Stories</span>
                <Badge variant="secondary">18 this quarter</Badge>
              </div>
              <Button className="w-full mt-4" asChild>
                <Link to="/analytics">
                  View Full Analytics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}