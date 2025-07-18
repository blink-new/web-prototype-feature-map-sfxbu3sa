import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Bot, 
  Send, 
  Paperclip, 
  X, 
  Minimize2, 
  Maximize2,
  Sparkles,
  Calendar,
  MapPin,
  Users,
  Briefcase,
  GraduationCap,
  Building2
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  attachments?: string[]
}

interface PresetHint {
  id: string
  title: string
  description: string
  icon: React.ElementType
  prompt: string
  category: 'events' | 'opportunities' | 'connections' | 'resources' | 'general'
}

const presetHints: PresetHint[] = [
  {
    id: '1',
    title: 'Find Tech Events',
    description: 'Discover upcoming tech meetups and conferences',
    icon: Calendar,
    prompt: 'What tech events are happening in Orlando this month?',
    category: 'events'
  },
  {
    id: '2',
    title: 'Connect with Startups',
    description: 'Find startups in your industry',
    icon: Users,
    prompt: 'Help me find AI startups in Orlando that I could collaborate with',
    category: 'connections'
  },
  {
    id: '3',
    title: 'Job Opportunities',
    description: 'Explore career opportunities',
    icon: Briefcase,
    prompt: 'What are the best tech job opportunities in Orlando right now?',
    category: 'opportunities'
  },
  {
    id: '4',
    title: 'Innovation Districts',
    description: 'Learn about Orlando\'s tech hubs',
    icon: MapPin,
    prompt: 'Tell me about Orlando\'s innovation districts and co-working spaces',
    category: 'resources'
  },
  {
    id: '5',
    title: 'Funding Sources',
    description: 'Find investors and grants',
    icon: Building2,
    prompt: 'What funding opportunities are available for startups in Orlando?',
    category: 'opportunities'
  },
  {
    id: '6',
    title: 'University Partnerships',
    description: 'Connect with academic institutions',
    icon: GraduationCap,
    prompt: 'How can I partner with UCF or other universities for my tech project?',
    category: 'connections'
  }
]

const mockResponses = {
  'What tech events are happening in Orlando this month?': {
    content: `Here are the top tech events happening in Orlando this month:

🚀 **Orlando Tech Meetup** - Jan 25th
Weekly networking event at Creative Village. This week's focus: AI & Machine Learning
📍 Location: UCF Downtown Campus
🔗 [Register here](https://example.com/tech-meetup)

💡 **Startup Grind Orlando** - Jan 28th  
Featuring guest speaker from a successful Orlando unicorn startup
📍 Location: The Venue at UCF
🔗 [Get tickets](https://example.com/startup-grind)

🎯 **Women in Tech Orlando** - Jan 30th
Panel discussion on leadership in tech with local female executives
📍 Location: Orlando Science Center
🔗 [RSVP](https://example.com/women-tech)

Would you like me to help you register for any of these events or find more specific to your interests?`,
    links: [
      { title: 'Orlando Tech Calendar', url: '/events' },
      { title: 'Networking Opportunities', url: '/community' }
    ]
  },
  'default': {
    content: `Hello! I'm Orlando AI, your virtual expert for everything in Orlando's innovation ecosystem. I can help you with:

✨ **Finding Events & Opportunities**
- Tech meetups, conferences, and networking events
- Job openings and career opportunities
- Funding sources and investor connections

🤝 **Making Connections**
- Startups and companies in your industry
- Potential collaborators and partners
- Mentors and advisors

📚 **Resources & Information**
- Innovation districts and co-working spaces
- University partnership programs
- Government resources and permits

How can I assist you today?`,
    links: [
      { title: 'Explore Resources', url: '/resources' },
      { title: 'View Ecosystem Map', url: '/ecosystem' },
      { title: 'Browse Opportunities', url: '/opportunities' }
    ]
  }
}

export default function OrlandoAI() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response = mockResponses[content as keyof typeof mockResponses] || mockResponses.default
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handlePresetClick = (hint: PresetHint) => {
    handleSendMessage(hint.prompt)
  }

  const handleFileAttach = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      // Handle file upload logic here
      console.log('Files selected:', files)
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 group"
        >
          <Bot className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </Button>
        
        {/* Floating hint */}
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 max-w-xs animate-bounce">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium">Ask Orlando AI anything!</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Get instant help with events, opportunities, and connections
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 shadow-2xl transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[600px]'
      }`}>
        {/* Header */}
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Orlando AI</CardTitle>
                <p className="text-xs text-blue-100">Your innovation ecosystem expert</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(600px-80px)]">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <Bot className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Welcome to Orlando AI!
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      I'm here to help you navigate Orlando's innovation ecosystem. 
                      Try one of these quick actions:
                    </p>
                  </div>
                  
                  {/* Preset Hints */}
                  <div className="grid grid-cols-2 gap-2">
                    {presetHints.map(hint => {
                      const Icon = hint.icon
                      return (
                        <button
                          key={hint.id}
                          onClick={() => handlePresetClick(hint)}
                          className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-medium text-gray-900">
                              {hint.title}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 leading-tight">
                            {hint.description}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </div>
                        <div className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFileAttach}
                  className="h-10 w-10 p-0 hover:bg-gray-200"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about Orlando's tech scene..."
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage(inputValue)
                    }
                  }}
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                  className="h-10 w-10 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
              />
              
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered
                </Badge>
                <span className="text-xs text-gray-500">
                  Press Enter to send, Shift+Enter for new line
                </span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}