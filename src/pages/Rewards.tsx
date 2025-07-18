import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Crown, 
  Medal, 
  Award,
  TrendingUp,
  Users,
  Calendar,
  Briefcase,
  MessageSquare,
  Gift,
  Flame,
  ChevronRight,
  Lock,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'

const userStats = {
  level: 5,
  xp: 2847,
  nextLevelXp: 3000,
  totalXp: 12847,
  streak: 12,
  rank: 23,
  totalUsers: 2847
}

const achievements = [
  {
    id: 1,
    title: 'Community Connector',
    description: 'Made 10 successful introductions',
    icon: Users,
    rarity: 'common',
    xp: 100,
    unlocked: true,
    unlockedAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Event Enthusiast',
    description: 'Attended 5 community events',
    icon: Calendar,
    rarity: 'common',
    xp: 150,
    unlocked: true,
    unlockedAt: '2024-01-20'
  },
  {
    id: 3,
    title: 'Opportunity Hunter',
    description: 'Applied to 20 opportunities',
    icon: Briefcase,
    rarity: 'uncommon',
    xp: 250,
    unlocked: true,
    unlockedAt: '2024-02-01'
  },
  {
    id: 4,
    title: 'Conversation Starter',
    description: 'Started 50 meaningful conversations',
    icon: MessageSquare,
    rarity: 'uncommon',
    xp: 300,
    unlocked: true,
    unlockedAt: '2024-02-10'
  },
  {
    id: 5,
    title: 'Innovation Champion',
    description: 'Shared 10 innovative ideas',
    icon: Zap,
    rarity: 'rare',
    xp: 500,
    unlocked: true,
    unlockedAt: '2024-02-15'
  },
  {
    id: 6,
    title: 'Ecosystem Explorer',
    description: 'Explored all platform features',
    icon: Target,
    rarity: 'rare',
    xp: 750,
    unlocked: false,
    progress: 85
  },
  {
    id: 7,
    title: 'Mentor Master',
    description: 'Mentored 5 community members',
    icon: Crown,
    rarity: 'epic',
    xp: 1000,
    unlocked: false,
    progress: 60
  },
  {
    id: 8,
    title: 'Orlando Legend',
    description: 'Top 1% contributor in Orlando',
    icon: Trophy,
    rarity: 'legendary',
    xp: 2000,
    unlocked: false,
    progress: 23
  }
]

const challenges = [
  {
    id: 1,
    title: 'Weekly Connector',
    description: 'Make 3 new connections this week',
    xp: 150,
    progress: 2,
    target: 3,
    timeLeft: '4 days',
    type: 'weekly'
  },
  {
    id: 2,
    title: 'Event Attendee',
    description: 'Attend 2 events this month',
    xp: 300,
    progress: 1,
    target: 2,
    timeLeft: '18 days',
    type: 'monthly'
  },
  {
    id: 3,
    title: 'Knowledge Sharer',
    description: 'Share 5 opportunities with others',
    xp: 200,
    progress: 3,
    target: 5,
    timeLeft: '25 days',
    type: 'monthly'
  }
]

const leaderboard = [
  { rank: 1, name: 'Sarah Johnson', xp: 15420, avatar: '/api/placeholder/32/32', badge: 'legendary' },
  { rank: 2, name: 'Mike Rodriguez', xp: 14890, avatar: '/api/placeholder/32/32', badge: 'epic' },
  { rank: 3, name: 'Emily Chen', xp: 13750, avatar: '/api/placeholder/32/32', badge: 'epic' },
  { rank: 4, name: 'David Kim', xp: 13200, avatar: '/api/placeholder/32/32', badge: 'rare' },
  { rank: 5, name: 'Lisa Wang', xp: 12950, avatar: '/api/placeholder/32/32', badge: 'rare' },
  { rank: 23, name: 'Yurii Kapkov', xp: 12847, avatar: '/api/placeholder/32/32', badge: 'rare', isCurrentUser: true }
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'text-gray-600 bg-gray-100'
    case 'uncommon': return 'text-green-600 bg-green-100'
    case 'rare': return 'text-blue-600 bg-blue-100'
    case 'epic': return 'text-purple-600 bg-purple-100'
    case 'legendary': return 'text-yellow-600 bg-yellow-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

export function Rewards() {
  const progressToNext = (userStats.xp / userStats.nextLevelXp) * 100

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Rewards & Achievements
          </h1>
          <p className="text-muted-foreground">
            Track your progress and unlock exclusive rewards in the ApolloRise ecosystem
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Flame className="h-3 w-3 text-orange-500" />
            {userStats.streak} day streak
          </Badge>
          <Badge variant="secondary">Rank #{userStats.rank}</Badge>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Level {userStats.level}</div>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-xs">
                <span>{userStats.xp} XP</span>
                <span>{userStats.nextLevelXp} XP</span>
              </div>
              <Progress value={progressToNext} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total XP</CardTitle>
            <Zap className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalXp.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{userStats.xp - userStats.nextLevelXp + 153} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Rank</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{userStats.rank}</div>
            <p className="text-xs text-muted-foreground">
              of {userStats.totalUsers.toLocaleString()} members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.streak} days</div>
            <p className="text-xs text-muted-foreground">
              Personal best: 18 days
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="challenges">Active Challenges</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`relative ${achievement.unlocked ? 'border-green-200 bg-green-50/50' : 'border-gray-200'}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${achievement.unlocked ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {achievement.unlocked ? (
                        <achievement.icon className="h-6 w-6 text-green-600" />
                      ) : (
                        <Lock className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                      {achievement.rarity}
                    </Badge>
                  </div>
                  <div>
                    <CardTitle className="text-base">{achievement.title}</CardTitle>
                    <CardDescription className="text-sm">{achievement.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-yellow-500" />
                      <span className="text-sm font-medium">{achievement.xp} XP</span>
                    </div>
                    {achievement.unlocked ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-xs">Unlocked</span>
                      </div>
                    ) : achievement.progress ? (
                      <div className="text-xs text-muted-foreground">
                        {achievement.progress}% complete
                      </div>
                    ) : (
                      <Lock className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  {!achievement.unlocked && achievement.progress && (
                    <Progress value={achievement.progress} className="h-1 mt-2" />
                  )}
                </CardContent>
                {achievement.unlocked && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="h-6 w-6 text-blue-600" />
                    </div>
                    <Badge variant={challenge.type === 'weekly' ? 'default' : 'secondary'}>
                      {challenge.type}
                    </Badge>
                  </div>
                  <div>
                    <CardTitle className="text-base">{challenge.title}</CardTitle>
                    <CardDescription className="text-sm">{challenge.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{challenge.progress}/{challenge.target}</span>
                    </div>
                    <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-yellow-500" />
                      <span className="text-sm font-medium">{challenge.xp} XP</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{challenge.timeLeft} left</span>
                  </div>
                  <Button size="sm" className="w-full">
                    Continue Challenge
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Community Leaderboard
              </CardTitle>
              <CardDescription>
                Top contributors in the ApolloRise Orlando ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user) => (
                  <div 
                    key={user.rank} 
                    className={`flex items-center gap-4 p-3 rounded-lg ${user.isCurrentUser ? 'bg-blue-50 border border-blue-200' : 'hover:bg-muted'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        user.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        user.rank === 2 ? 'bg-gray-100 text-gray-700' :
                        user.rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {user.rank <= 3 ? (
                          user.rank === 1 ? <Crown className="h-4 w-4" /> :
                          user.rank === 2 ? <Medal className="h-4 w-4" /> :
                          <Award className="h-4 w-4" />
                        ) : (
                          user.rank
                        )}
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{user.name}</p>
                        {user.isCurrentUser && (
                          <Badge variant="outline" className="text-xs">You</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-yellow-500" />
                        <span className="text-sm text-muted-foreground">{user.xp.toLocaleString()} XP</span>
                        <Badge variant="outline" className={`text-xs ${getRarityColor(user.badge)}`}>
                          {user.badge}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}