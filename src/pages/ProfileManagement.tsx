import { User, Edit, Camera, Award, Briefcase, GraduationCap, MapPin, Crown, Zap, Lock, Network, Target, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Label } from '../components/ui/label'

export function ProfileManagement() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Management</h1>
        <p className="text-muted-foreground">
          Manage your professional profile and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="relative mx-auto">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/api/placeholder/96/96" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle className="flex items-center justify-center gap-2">
                Yurii Kapkov
                <Badge variant="outline" className="text-xs bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 text-amber-700">
                  <Crown className="h-3 w-3 mr-1" />
                  Free
                </Badge>
              </CardTitle>
              <CardDescription>ApolloRise Founder & Tech Visionary</CardDescription>
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-2">
                <MapPin className="h-3 w-3" />
                Orlando, FL
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Profile Completion</span>
                <Badge variant="secondary">85%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Network Connections</span>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary">234</Badge>
                  <span className="text-xs text-muted-foreground">/500</span>
                  <Lock className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Community Level</span>
                <Badge variant="secondary">Level 5</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Matches</span>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary">12</Badge>
                  <span className="text-xs text-muted-foreground">/∞</span>
                  <Lock className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
              
              {/* Subtle upgrade prompt */}
              <div className="pt-2 border-t border-border">
                <Button variant="outline" size="sm" className="w-full text-xs bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 hover:from-primary/10 hover:to-accent/10">
                  <Zap className="h-3 w-3 mr-1" />
                  Unlock Premium Features
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Yurii" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Kapkov" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="yurii.kapkov@apollorise.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell us about yourself..."
                      defaultValue="Visionary founder of ApolloRise, building the next generation of tech innovation platforms. Passionate about connecting Orlando's brightest minds and fostering collaborative growth in our thriving ecosystem."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="Orlando, FL" />
                  </div>
                  <Button>
                    <Edit className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="professional" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Professional Information
                  </CardTitle>
                  <CardDescription>
                    Your work experience and current role
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Current Title</Label>
                    <Input id="title" defaultValue="Founder & CEO" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="ApolloRise" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" defaultValue="Innovation Platform Technology" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input id="experience" defaultValue="8" />
                  </div>
                  <Button>
                    <Edit className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Skills & Expertise
                  </CardTitle>
                  <CardDescription>
                    Showcase your technical and professional skills
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Technical Skills</Label>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL'].map((skill) => (
                        <Badge key={skill} variant="secondary" className="cursor-pointer">
                          {skill} ×
                        </Badge>
                      ))}
                    </div>
                    <Input placeholder="Add technical skill..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Professional Skills</Label>
                    <div className="flex flex-wrap gap-2">
                      {['Product Management', 'Team Leadership', 'Strategic Planning', 'Fundraising'].map((skill) => (
                        <Badge key={skill} variant="outline" className="cursor-pointer">
                          {skill} ×
                        </Badge>
                      ))}
                    </div>
                    <Input placeholder="Add professional skill..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Interests</Label>
                    <div className="flex flex-wrap gap-2">
                      {['AI/ML', 'Blockchain', 'Sustainability', 'EdTech'].map((interest) => (
                        <Badge key={interest} variant="outline" className="cursor-pointer">
                          {interest} ×
                        </Badge>
                      ))}
                    </div>
                    <Input placeholder="Add interest..." />
                  </div>
                  <Button>
                    <Edit className="h-4 w-4 mr-2" />
                    Save Skills
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscription" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    Subscription Plan
                  </CardTitle>
                  <CardDescription>
                    Manage your ApolloRise subscription and unlock premium features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Plan */}
                  <div className="p-4 rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Crown className="h-5 w-5 text-amber-600" />
                        <h3 className="font-semibold text-amber-900">Free Plan</h3>
                      </div>
                      <Badge variant="outline" className="border-amber-300 text-amber-700">
                        Current
                      </Badge>
                    </div>
                    <p className="text-sm text-amber-700 mb-4">
                      You're currently on the free plan with access to basic features.
                    </p>
                    
                    {/* Usage Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-white/50 rounded-lg">
                        <div className="text-lg font-bold text-amber-900">234/500</div>
                        <div className="text-xs text-amber-700">Network Connections</div>
                      </div>
                      <div className="text-center p-3 bg-white/50 rounded-lg">
                        <div className="text-lg font-bold text-amber-900">12/25</div>
                        <div className="text-xs text-amber-700">AI Matches/Month</div>
                      </div>
                    </div>
                  </div>

                  {/* Premium Features */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Unlock with Premium
                    </h4>
                    <div className="grid gap-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-muted">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Network className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">Unlimited Network Connections</div>
                          <div className="text-xs text-muted-foreground">Connect with unlimited professionals</div>
                        </div>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-muted">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Target className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">Advanced AI Matching</div>
                          <div className="text-xs text-muted-foreground">Unlimited AI-powered connections</div>
                        </div>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-muted">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <BarChart3 className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">Advanced Analytics</div>
                          <div className="text-xs text-muted-foreground">Detailed insights and reports</div>
                        </div>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-muted">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Award className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">Priority Support</div>
                          <div className="text-xs text-muted-foreground">Get help faster with priority support</div>
                        </div>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Upgrade Button */}
                  <div className="pt-4 border-t border-border">
                    <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                      <Zap className="h-4 w-4 mr-2" />
                      Upgrade to Premium - $19/month
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Cancel anytime. 14-day free trial included.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Platform Preferences
                  </CardTitle>
                  <CardDescription>
                    Customize your ApolloRise experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Notification Preferences</Label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Email notifications for new matches</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Event reminders</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="text-sm">Weekly ecosystem digest</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Privacy Settings</Label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Show profile in directory</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Allow AI matching</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="text-sm">Show activity status</span>
                      </label>
                    </div>
                  </div>
                  <Button>
                    <Edit className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}