import { useState } from 'react'
import { 
  MessageSquare, 
  X, 
  Send, 
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Users,
  Clock,
  CheckCheck
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'

const conversations = [
  {
    id: 1,
    name: 'TechCorp Team',
    avatar: '/api/placeholder/40/40',
    lastMessage: 'Great! Let\'s schedule a meeting for next week.',
    timestamp: '2m ago',
    unread: 3,
    online: true,
    type: 'group'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: '/api/placeholder/40/40',
    lastMessage: 'Thanks for the introduction! I\'d love to connect.',
    timestamp: '15m ago',
    unread: 1,
    online: true,
    type: 'direct'
  },
  {
    id: 3,
    name: 'Orlando Startup Hub',
    avatar: '/api/placeholder/40/40',
    lastMessage: 'Event reminder: Tech Meetup tomorrow at 6 PM',
    timestamp: '1h ago',
    unread: 0,
    online: false,
    type: 'group'
  },
  {
    id: 4,
    name: 'Alex Rivera',
    avatar: '/api/placeholder/40/40',
    lastMessage: 'The blockchain project looks promising!',
    timestamp: '2h ago',
    unread: 0,
    online: true,
    type: 'direct'
  },
  {
    id: 5,
    name: 'AI Research Lab',
    avatar: '/api/placeholder/40/40',
    lastMessage: 'We\'d like to discuss the collaboration opportunity.',
    timestamp: '1d ago',
    unread: 2,
    online: false,
    type: 'group'
  }
]

const messages = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    content: 'Hi Alex! I saw your profile through the AI matchmaking system.',
    timestamp: '10:30 AM',
    isOwn: false,
    avatar: '/api/placeholder/32/32'
  },
  {
    id: 2,
    sender: 'You',
    content: 'Hi Sarah! Great to connect. I\'m really interested in your fintech experience.',
    timestamp: '10:32 AM',
    isOwn: true
  },
  {
    id: 3,
    sender: 'Sarah Johnson',
    content: 'Thanks! I\'d love to learn more about your blockchain work. Are you available for a quick call this week?',
    timestamp: '10:35 AM',
    isOwn: false,
    avatar: '/api/placeholder/32/32'
  },
  {
    id: 4,
    sender: 'You',
    content: 'Absolutely! I\'m free Thursday afternoon or Friday morning. What works better for you?',
    timestamp: '10:37 AM',
    isOwn: true
  },
  {
    id: 5,
    sender: 'Sarah Johnson',
    content: 'Friday morning would be perfect! How about 10 AM?',
    timestamp: '10:40 AM',
    isOwn: false,
    avatar: '/api/placeholder/32/32'
  },
  {
    id: 6,
    sender: 'You',
    content: 'Perfect! I\'ll send you a calendar invite. Looking forward to our chat!',
    timestamp: '10:42 AM',
    isOwn: true
  }
]

interface MessagingPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function MessagingPanel({ isOpen, onClose }: MessagingPanelProps) {
  const [selectedConversation, setSelectedConversation] = useState(conversations[1])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  const ConversationItem = ({ conversation }: { conversation: any }) => (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
        selectedConversation?.id === conversation.id
          ? 'bg-primary/10 border border-primary/20'
          : 'hover:bg-muted'
      }`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={conversation.avatar} />
          <AvatarFallback>{conversation.name[0]}</AvatarFallback>
        </Avatar>
        {conversation.online && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm truncate">{conversation.name}</p>
          <div className="flex items-center gap-1">
            {conversation.type === 'group' && (
              <Users className="h-3 w-3 text-muted-foreground" />
            )}
            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
          {conversation.unread > 0 && (
            <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
              {conversation.unread}
            </Badge>
          )}
        </div>
      </div>
    </div>
  )

  const MessageBubble = ({ message }: { message: any }) => (
    <div className={`flex gap-2 ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
      {!message.isOwn && (
        <Avatar className="h-6 w-6">
          <AvatarImage src={message.avatar} />
          <AvatarFallback>{message.sender[0]}</AvatarFallback>
        </Avatar>
      )}
      <div className={`max-w-[70%] ${message.isOwn ? 'order-first' : ''}`}>
        <div
          className={`px-3 py-2 rounded-lg text-sm ${
            message.isOwn
              ? 'bg-primary text-primary-foreground ml-auto'
              : 'bg-muted'
          }`}
        >
          {message.content}
        </div>
        <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
          message.isOwn ? 'justify-end' : 'justify-start'
        }`}>
          <span>{message.timestamp}</span>
          {message.isOwn && <CheckCheck className="h-3 w-3" />}
        </div>
      </div>
    </div>
  )

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-96 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Messages
              </SheetTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          {!selectedConversation ? (
            /* Conversation List */
            <div className="flex-1 flex flex-col">
              {/* Search */}
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Conversations */}
              <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                  {filteredConversations.map((conversation) => (
                    <ConversationItem key={conversation.id} conversation={conversation} />
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : (
            /* Chat View */
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedConversation.avatar} />
                        <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                      </Avatar>
                      {selectedConversation.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border border-background rounded-full" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{selectedConversation.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedConversation.online ? 'Online' : 'Last seen 2h ago'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}