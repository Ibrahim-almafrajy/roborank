import React, { useState } from 'react'
import { Search, Filter, Globe, MapPin, Calendar, Grid, Map, SlidersHorizontal } from 'lucide-react'
import TournamentCard from '../components/TournamentCard'
import tournamentsData from '../data/tournaments.json'

const TournamentDiscovery = () => {
  const [activeType, setActiveType] = useState('all')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeSkill, setActiveSkill] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTournaments = tournamentsData.filter(tournament => {
    const matchesType = activeType === 'all' || tournament.type === activeType
    const matchesCategory = activeCategory === 'all' || tournament.category === activeCategory
    const matchesSkill = activeSkill === 'all' || tournament. skillLevel === activeSkill
    const matchesSearch = tournament.name. toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tournament.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesCategory && matchesSkill && matchesSearch
  })

  const categories = ['all', 'Combat Robots', 'Autonomous Navigation', 'Drone Racing', 'Multi-discipline']
  const skillLevels = ['all', 'Beginner', 'Intermediate', 'Advanced', 'All Levels', 'Masters Only']

  return (
    <div className="min-h-screen bg-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm: px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-light">Tournament Discovery</h1>
          <p className="text-gray-400 mt-1">Find and join robotics competitions worldwide</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-dark-secondary border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-accent">{tournamentsData.length}</p>
            <p className="text-sm text-gray-400">Total Tournaments</p>
          </div>
          <div className="bg-dark-secondary border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-400">
              {tournamentsData.filter(t => t.status === 'live').length}
            </p>
            <p className="text-sm text-gray-400">Live Now</p>
          </div>
          <div className="bg-dark-secondary border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-accent">
              {tournamentsData. filter(t => t.type === 'online').length}
            </p>
            <p className="text-sm text-gray-400">Online Events</p>
          </div>
          <div className="bg-dark-secondary border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-orange-400">
              {tournamentsData.filter(t => t.type === 'physical').length}
            </p>
            <p className="text-sm text-gray-400">Physical Events</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-dark-secondary border border-gray-800 rounded-2xl p-6 mb-8">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tournaments, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-light placeholder-gray-500 focus:outline-none focus: border-accent transition-colors"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-accent text-dark' 
                    : 'bg-dark border border-gray-700 text-gray-400 hover:text-light'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-3 rounded-xl transition-colors ${
                  viewMode === 'map' 
                    ? 'bg-accent text-dark' 
                    : 'bg-dark border border-gray-700 text-gray-400 hover:text-light'
                }`}
              >
                <Map className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4">
            {/* Type Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Type: </span>
              <div className="flex bg-dark rounded-lg p-1">
                {['all', 'online', 'physical']. map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeType === type
                        ? 'bg-accent text-dark'
                        : 'text-gray-400 hover:text-light'
                    }`}
                  >
                    {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Category: </span>
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="bg-dark border border-gray-700 rounded-lg px-4 py-2 text-light text-sm focus:outline-none focus:border-accent"
              >
                {categories. map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Skill Level Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Skill: </span>
              <select
                value={activeSkill}
                onChange={(e) => setActiveSkill(e.target.value)}
                className="bg-dark border border-gray-700 rounded-lg px-4 py-2 text-light text-sm focus:outline-none focus:border-accent"
              >
                {skillLevels.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill === 'all' ? 'All Levels' : skill}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {viewMode === 'grid' ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400">
                Showing <span className="text-light font-medium">{filteredTournaments.length}</span> tournaments
              </p>
              <select className="bg-dark-secondary border border-gray-700 rounded-lg px-4 py-2 text-light text-sm focus:outline-none focus: border-accent">
                <option>Sort by Date</option>
                <option>Sort by Prize Pool</option>
                <option>Sort by Participants</option>
              </select>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-dark-secondary border border-gray-800 rounded-2xl overflow-hidden">
            <div className="h-[600px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50000000!2d0!3d20! 2m3!1f0! 2f0!3f0! 3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDAw! 5e0!3m2! 1sen!2sus!4v1600000000000!5m2!1sen! 2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              
              {/* Map Overlay Info */}
              <div className="absolute top-4 left-4 bg-dark-secondary/90 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
                <h3 className="text-light font-semibold mb-2">Tournament Locations</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-accent rounded-full"></span>
                    <span className="text-gray-400">Online ({tournamentsData.filter(t => t.type === 'online').length})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-orange-400 rounded-full"></span>
                    <span className="text-gray-400">Physical ({tournamentsData.filter(t => t.type === 'physical').length})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredTournaments.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-light mb-2">No tournaments found</h3>
            <p className="text-gray-400">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TournamentDiscovery