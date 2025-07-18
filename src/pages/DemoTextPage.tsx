import React from 'react';
import { ArrowRight, Zap, Users, Target, Map, Brain, Calendar, BarChart3, Trophy, User, Settings, MessageCircle, Bot, Sparkles, Network, Search, Filter, Globe, Lightbulb, Rocket, Heart } from 'lucide-react';

const DemoTextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Orlando Tech Community Platform
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              The digital engine connecting Orlando's innovation ecosystem - where startups, enterprises, investors, and creatives unite to build the future
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">🎮 Gaming Hub</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">🎢 Tourism Tech</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">🎨 Creative Industries</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">🔬 Simulation Excellence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Overview */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Addressing Orlando's Innovation Ecosystem Needs
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Our platform directly responds to the RFI requirements, creating an indispensable tool for Orlando's unique tech landscape with AI-driven matching, inclusive access, and Orlando-native experiences.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Technical Matching</h3>
            <p className="text-gray-600">
              Advanced skill-based algorithms connect companies needing AI development, IoT integration, or simulation expertise with the right talent and partners.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Inclusive & Equitable Access</h3>
            <p className="text-gray-600">
              Multilingual support, low-bandwidth options, and community-driven data inclusion ensure underrepresented founders and rural entrepreneurs thrive.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Orlando-Native Experience</h3>
            <p className="text-gray-600">
              Tourism-inspired UI, gaming elements, and creative industry focus create an authentically Orlando digital experience.
            </p>
          </div>
        </div>

        {/* Platform Features */}
        <div className="space-y-12">
          
          {/* Dashboard */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Dashboard</h3>
                <p className="text-gray-600">Your personalized command center</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-blue-600">Welcome & Progress</h4>
                <p className="text-gray-600 mb-4">
                  Personalized welcome section showcasing your journey, achievements, and progress through Orlando's innovation ecosystem. Track your XP, badges, and community impact.
                </p>
                <h4 className="font-semibold mb-2 text-blue-600">Quick Actions & Activity</h4>
                <p className="text-gray-600">
                  Recent connections, upcoming events, and one-click access to key features. Real-time activity feed keeps you connected to ecosystem pulse.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-600">Your Impact & Ecosystem Health</h4>
                <p className="text-gray-600 mb-4">
                  Visualize your contributions to Orlando's tech community with impact metrics, collaboration stats, and ecosystem health indicators.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>RFI Response:</strong> Gamified progress tracking drives weekly engagement while showcasing measurable community impact.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ecosystem Map */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <Network className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Interactive Ecosystem Map</h3>
                <p className="text-gray-600">Visualize Orlando's innovation network</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-green-600">Dynamic Visualization</h4>
                <p className="text-gray-600 mb-4">
                  Interactive network graph and geographic map views reveal connections between startups, corporations, investors, and talent. Switch between relationship mapping and location-based clustering.
                </p>
                <h4 className="font-semibold mb-2 text-green-600">AI-Powered Discovery</h4>
                <p className="text-gray-600">
                  Smart search and filters help you find exactly what you need - from AI development partners to IoT specialists, with detailed entity profiles and connection paths.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-green-600">Technical Capability Matching</h4>
                <p className="text-gray-600 mb-4">
                  Advanced algorithms identify skill complementarity, project fit, and collaboration potential based on technical expertise, industry focus, and past success patterns.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>RFI Response:</strong> Addresses technical matching needs by connecting companies based on specific skills like AI, IoT, and simulation expertise through intelligent visualization.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Matchmaking */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">AI Matchmaking Hub</h3>
                <p className="text-gray-600">Intelligent connections for maximum impact</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-purple-600">Smart Recommendations</h4>
                <p className="text-gray-600 mb-4">
                  AI analyzes your profile, goals, and behavior to surface relevant partnerships, funding opportunities, talent matches, and collaboration prospects with confidence scores.
                </p>
                <h4 className="font-semibold mb-2 text-purple-600">Opportunity Types</h4>
                <p className="text-gray-600">
                  Funding rounds, partnership opportunities, talent acquisition, mentorship matches, project collaborations, and strategic alliances - all personalized to your needs.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-purple-600">Predictive Analytics</h4>
                <p className="text-gray-600 mb-4">
                  Machine learning predicts successful matches based on historical data, compatibility metrics, and ecosystem patterns to maximize connection success rates.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-700">
                    <strong>RFI Response:</strong> AI-driven recommendation engine ensures data accuracy through community validation and includes underrepresented groups via inclusive data sourcing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Community */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Community Directory</h3>
                <p className="text-gray-600">Connect with Orlando's innovation leaders</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Comprehensive directory of founders, enterprises, investors, and creatives with AI-powered search across multiple tabs: All Members, Startups, Enterprises, Investors, Talent, and Service Providers. Advanced filtering by industry, skills, stage, and location.
            </p>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-700">
                <strong>RFI Response:</strong> Inclusive community building ensures representation of underrepresented groups through community-driven profiles and multilingual support.
              </p>
            </div>
          </div>

          {/* Opportunities */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Opportunities Board</h3>
                <p className="text-gray-600">Discover and create ecosystem opportunities</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Central marketplace for funding, partnerships, jobs, projects, and collaborations. Create and browse opportunities with AI-powered search, smart categorization, and personalized recommendations. Tabs include All, Saved, Featured, and My Opportunities.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-700">
                <strong>RFI Response:</strong> Democratizes access to opportunities, ensuring small businesses and rural entrepreneurs can discover and create value within the ecosystem.
              </p>
            </div>
          </div>

          {/* Events */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Events Calendar</h3>
                <p className="text-gray-600">Never miss Orlando's innovation moments</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 mb-4">
                  Comprehensive event discovery with AI search, advanced filters, and multiple view modes. Find meetups, pitch competitions, conferences, workshops, and networking events with details on pricing, timing, and requirements.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-red-600">Calendar Integration</h4>
                <p className="text-gray-600 mb-4">
                  Full calendar view with personal scheduling, RSVP management, and smart recommendations based on your interests and network activity.
                </p>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-700">
                    <strong>Orlando-Native:</strong> Features tourism-industry event formats and gaming-inspired engagement mechanics.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <Lightbulb className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Resources Library</h3>
                <p className="text-gray-600">Curated knowledge for ecosystem success</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Comprehensive resource directory including funding guides, legal templates, technical documentation, market research, and Orlando-specific business resources. Categorized by Business, Talent, Location, Education, Events, Government, Healthcare, and Living.
            </p>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                <BarChart3 className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Analytics Center</h3>
                <p className="text-gray-600">Data-driven ecosystem insights</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Comprehensive analytics dashboard tracking ecosystem health, connection success rates, funding flows, and community growth. Personal analytics show your network expansion, engagement metrics, and impact measurements.
            </p>
            <div className="bg-teal-50 p-4 rounded-lg">
              <p className="text-sm text-teal-700">
                <strong>RFI Response:</strong> Predictive analytics identify ecosystem trends and opportunities while ensuring data privacy and inclusive representation.
              </p>
            </div>
          </div>

          {/* Rewards System */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                <Trophy className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Rewards & Gamification</h3>
                <p className="text-gray-600">Motivation through achievement</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-pink-600">Achievement System</h4>
                <p className="text-gray-600 mb-4">
                  Earn XP, badges, and recognition for ecosystem participation. Complete daily/weekly challenges, facilitate connections, attend events, and contribute resources to climb the global leaderboard.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-pink-600">Retention & Engagement</h4>
                <p className="text-gray-600 mb-4">
                  Gamified elements inspired by Orlando's gaming industry create addictive engagement patterns while driving meaningful ecosystem participation and community building.
                </p>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="text-sm text-pink-700">
                    <strong>RFI Response:</strong> Gamification drives weekly engagement while creating measurable value through connection facilitation and community building.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Profile Management</h4>
              <p className="text-gray-600 text-sm">
                Comprehensive profiles showcasing skills, achievements, and ecosystem contributions with verification systems.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-5 h-5 text-gray-600" />
              </div>
              <h4 className="font-semibold mb-2">Settings & Privacy</h4>
              <p className="text-gray-600 text-sm">
                Granular privacy controls, notification preferences, and accessibility options ensuring inclusive access.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Messaging System</h4>
              <p className="text-gray-600 text-sm">
                Secure communication platform enabling direct connections, group discussions, and project collaboration.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Bot className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Orlando AI Assistant</h4>
              <p className="text-gray-600 text-sm">
                Intelligent chatbot with deep platform knowledge, providing instant help, recommendations, and ecosystem insights.
              </p>
            </div>
          </div>

          {/* Differentiation & Innovation */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">How We Differentiate from Existing Tools</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-blue-100">Beyond EcoMap.tech & Kumu</h4>
                <ul className="space-y-2 text-blue-100">
                  <li>• AI-powered matching vs. static visualization</li>
                  <li>• Gamified engagement vs. passive browsing</li>
                  <li>• Real-time collaboration vs. directory listing</li>
                  <li>• Orlando-specific localization vs. generic tools</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-purple-100">Addressing Tool Gaps</h4>
                <ul className="space-y-2 text-purple-100">
                  <li>• Inclusive data sourcing for underrepresented groups</li>
                  <li>• Technical skill matching with verification</li>
                  <li>• Sustainable revenue model through value creation</li>
                  <li>• Multi-stakeholder engagement platform</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sustainability & Scale */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Sustainability & Scale Strategy</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-blue-600">Revenue Models</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Premium memberships for enterprises</li>
                  <li>• Event promotion and ticketing</li>
                  <li>• Sponsored content and partnerships</li>
                  <li>• Data insights and analytics services</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-green-600">Stakeholder Engagement</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• University partnership programs</li>
                  <li>• Chamber of commerce integration</li>
                  <li>• Accelerator collaboration frameworks</li>
                  <li>• Government data sharing agreements</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-purple-600">Regional Expansion</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• API integration with national platforms</li>
                  <li>• White-label solutions for other cities</li>
                  <li>• Cross-ecosystem partnership protocols</li>
                  <li>• Federated network architecture</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Orlando's Innovation Ecosystem?</h3>
            <p className="text-xl mb-8 text-orange-100">
              Join us in building the platform that will define Orlando's tech future
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 px-6 py-3 rounded-full">
                <span className="font-semibold">🚀 Beta Testing Available</span>
              </div>
              <div className="bg-white/20 px-6 py-3 rounded-full">
                <span className="font-semibold">🤝 Partnership Opportunities</span>
              </div>
              <div className="bg-white/20 px-6 py-3 rounded-full">
                <span className="font-semibold">💡 Co-Creation Sessions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoTextPage;