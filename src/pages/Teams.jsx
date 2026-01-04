import React, { useState } from 'react'
import { Search, Users, Trophy, TrendingUp, Globe, Medal, Award } from 'lucide-react'

const Teams = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
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

  const teamsData = [
    { id: 0, name: "Bearbella", country: "Canada", countryCode: "CA", rating: 2945, division: "Masters", members: 5, podiums: { gold: 18, silver: 10, bronze: 4 }, competitions: 45, specialty: "Sumo", achievements: ["World Champions 2025", "North America #1"], avatar: "BB" },
    { id: 1, name: "Circuit Breakers", country: "Cyprus", countryCode: "CY", rating: 2890, division: "Masters", members: 4, podiums: { gold: 15, silver: 9, bronze: 6 }, competitions: 42, specialty: "Sumo", achievements: ["World Finals 2025", "EU Champions"], avatar: "CB" },
    { id: 2, name: "Neural Knights", country: "Japan", countryCode: "JP", rating: 2756, division: "Masters", members: 5, podiums: { gold: 12, silver: 10, bronze: 5 }, competitions: 38, specialty: "Line Following", achievements: ["Asia Pacific Champions"], avatar: "NK" },
    { id: 3, name: "Rust Busters", country: "USA", countryCode: "US", rating: 2634, division: "Masters", members: 4, podiums: { gold: 11, silver: 8, bronze: 7 }, competitions: 35, specialty: "Combat", achievements: ["BattleBots Regional"], avatar: "RB" },
    { id: 4, name: "Quantum Mechanics", country: "Germany", countryCode: "DE", rating: 2512, division: "Gold", members: 6, podiums: { gold: 9, silver: 7, bronze: 6 }, competitions: 32, specialty: "Maze Solving", achievements: ["RoboCup 2025"], avatar: "QM" },
    { id: 5, name: "Binary Storm", country: "South Korea", countryCode: "KR", rating: 2489, division: "Gold", members: 4, podiums: { gold: 8, silver: 9, bronze: 5 }, competitions: 30, specialty: "Sumo", achievements: ["Korean Nationals"], avatar: "BS" },
    { id: 6, name: "Iron Collective", country: "UK", countryCode: "GB", rating: 2401, division: "Gold", members: 5, podiums: { gold: 7, silver: 8, bronze: 6 }, competitions: 29, specialty: "Combat", achievements: ["UK Champions 2025"], avatar: "IC" },
    { id: 7, name: "Robo Spartans", country: "Greece", countryCode: "GR", rating: 2298, division: "Gold", members: 4, podiums: { gold: 6, silver: 7, bronze: 8 }, competitions: 28, specialty: "Line Following", achievements: ["Mediterranean Cup"], avatar: "RS" },
    { id: 8, name: "Cyber Dragons", country: "China", countryCode: "CN", rating: 2187, division: "Silver", members: 6, podiums: { gold: 5, silver: 6, bronze: 7 }, competitions: 26, specialty: "Hackathon", achievements: ["Shenzhen Maker Faire"], avatar: "CD" },
    { id: 9, name: "Tech Titans", country: "India", countryCode: "IN", rating: 2056, division: "Silver", members: 5, podiums: { gold: 4, silver: 6, bronze: 5 }, competitions: 24, specialty: "Maze Solving", achievements: ["IIT Robotics"], avatar: "TT" },
    { id: 10, name: "Volt Vanguard", country: "Brazil", countryCode: "BR", rating: 1945, division: "Silver", members: 4, podiums: { gold: 4, silver: 5, bronze: 6 }, competitions: 22, specialty: "Combat", achievements: ["LARC Finals"], avatar: "VV" },
  ]

  const tabs = [
    { id: 'all', label: 'All Teams', icon: <Users className="w-4 h-4" /> },
    { id: 'sumo', label: 'Sumo', icon: <Trophy className="w-4 h-4" /> },
    { id: 'combat', label: 'Combat', icon: <Medal className="w-4 h-4" /> },
    { id: 'line', label: 'Line Following', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'maze', label: 'Maze Solving', icon: <Globe className="w-4 h-4" /> },
    { id: 'hackathon', label: 'Hackathon', icon: <Award className="w-4 h-4" /> },
  ]

  const getFlagEmoji = (countryCode) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt())
    return String.fromCodePoint(...codePoints)
  }

  const getDivisionBadge = (division) => {
    const badges = {
      'Masters': { bg: 'bg-purple-500/20', text: 'text-purple-400', icon: 'fa-crown' },
      'Gold': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: 'fa-medal' },
      'Silver': { bg: 'bg-gray-400/20', text: 'text-gray-300', icon: 'fa-medal' },
      'Bronze': { bg: 'bg-orange-500/20', text: 'text-orange-400', icon: 'fa-medal' },
    }
    return badges[division] || badges['Bronze']
  }

  const filteredTeams = teamsData.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          team.country.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'all' || team.specialty.toLowerCase().includes(activeTab)
    const matchesRegion = regionFilter === 'all' || getRegion(team.countryCode) === regionFilter
    return matchesSearch && matchesTab && matchesRegion
  })

  const regions = ['all', 'Europe', 'Asia', 'North America', 'South America', 'Africa']

  return (
    <div className="min-h-screen bg-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-light mb-2">Team Rankings</h1>
          <p className="text-light/60">Global team rankings across all robotics disciplines</p>
        </div>

        {/* Category Tabs */}
        <div className="rounded-xl p-1.5 flex gap-1 mb-6" style={{ backgroundColor: '#1a1a24', width: 'fit-content' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 py-2.5 rounded-lg justify-center whitespace-nowrap"
              style={{
                minWidth: '120px',
                paddingLeft: '16px',
                paddingRight: '16px',
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
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1a1a24] border border-light/20 rounded-lg pl-10 pr-4 py-2.5 text-light placeholder-light/40 focus:outline-none focus:border-primary w-64"
            />
          </div>

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

        {/* Teams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredTeams.map((team, index) => {
            const badge = getDivisionBadge(team.division)
            return (
              <div key={team.id} className="bg-dark-lighter rounded-xl border border-light/10 p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-dark font-bold text-lg">
                        {team.avatar}
                      </div>
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-dark rounded-full flex items-center justify-center text-xs font-bold text-primary border border-primary">
                        #{index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-light">{team.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-light/60">
                        <span>{getFlagEmoji(team.countryCode)}</span>
                        <span>{team.country}</span>
                        <span>•</span>
                        <Users className="w-3 h-3" />
                        <span>{team.members} members</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-light">{team.rating}</div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                      <i className={`fa-solid ${badge.icon}`}></i>
                      {team.division}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-light/60">Specialty:</span>
                    <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-medium">{team.specialty}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-yellow-500/20" title="Gold">
                      <i className="fa-solid fa-trophy text-yellow-400 text-xs"></i>
                      <span className="text-yellow-400 font-bold text-sm">{team.podiums.gold}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-500/20" title="Silver">
                      <i className="fa-solid fa-trophy text-gray-300 text-xs"></i>
                      <span className="text-gray-300 font-bold text-sm">{team.podiums.silver}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-orange-500/20" title="Bronze">
                      <i className="fa-solid fa-trophy text-orange-400 text-xs"></i>
                      <span className="text-orange-400 font-bold text-sm">{team.podiums.bronze}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {team.achievements.map((achievement, i) => (
                    <span key={i} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                      <i className="fa-solid fa-trophy mr-1"></i> {achievement}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-dark-lighter rounded-xl p-6 border border-light/10">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-light/60 text-sm">Total Teams</span>
            </div>
            <p className="text-2xl font-bold text-light">{teamsData.length}</p>
          </div>
          <div className="bg-dark-lighter rounded-xl p-6 border border-light/10">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-5 h-5 text-accent" />
              <span className="text-light/60 text-sm">Countries</span>
            </div>
            <p className="text-2xl font-bold text-light">{new Set(teamsData.map(t => t.country)).size}</p>
          </div>
          <div className="bg-dark-lighter rounded-xl p-6 border border-light/10">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-light/60 text-sm">Disciplines</span>
            </div>
            <p className="text-2xl font-bold text-light">5</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Teams
