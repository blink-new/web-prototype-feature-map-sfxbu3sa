import { useState } from 'react'
import { 
  Calendar as CalendarIcon, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Users,
  Plus,
  Star,
  ExternalLink,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Download,
  Share2
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Calendar } from '../components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, isToday } from 'date-fns'

const events = [
  {
    id: 1,
    title: 'Orlando Tech Meetup',
    date: '2024-01-25',
    time: '6:00 PM',
    location: 'Innovation District',
    type: 'meetup',
    attendees: 89,
    capacity: 100,
    description: 'Monthly gathering of Orlando tech professionals.',
    organizer: 'Tech Community',
    featured: true,
    price: 'Free',
    color: '#3b82f6'
  },
  {
    id: 2,
    title: 'Startup Pitch Night',
    date: '2024-01-28',
    time: '7:00 PM',
    location: 'UCF Downtown',
    type: 'pitch',
    attendees: 45,
    capacity: 60,
    description: 'Local startups pitch to investors and community.',
    organizer: 'Startup Orlando',
    featured: true,
    price: '$10',
    color: '#f59e0b'
  },
  {
    id: 3,
    title: 'AI Workshop Series',
    date: '2024-02-02',
    time: '2:00 PM',
    location: 'Virtual',
    type: 'workshop',
    attendees: 156,
    capacity: 200,
    description: 'Hands-on machine learning workshop for beginners.',
    organizer: 'AI Research Lab',
    featured: false,
    price: '$25',
    color: '#10b981'
  },
  {
    id: 4,
    title: 'Women in Tech Networking',
    date: '2024-02-05',
    time: '5:30 PM',
    location: 'Downtown Orlando',
    type: 'networking',
    attendees: 67,
    capacity: 80,
    description: 'Networking event for women in technology.',
    organizer: 'WIT Orlando',
    featured: false,
    price: 'Free',
    color: '#8b5cf6'
  },
  {
    id: 5,
    title: 'Blockchain Conference',
    date: '2024-02-15',
    time: '9:00 AM',
    location: 'Orlando Convention Center',
    type: 'conference',
    attendees: 234,
    capacity: 300,
    description: 'Annual blockchain and cryptocurrency conference.',
    organizer: 'Crypto Orlando',
    featured: true,
    price: '$75',
    color: '#ef4444'
  },
  {
    id: 6,
    title: 'UX Design Workshop',
    date: '2024-02-20',
    time: '1:00 PM',
    location: 'Design Studio',
    type: 'workshop',
    attendees: 23,
    capacity: 30,
    description: 'Learn modern UX design principles and tools.',
    organizer: 'Design Community',
    featured: false,
    price: '$40',
    color: '#10b981'
  }
]

const typeColors = {
  meetup: 'bg-blue-100 text-blue-700',
  workshop: 'bg-green-100 text-green-700',
  networking: 'bg-purple-100 text-purple-700',
  pitch: 'bg-orange-100 text-orange-700',
  conference: 'bg-red-100 text-red-700'
}

export function EventsCalendar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [activeTab, setActiveTab] = useState('upcoming')
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || event.type === filterType
    return matchesSearch && matchesType
  })

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return isSameDay(eventDate, date)
    })
  }

  const EventCard = ({ event }: { event: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: event.color }}
              />
              <CardTitle className="text-lg">{event.title}</CardTitle>
              {event.featured && (
                <Star className="h-4 w-4 text-yellow-500" />
              )}
            </div>
            <CardDescription>{event.organizer}</CardDescription>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                {event.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {event.time}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {event.location}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={typeColors[event.type as keyof typeof typeColors]}>
              {event.type}
            </Badge>
            <Badge variant="outline">{event.price}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{event.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-3 w-3" />
            {event.attendees}/{event.capacity} attending
          </div>
          <div className="text-xs text-muted-foreground">
            {Math.round((event.attendees / event.capacity) * 100)}% full
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-2">
          <Button size="sm" variant="outline">
            <Bookmark className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button size="sm" className="flex-1">
            <ExternalLink className="h-4 w-4 mr-1" />
            Register
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const CalendarView = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {days.map(day => {
                const dayEvents = getEventsForDate(day)
                const isCurrentMonth = isSameMonth(day, currentDate)
                const isTodayDate = isToday(day)
                
                return (
                  <div
                    key={day.toISOString()}
                    className={`
                      min-h-[100px] p-2 border rounded-lg cursor-pointer transition-colors
                      ${isCurrentMonth ? 'bg-background' : 'bg-muted/30'}
                      ${isTodayDate ? 'ring-2 ring-primary' : ''}
                      hover:bg-muted/50
                    `}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className={`
                      text-sm font-medium mb-1
                      ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}
                      ${isTodayDate ? 'text-primary font-bold' : ''}
                    `}>
                      {format(day, 'd')}
                    </div>
                    
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          className="text-xs p-1 rounded text-white truncate"
                          style={{ backgroundColor: event.color }}
                          title={`${event.title} - ${event.time}`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {selectedDate && (
          <Card>
            <CardHeader>
              <CardTitle>Events on {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
            </CardHeader>
            <CardContent>
              {getEventsForDate(selectedDate).length > 0 ? (
                <div className="space-y-3">
                  {getEventsForDate(selectedDate).map(event => (
                    <div key={event.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: event.color }}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{event.time}</span>
                          <span>{event.location}</span>
                          <span>{event.organizer}</span>
                        </div>
                      </div>
                      <Button size="sm">Register</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No events scheduled for this date
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events Calendar</h1>
          <p className="text-muted-foreground">
            Discover and attend Orlando tech community events
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg p-1">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('calendar')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-xs text-muted-foreground">Upcoming Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">1,456</p>
                <p className="text-xs text-muted-foreground">Total Attendees</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Featured Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Venues</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {viewMode === 'list' && (
        <>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events, organizers, or topics..."
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
                  <SelectItem value="meetup">Meetups</SelectItem>
                  <SelectItem value="workshop">Workshops</SelectItem>
                  <SelectItem value="networking">Networking</SelectItem>
                  <SelectItem value="pitch">Pitch Events</SelectItem>
                  <SelectItem value="conference">Conferences</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="my-events">My Events</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="featured" className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                {filteredEvents.filter(event => event.featured).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="my-events" className="space-y-4">
              <Card>
                <CardContent className="p-8 text-center">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No registered events</h3>
                  <p className="text-muted-foreground">Register for events to see them here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}

      {viewMode === 'calendar' && <CalendarView />}
    </div>
  )
}