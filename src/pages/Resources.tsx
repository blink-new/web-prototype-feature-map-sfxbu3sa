import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  Building2, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Home, 
  Lightbulb, 
  MapPin, 
  Search, 
  Star,
  ExternalLink,
  Download,
  Eye
} from 'lucide-react'

interface Resource {
  id: string
  title: string
  description: string
  category: string
  type: 'guide' | 'tool' | 'directory' | 'program' | 'service'
  url?: string
  downloadUrl?: string
  rating: number
  views: number
  tags: string[]
  featured: boolean
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Orlando Startup Ecosystem Guide',
    description: 'Comprehensive guide to starting and scaling a business in Orlando, including funding sources, incubators, and key contacts.',
    category: 'Business',
    type: 'guide',
    url: '/resources/startup-guide',
    rating: 4.8,
    views: 1250,
    tags: ['startup', 'funding', 'incubators'],
    featured: true
  },
  {
    id: '2',
    title: 'Tech Talent Directory',
    description: 'Database of skilled professionals in Orlando\'s tech scene, searchable by skills, experience, and availability.',
    category: 'Talent',
    type: 'directory',
    url: '/resources/talent-directory',
    rating: 4.6,
    views: 890,
    tags: ['hiring', 'talent', 'developers'],
    featured: true
  },
  {
    id: '3',
    title: 'Innovation District Map',
    description: 'Interactive map of Orlando\'s innovation districts, co-working spaces, and tech hubs.',
    category: 'Location',
    type: 'tool',
    url: '/resources/innovation-map',
    rating: 4.7,
    views: 2100,
    tags: ['map', 'coworking', 'districts'],
    featured: false
  },
  {
    id: '4',
    title: 'UCF Partnership Programs',
    description: 'Information about collaboration opportunities with University of Central Florida research and student programs.',
    category: 'Education',
    type: 'program',
    url: '/resources/ucf-partnerships',
    rating: 4.5,
    views: 670,
    tags: ['university', 'research', 'students'],
    featured: false
  },
  {
    id: '5',
    title: 'Orlando Tech Events Calendar',
    description: 'Curated calendar of tech meetups, conferences, and networking events happening in Orlando.',
    category: 'Events',
    type: 'tool',
    url: '/resources/events-calendar',
    rating: 4.9,
    views: 1800,
    tags: ['events', 'networking', 'meetups'],
    featured: true
  },
  {
    id: '6',
    title: 'City Permit & Licensing Guide',
    description: 'Step-by-step guide for obtaining business permits and licenses required to operate in Orlando.',
    category: 'Government',
    type: 'guide',
    downloadUrl: '/downloads/permit-guide.pdf',
    rating: 4.3,
    views: 540,
    tags: ['permits', 'licensing', 'government'],
    featured: false
  },
  {
    id: '7',
    title: 'Healthcare Innovation Hub',
    description: 'Resources for healthcare startups and medical device companies in Orlando\'s growing health tech sector.',
    category: 'Healthcare',
    type: 'service',
    url: '/resources/healthcare-hub',
    rating: 4.6,
    views: 420,
    tags: ['healthcare', 'medtech', 'innovation'],
    featured: false
  },
  {
    id: '8',
    title: 'Housing & Relocation Guide',
    description: 'Complete guide for professionals relocating to Orlando, including neighborhoods, schools, and cost of living.',
    category: 'Living',
    type: 'guide',
    url: '/resources/relocation-guide',
    rating: 4.4,
    views: 980,
    tags: ['housing', 'relocation', 'neighborhoods'],
    featured: false
  }
]

const categories = [
  { id: 'all', name: 'All Resources', icon: BookOpen, count: mockResources.length },
  { id: 'Business', name: 'Business', icon: Briefcase, count: mockResources.filter(r => r.category === 'Business').length },
  { id: 'Talent', name: 'Talent', icon: GraduationCap, count: mockResources.filter(r => r.category === 'Talent').length },
  { id: 'Location', name: 'Location', icon: MapPin, count: mockResources.filter(r => r.category === 'Location').length },
  { id: 'Education', name: 'Education', icon: GraduationCap, count: mockResources.filter(r => r.category === 'Education').length },
  { id: 'Events', name: 'Events', icon: Lightbulb, count: mockResources.filter(r => r.category === 'Events').length },
  { id: 'Government', name: 'Government', icon: Building2, count: mockResources.filter(r => r.category === 'Government').length },
  { id: 'Healthcare', name: 'Healthcare', icon: Heart, count: mockResources.filter(r => r.category === 'Healthcare').length },
  { id: 'Living', name: 'Living', icon: Home, count: mockResources.filter(r => r.category === 'Living').length }
]

const typeColors = {
  guide: 'bg-blue-100 text-blue-800',
  tool: 'bg-green-100 text-green-800',
  directory: 'bg-purple-100 text-purple-800',
  program: 'bg-orange-100 text-orange-800',
  service: 'bg-pink-100 text-pink-800'
}

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'featured' | 'all'>('featured')

  const filteredResources = mockResources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesView = viewMode === 'all' || resource.featured
    
    return matchesCategory && matchesSearch && matchesView
  })

  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <Card className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                {resource.title}
              </CardTitle>
              {resource.featured && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            <CardDescription className="text-sm leading-relaxed">
              {resource.description}
            </CardDescription>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{resource.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{resource.views.toLocaleString()}</span>
          </div>
          <Badge className={typeColors[resource.type]}>
            {resource.type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          {resource.url && (
            <Button size="sm" className="flex-1">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Resource
            </Button>
          )}
          {resource.downloadUrl && (
            <Button size="sm" variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Orlando Resource Library
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your comprehensive guide to Orlando's innovation ecosystem. Find tools, guides, 
              and resources to help you succeed in the City Beautiful.
            </p>
          </div>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search resources, guides, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-8">
              {/* View Toggle */}
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">View</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'featured' | 'all')}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="featured">Featured</TabsTrigger>
                      <TabsTrigger value="all">All</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map(category => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'All Resources' : 
                   categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>

            {/* Resources Grid */}
            {filteredResources.length > 0 ? (
              <div className="grid gap-6">
                {filteredResources.map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or selecting a different category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}