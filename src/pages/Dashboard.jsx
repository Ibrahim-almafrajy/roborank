import React from 'react'
import { Link } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { 
  Trophy, TrendingUp, Calendar, MapPin, Globe, 
  ChevronRight, Award, Target, Zap, Star 
} from 'lucide-react'
import RatingBadge from '../components/RatingBadge'
import MatchCard from '../components/MatchCard'
import TournamentCard from '../components/TournamentCard'
import matchesData from '../data/matches.json'
import tournamentsData from '../data/tournaments.json'

const Dashboard = () => {
  const user = {
    name: "Ibrahim A.",
    country: "Cyprus",
    countryCode: "CY",
    rating: 2347,
    division: "Masters",
    globalRank: 1,
    regionalRank: 1,
    seasonTrend: "+124",
    podiums: { gold: 12, silver: 8, bronze: 5 },
    competitions: 32
  }

  const upcomingTournaments = tournamentsData.slice(0, 3)
  const recentMatches = matchesData. recentMatches
  const ratingHistory = matchesData.ratingHistory

  const getFlagEmoji = (countryCode) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt())
    return String.fromCodePoint(...codePoints)
  }

  return (
    <div className="min-h-screen bg-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg: px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-light">Welcome back, {user.name. split(' ')[0]}!</h1>
          <p className="text-gray-400 mt-1">Here's your competitive overview</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Rating Card */}
            <div className="bg-dark-secondary border border-gray-800 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center text-dark text-2xl font-bold">
                    AC
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-light">{user.name}</h2>
                    <div className="flex items-center space-x-2 text-gray-400 mt-1">
                      <span>{getFlagEmoji(user.countryCode)}</span>
                      <span>{user.country}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-start md:items-end">
                  <RatingBadge 
                    rating={user.rating} 
                    division={user.division} 
                    size="lg"
                    showTrend={true}
                    trend={user.seasonTrend}
                  />
                  <p className="text-sm text-gray-400 mt-2">Season 2026</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-dark rounded-xl p-4 text-center">
                  <Globe className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-light">#{user.globalRank}</p>
                  <p className="text-xs text-gray-400">Global Rank</p>
                </div>
                <div className="bg-dark rounded-xl p-4 text-center">
                  <MapPin className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-light">#{user. regionalRank}</p>
                  <p className="text-xs text-gray-400">Cyprus Rank</p>
                </div>
                <div className="bg-dark rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-400 mb-3">Podiums</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/20 grid place-items-center" title="Gold">
                      <span className="text-yellow-400 font-bold text-lg leading-none">{user.podiums.gold}</span>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-gray-500/20 grid place-items-center" title="Silver">
                      <span className="text-gray-300 font-bold text-lg leading-none">{user.podiums.silver}</span>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 grid place-items-center" title="Bronze">
                      <span className="text-orange-400 font-bold text-lg leading-none">{user.podiums.bronze}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-dark rounded-xl p-4 text-center">
                  <Target className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-light">{user.competitions}</p>
                  <p className="text-xs text-gray-400">Competitions</p>
                </div>
              </div>
            </div>

            {/* Rating Chart */}
            <div className="bg-dark-secondary border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-light">Rating Progression</h3>
                <div className="flex items-center space-x-2 text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+347 this season</span>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ratingHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f1f2e" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#6b7280" 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
                    />
                    <YAxis 
                      stroke="#6b7280" 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      domain={[1400, 2000]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor:  '#15151e', 
                        border: '1px solid #30bced',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#fffaff' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="rating" 
                      stroke="#30bced" 
                      strokeWidth={3}
                      dot={{ fill:  '#30bced', strokeWidth: 2 }}
                      activeDot={{ r: 8, fill: '#30bced' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Matches */}
            <div className="bg-dark-secondary border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-light">Recent Matches</h3>
                <Link to="/tournaments" className="text-accent text-sm hover:underline flex items-center">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentMatches. map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Season Progress */}
            <div className="bg-dark-secondary border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-light mb-4">Season Progress</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">To Grandmaster Division</span>
                    <span className="text-accent">153 points</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width:  '85%' }}></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Current Division</span>
                    <span className="text-purple-400 font-semibold"><i className="fa-solid fa-crown mr-1"></i> Masters</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-400 text-sm">Next Division</span>
                    <span className="text-red-400 font-semibold"><i className="fa-solid fa-fire mr-1"></i> Grandmaster</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Tournaments */}
            <div className="bg-dark-secondary border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-light">Upcoming Tournaments</h3>
                <Link to="/tournaments" className="text-accent text-sm hover:underline">
                  See all
                </Link>
              </div>
              
              <div className="space-y-4">
                {upcomingTournaments.map((tournament) => (
                  <Link 
                    key={tournament. id} 
                    to={`/tournament/${tournament.id}`}
                    className="block bg-dark rounded-xl p-4 border border-gray-800 hover: border-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        tournament.type === 'online' 
                          ? 'bg-accent/20 text-accent' 
                          : 'bg-orange-500/20 text-orange-400'
                      }`}>
                        {tournament.type}
                      </span>
                      {tournament.status === 'live' && (
                        <span className="flex items-center space-x-1 text-green-400 text-xs">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          <span>LIVE</span>
                        </span>
                      )}
                    </div>
                    <h4 className="text-light font-medium mb-1">{tournament.name}</h4>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      {tournament. date}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-light mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  to="/tournaments"
                  className="flex items-center justify-between bg-dark/50 rounded-xl p-4 hover:bg-dark transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-5 h-5 text-accent" />
                    <span className="text-light">Find Tournament</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
                <Link 
                  to="/leaderboard"
                  className="flex items-center justify-between bg-dark/50 rounded-xl p-4 hover:bg-dark transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-yellow-400" />
                    <span className="text-light">View Leaderboard</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
                <button className="flex items-center justify-between bg-dark/50 rounded-xl p-4 hover: bg-dark transition-colors w-full">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <span className="text-light">Quick Match</span>
                  </div>
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Soon</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard