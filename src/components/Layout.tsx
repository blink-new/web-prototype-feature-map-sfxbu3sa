import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Network, 
  Users, 
  Briefcase, 
  Calendar, 
  BarChart3, 
  User, 
  Settings,
  Menu,
  X,
  Zap,
  Target,
  MessageCircle,
  Trophy,
  BookOpen
} from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Badge } from './ui/badge'
import { MessagingPanel } from './MessagingPanel'
import OrlandoAI from './OrlandoAI'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Ecosystem Map', href: '/ecosystem', icon: Network },
  { name: 'AI Matchmaking', href: '/matchmaking', icon: Target },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Opportunities', href: '/opportunities', icon: Briefcase },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Resources', href: '/resources', icon: BookOpen },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Rewards', href: '/rewards', icon: Trophy },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [messagingOpen, setMessagingOpen] = useState(false)
  const location = useLocation()

  const NavItems = () => (
    <>
      {navigation.map((item) => {
        const isActive = location.pathname === item.href
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        )
      })}
    </>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-card border-r border-border">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">ApolloRise</h1>
                <p className="text-xs text-muted-foreground">Tech Connect 2.0</p>
              </div>
            </div>
            <Badge variant="secondary" className="ml-auto text-xs">
              Orlando
            </Badge>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            <NavItems />
          </nav>
          <div className="p-4 border-t border-border space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setMessagingOpen(true)}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Messages
              <Badge variant="destructive" className="ml-auto text-xs">
                8
              </Badge>
            </Button>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Yurii Kapkov</p>
                <p className="text-xs text-muted-foreground truncate">ApolloRise Founder</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">ApolloRise</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMessagingOpen(true)}
              className="relative"
            >
              <MessageCircle className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs">
                8
              </Badge>
            </Button>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold">ApolloRise</h1>
                      <p className="text-xs text-muted-foreground">Tech Connect 2.0</p>
                    </div>
                  </div>
                  <nav className="flex-1 px-4 py-4 space-y-1">
                    <NavItems />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        <main className="h-full overflow-auto">
          {children}
        </main>
      </div>

      {/* Messaging Panel */}
      <MessagingPanel 
        isOpen={messagingOpen} 
        onClose={() => setMessagingOpen(false)} 
      />

      {/* Orlando AI Assistant */}
      <OrlandoAI />
    </div>
  )
}