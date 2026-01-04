import React, { useState } from 'react'
import { Search, Filter, Globe, Trophy, TrendingUp, Swords, Route, Award, Cpu, MapPin } from 'lucide-react'
import LeaderboardRow from '../components/LeaderboardRow'
import usersData from '../data/users.json'

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('overall')
  const [searchQuery, setSearchQuery] = useState('')
  const [divisionFilter, setDivisionFilter] = useState('all')
  const [regionFilter, setRegionFilter] = useState('all')

  // Region mapping by country code
  const getRegion = (countryCode) => {
    const regions = {
      // Europe
      'CY': 'Europe', 'DE': 'Europe', 'ES': 'Europe', 'FR': 'Europe', 'GB': 'Europe', 
      'GR': 'Europe', 'NO': 'Europe', 'RU': 'Europe', 'SE': 'Europe', 'UA': 'Europe',
      // Asia
      'CN': 'Asia', 'IN': 'Asia', 'JP': 'Asia', 'KR': 'Asia', 'AE': 'Asia', 'SA': 'Asia',
      // Africa
      'EG': 'Africa', 'KE': 'Africa', 'MA': 'Africa', 'NG': 'Africa', 'UG': 'Africa',
      // North America
      'US': 'North America', 'MX': 'North America', 'CA': 'North America',
      // South America
      'BR': 'South America', 'AR': 'South America', 'CL': 'South America',
    }
    return regions[countryCode] || 'Other'
  }

  // Get rating based on active category
  const getRating = (user) => {
    return user.ratings[activeTab] || user.ratings.overall
  }

  // Sort users by the selected category rating
  const sortedUsers = [...usersData].sort((a, b) => getRating(b) - getRating(a))

  const filteredUsers = sortedUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.country.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDivision = divisionFilter === 'all' || user.division === divisionFilter
    const matchesRegion = regionFilter === 'all' || getRegion(user.countryCode) === regionFilter
    return matchesSearch && matchesDivision && matchesRegion
  })

  const tabs = [
    { id: 'overall', label: 'Overall', icon: <Globe className="w-4 h-4" /> },
    { id: 'sumo', label: 'Sumo Bots', icon: <Swords className="w-4 h-4" /> },
    { id: 'line', label: 'Line Following', icon: <Route className="w-4 h-4" /> },
    { id: 'combat', label: 'Combat', icon: <Cpu className="w-4 h-4" /> },
    { id: 'hackathon', label: 'Hackathon', icon: <Award className="w-4 h-4" /> },
  ]

  const divisions = ['all', 'Masters', 'Gold', 'Silver', 'Bronze']
  const regions = ['all', 'Europe', 'Asia', 'North America', 'South America', 'Africa']

  return (
    <div className="min-h-screen bg-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-light mb-2">Player Rankings</h1>
          <p className="text-light/60">Universal Robotics Rating System (URRS) - Rankings across all competitions</p>
        </div>

        {/* Category Tabs */}
        <div className="rounded-xl p-1.5 flex gap-1 mb-6" style={{ backgroundColor: '#1a1a24', width: 'fit-content' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 py-2.5 rounded-lg justify-center"
              style={{
                width: '140px',
                backgroundColor: activeTab === tab.id ? '#30bced' : 'transparent',
                color: activeTab === tab.id ? '#000000' : 'rgba(255,250,255,0.6)',
                transition: 'background-color 0.2s, color 0.2s'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light/40" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1a1a24] border border-light/20 rounded-lg pl-10 pr-4 py-2.5 text-light placeholder-light/40 focus:outline-none focus:border-primary w-64"
            />
          </div>
          
          {/* Division Filter */}
          <select
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
            className="bg-[#1a1a24] border border-light/20 rounded-lg px-4 py-2.5 text-light focus:outline-none focus:border-primary cursor-pointer min-w-[140px]"
            style={{ colorScheme: 'dark' }}
          >
            {divisions.map((div) => (
              <option key={div} value={div} className="bg-[#1a1a24] text-light">
                {div === 'all' ? 'All Divisions' : div}
              </option>
            ))}
          </select>

          {/* Region Filter */}
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="bg-[#1a1a24] border border-light/20 rounded-lg px-4 py-2.5 text-light focus:outline-none focus:border-primary cursor-pointer min-w-[160px]"
            style={{ colorScheme: 'dark' }}
          >
            {regions.map((region) => (
              <option key={region} value={region} className="bg-[#1a1a24] text-light">
                {region === 'all' ? 'All Regions' : region}
              </option>
            ))}
          </select>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-dark-lighter rounded-xl border border-light/10 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-light/10 text-light/60 text-sm font-medium">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Player</div>
            <div className="col-span-2">Rating</div>
            <div className="col-span-2">Division</div>
            <div className="col-span-2">Podiums</div>
            <div className="col-span-1">Trend</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-light/5">
            {filteredUsers.map((user, index) => (
              <LeaderboardRow key={user.id} user={user} rank={index + 1} activeCategory={activeTab} />
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-dark-lighter rounded-xl p-6 border border-light/10">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-light/60 text-sm">Total Players</span>
            </div>
            <p className="text-2xl font-bold text-light">{usersData.length}</p>
          </div>
          <div className="bg-dark-lighter rounded-xl p-6 border border-light/10">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-light/60 text-sm">Top {tabs.find(t => t.id === activeTab)?.label} Rating</span>
            </div>
            <p className="text-2xl font-bold text-light">{Math.max(...usersData.map(u => u.ratings[activeTab]))}</p>
          </div>
          <div className="bg-dark-lighter rounded-xl p-6 border border-light/10">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-5 h-5 text-accent" />
              <span className="text-light/60 text-sm">Countries</span>
            </div>
            <p className="text-2xl font-bold text-light">{new Set(usersData.map(u => u.country)).size}</p>
          </div>
          <div className="bg-dark-lighter rounded-xl p-6 border border-light/10">
            <div className="flex items-center gap-3 mb-2">
              <Filter className="w-5 h-5 text-secondary" />
              <span className="text-light/60 text-sm">Categories</span>
            </div>
            <p className="text-2xl font-bold text-light">5</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
