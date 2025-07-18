import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Rocket, 
  Users, 
  Brain, 
  Network, 
  Trophy, 
  Zap, 
  Globe, 
  Shield,
  ArrowRight,
  Star,
  Target,
  Lightbulb
} from 'lucide-react'

interface WelcomePageProps {
  onGetStarted: () => void
}

export function WelcomePage({ onGetStarted }: WelcomePageProps) {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matchmaking",
      description: "Smart connections based on skills, interests, and goals",
      color: "text-blue-500"
    },
    {
      icon: Network,
      title: "Interactive Ecosystem Map",
      description: "Visualize Orlando's entire tech community network",
      color: "text-purple-500"
    },
    {
      icon: Trophy,
      title: "Gamified Challenges",
      description: "Earn XP, badges, and rewards through community engagement",
      color: "text-amber-500"
    },
    {
      icon: Shield,
      title: "Blockchain Verified",
      description: "Secure, verifiable credentials and achievements",
      color: "text-green-500"
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "Connect startups, corporations, investors, and researchers",
      color: "text-indigo-500"
    },
    {
      icon: Zap,
      title: "Real-time Collaboration",
      description: "Live project spaces and instant communication",
      color: "text-orange-500"
    }
  ]

  const stats = [
    { label: "Active Members", value: "2,500+", icon: Users },
    { label: "Connections Made", value: "15,000+", icon: Network },
    { label: "Projects Launched", value: "450+", icon: Rocket },
    { label: "Success Rate", value: "89%", icon: Target }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 border-blue-200">
                <Rocket className="h-4 w-4 mr-2" />
                Orlando's Premier Tech Ecosystem
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ApolloRise
              </span>
              <br />
              <span className="text-3xl md:text-4xl font-medium text-gray-700">
                Tech Connect 2.0
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The comprehensive innovation ecosystem platform connecting Orlando's 
              <span className="font-semibold text-blue-600"> startups</span>, 
              <span className="font-semibold text-purple-600"> corporations</span>, 
              <span className="font-semibold text-green-600"> investors</span>, and 
              <span className="font-semibold text-orange-600"> researchers</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={onGetStarted}
                size="lg" 
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Explore the Ecosystem
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50"
              >
                <Globe className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powered by Innovation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of tech community collaboration with cutting-edge features 
              designed to accelerate Orlando's innovation ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-xl bg-gray-100 group-hover:bg-gray-200 transition-colors ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Orlando's Tech Scene?
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of innovators, entrepreneurs, and visionaries building the future together. 
            Your next breakthrough connection is just one click away.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onGetStarted}
              size="lg" 
              variant="secondary"
              className="px-8 py-4 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
            >
              <Lightbulb className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">ApolloRise Tech Connect 2.0</h3>
            <p className="text-gray-400 mb-6">
              Empowering Orlando's innovation ecosystem through intelligent connections and collaborative growth
            </p>
            <div className="flex justify-center space-x-6 text-gray-400">
              <span>© 2024 ApolloRise Platform</span>
              <span>•</span>
              <span>Orlando, FL</span>
              <span>•</span>
              <span>Built for Innovation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}