import React, { useState, useEffect } from 'react'
import { Calculator, Trophy, Globe, Users, DollarSign, MapPin, Zap, Info, TrendingUp, Target, ChevronRight } from 'lucide-react'

const RatingCalculator = () => {
  const [category, setCategory] = useState('sumo')
  const [region, setRegion] = useState('local')
  const [competitors, setCompetitors] = useState(16)
  const [prizePool, setPrizePool] = useState('none')
  const [placement, setPlacement] = useState(1)
  const [currentRating, setCurrentRating] = useState(1500)
  const [avgOpponentRating, setAvgOpponentRating] = useState(1500)
  const [calculatedGain, setCalculatedGain] = useState(null)

  const categories = [
    { id: 'sumo', label: 'Sumo', icon: 'fa-robot' },
    { id: 'combat', label: 'Combat', icon: 'fa-swords' },
    { id: 'line', label: 'Line Following', icon: 'fa-route' },
    { id: 'maze', label: 'Maze Solving', icon: 'fa-puzzle-piece' },
    { id: 'hackathon', label: 'Hackathon', icon: 'fa-laptop-code' },
  ]

  const regions = [
    { id: 'local', label: 'Local/Club', multiplier: 0.6, desc: 'School clubs, local meetups' },
    { id: 'regional', label: 'Regional', multiplier: 0.8, desc: 'State/Province championships' },
    { id: 'national', label: 'National', multiplier: 1.0, desc: 'Country championships' },
    { id: 'continental', label: 'Continental', multiplier: 1.3, desc: 'EU, Asia Pacific, Americas' },
    { id: 'world', label: 'World Championship', multiplier: 1.6, desc: 'Global events, World finals' },
  ]

  const prizePools = [
    { id: 'none', label: 'No Prize Pool', multiplier: 1.0 },
    { id: 'small', label: '$100 - $1,000', multiplier: 1.1 },
    { id: 'medium', label: '$1,000 - $10,000', multiplier: 1.2 },
    { id: 'large', label: '$10,000 - $50,000', multiplier: 1.35 },
    { id: 'major', label: '$50,000+', multiplier: 1.5 },
  ]

  // URRS Rating Calculation
  const calculateRating = () => {
    const regionData = regions.find(r => r.id === region)
    const prizeData = prizePools.find(p => p.id === prizePool)
    
    // Base K-factor (how volatile ratings are)
    let kFactor = 32
    if (currentRating > 2000) kFactor = 24
    if (currentRating > 2200) kFactor = 16
    
    // Expected score based on rating difference
    const ratingDiff = avgOpponentRating - currentRating
    const expectedScore = 1 / (1 + Math.pow(10, ratingDiff / 400))
    
    // Actual score based on placement
    let actualScore
    if (placement === 1) actualScore = 1.0
    else if (placement === 2) actualScore = 0.75
    else if (placement === 3) actualScore = 0.5
    else if (placement <= Math.ceil(competitors * 0.25)) actualScore = 0.35
    else if (placement <= Math.ceil(competitors * 0.5)) actualScore = 0.2
    else actualScore = 0.05
    
    // Competitor bonus (more competitors = more points)
    const competitorBonus = Math.log2(competitors) / 4
    
    // Apply multipliers
    const regionMultiplier = regionData.multiplier
    const prizeMultiplier = prizeData.multiplier
    
    // Final calculation
    const baseGain = kFactor * (actualScore - expectedScore)
    const adjustedGain = baseGain * regionMultiplier * prizeMultiplier * (1 + competitorBonus)
    
    // Minimum gain for participation (if positive performance)
    const finalGain = Math.round(Math.max(actualScore > expectedScore ? 5 : adjustedGain, adjustedGain))
    
    setCalculatedGain({
      base: Math.round(baseGain),
      regionBonus: Math.round(baseGain * (regionMultiplier - 1)),
      prizeBonus: Math.round(baseGain * regionMultiplier * (prizeMultiplier - 1)),
      competitorBonus: Math.round(baseGain * regionMultiplier * prizeMultiplier * competitorBonus),
      total: finalGain,
      newRating: currentRating + finalGain,
      expectedScore: (expectedScore * 100).toFixed(1),
      actualScore: (actualScore * 100).toFixed(1)
    })
  }

  useEffect(() => {
    if (competitors > 0 && placement > 0 && placement <= competitors) {
      calculateRating()
    }
  }, [category, region, competitors, prizePool, placement, currentRating, avgOpponentRating])

  return (
    <div className="min-h-screen bg-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-light">Rating Calculator</h1>
              <p className="text-light/60">Calculate potential ELO gains from any competition</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Competition Details Card */}
            <div className="bg-dark-secondary rounded-2xl border border-light/10 p-6">
              <h2 className="text-xl font-bold text-light mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                Competition Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-light/70 mb-2">Category</label>
                  <div className="flex gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`flex-1 p-4 rounded-lg border text-center transition-all ${
                          category === cat.id
                            ? 'bg-accent/20 border-accent text-accent'
                            : 'bg-[#1a1a24] border-light/20 text-light/60 hover:border-light/40'
                        }`}
                      >
                        <i className={`fa-solid ${cat.icon} text-2xl`}></i>
                        <p className="text-xs mt-2 font-medium">{cat.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of Competitors */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-light/70 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Number of Competitors
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="500"
                    value={competitors}
                    onChange={(e) => setCompetitors(Math.max(2, parseInt(e.target.value) || 2))}
                    className="w-full bg-[#1a1a24] border border-light/20 rounded-lg px-4 py-3 text-light focus:outline-none focus:border-accent"
                  />
                  <p className="text-xs text-light/40 mt-1">More competitors = higher potential gain</p>
                </div>

                {/* Region/Scope */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-light/70 mb-2">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Competition Scope
                  </label>
                  <div className="flex gap-3">
                    {regions.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setRegion(r.id)}
                        className={`flex-1 p-4 rounded-lg border text-center transition-all ${
                          region === r.id
                            ? 'bg-accent/20 border-accent'
                            : 'bg-[#1a1a24] border-light/20 hover:border-light/40'
                        }`}
                      >
                        <p className={`text-sm font-medium ${region === r.id ? 'text-accent' : 'text-light'}`}>{r.label}</p>
                        <p className="text-xs text-light/40 mt-1">{r.multiplier}x</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prize Pool */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-light/70 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Prize Pool
                  </label>
                  <div className="flex gap-3">
                    {prizePools.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPrizePool(p.id)}
                        className={`flex-1 p-4 rounded-lg border text-center transition-all ${
                          prizePool === p.id
                            ? 'bg-accent/20 border-accent'
                            : 'bg-[#1a1a24] border-light/20 hover:border-light/40'
                        }`}
                      >
                        <p className={`text-sm font-medium ${prizePool === p.id ? 'text-accent' : 'text-light'}`}>{p.label}</p>
                        <p className="text-xs text-light/40 mt-1">{p.multiplier}x</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Your Performance Card */}
            <div className="bg-dark-secondary rounded-2xl border border-light/10 p-6">
              <h2 className="text-xl font-bold text-light mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Your Performance
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Rating */}
                <div>
                  <label className="block text-sm font-medium text-light/70 mb-2">Your Current Rating</label>
                  <input
                    type="number"
                    min="100"
                    max="3000"
                    value={currentRating}
                    onChange={(e) => setCurrentRating(Math.max(100, parseInt(e.target.value) || 1500))}
                    className="w-full bg-[#1a1a24] border border-light/20 rounded-lg px-4 py-3 text-light focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Avg Opponent Rating */}
                <div>
                  <label className="block text-sm font-medium text-light/70 mb-2">Average Opponent Rating</label>
                  <input
                    type="number"
                    min="100"
                    max="3000"
                    value={avgOpponentRating}
                    onChange={(e) => setAvgOpponentRating(Math.max(100, parseInt(e.target.value) || 1500))}
                    className="w-full bg-[#1a1a24] border border-light/20 rounded-lg px-4 py-3 text-light focus:outline-none focus:border-accent"
                  />
                  <p className="text-xs text-light/40 mt-1">Beating higher-rated opponents = more points</p>
                </div>

                {/* Placement */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-light/70 mb-2">Your Placement</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max={competitors}
                      value={placement}
                      onChange={(e) => setPlacement(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-[#1a1a24] rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                    <div className="w-24 text-center">
                      <span className={`text-2xl font-bold ${
                        placement === 1 ? 'text-yellow-400' :
                        placement === 2 ? 'text-gray-300' :
                        placement === 3 ? 'text-orange-400' :
                        'text-light'
                      }`}>
                        {placement === 1 && <i className="fa-solid fa-medal mr-1"></i>}
                        {placement === 2 && <i className="fa-solid fa-medal mr-1"></i>}
                        {placement === 3 && <i className="fa-solid fa-medal mr-1"></i>}
                        #{placement}
                      </span>
                      <p className="text-xs text-light/40">of {competitors}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Card */}
            {calculatedGain && (
              <div className="bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-2xl border border-accent/30 p-6">
                <h2 className="text-xl font-bold text-light mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Rating Change Breakdown
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-dark/50 rounded-xl p-4 text-center">
                    <p className="text-sm text-light/60 mb-1">Base Change</p>
                    <p className={`text-2xl font-bold ${calculatedGain.base >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {calculatedGain.base >= 0 ? '+' : ''}{calculatedGain.base}
                    </p>
                  </div>
                  <div className="bg-dark/50 rounded-xl p-4 text-center">
                    <p className="text-sm text-light/60 mb-1">Scope Bonus</p>
                    <p className="text-2xl font-bold text-blue-400">+{calculatedGain.regionBonus}</p>
                  </div>
                  <div className="bg-dark/50 rounded-xl p-4 text-center">
                    <p className="text-sm text-light/60 mb-1">Prize Bonus</p>
                    <p className="text-2xl font-bold text-yellow-400">+{calculatedGain.prizeBonus}</p>
                  </div>
                  <div className="bg-dark/50 rounded-xl p-4 text-center">
                    <p className="text-sm text-light/60 mb-1">Size Bonus</p>
                    <p className="text-2xl font-bold text-purple-400">+{calculatedGain.competitorBonus}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-dark/50 rounded-xl p-6">
                  <div>
                    <p className="text-sm text-light/60">Current Rating</p>
                    <p className="text-3xl font-bold text-light">{currentRating}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-8 h-8 text-accent" />
                    <div className={`px-4 py-2 rounded-lg ${calculatedGain.total >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      <span className={`text-2xl font-bold ${calculatedGain.total >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {calculatedGain.total >= 0 ? '+' : ''}{calculatedGain.total}
                      </span>
                    </div>
                    <ChevronRight className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-light/60">New Rating</p>
                    <p className="text-3xl font-bold text-accent">{calculatedGain.newRating}</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-4 text-sm text-light/60">
                  <span>Expected performance: {calculatedGain.expectedScore}%</span>
                  <span>•</span>
                  <span>Actual performance: {calculatedGain.actualScore}%</span>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Formula & Info */}
          <div className="space-y-6">
            {/* URRS Explained */}
            <div className="bg-dark-secondary rounded-2xl border border-light/10 p-6">
              <h2 className="text-lg font-bold text-light mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-accent" />
                URRS Formula
              </h2>
              <p className="text-sm text-light/70 mb-4">
                The <span className="text-accent font-semibold">Unified Robotics Rating System</span> is based on the ELO system used in chess, adapted for robotics competitions.
              </p>
              
              <div className="bg-[#1a1a24] rounded-lg p-4 font-mono text-sm text-light/80 mb-4">
                <p className="text-accent mb-2">// Rating Change Formula</p>
                <p>ΔR = K × (S - E) × M<sub>r</sub> × M<sub>p</sub> × B<sub>c</sub></p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-light/60">K</span>
                  <span className="text-light">K-factor (16-32)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light/60">S</span>
                  <span className="text-light">Actual Score (0-1)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light/60">E</span>
                  <span className="text-light">Expected Score</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light/60">M<sub>r</sub></span>
                  <span className="text-light">Region Multiplier</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light/60">M<sub>p</sub></span>
                  <span className="text-light">Prize Multiplier</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light/60">B<sub>c</sub></span>
                  <span className="text-light">Competitor Bonus</span>
                </div>
              </div>
            </div>

            {/* Regional Pathway */}
            <div className="bg-gradient-to-br from-green-500/10 to-accent/10 rounded-2xl border border-green-500/20 p-6">
              <h2 className="text-lg font-bold text-light mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-400" />
                Regional Pathway
              </h2>
              <p className="text-sm text-light/70 mb-4">
                RoboRank ensures competitors from any region can reach the global leaderboard. Here's how:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 text-xs font-bold">1</span>
                  </div>
                  <p className="text-sm text-light/80">
                    <span className="text-green-400 font-medium">Start Local:</span> Win your school/club competitions to build initial rating
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 text-xs font-bold">2</span>
                  </div>
                  <p className="text-sm text-light/80">
                    <span className="text-green-400 font-medium">Go National:</span> Dominate national events for rating boosts
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 text-xs font-bold">3</span>
                  </div>
                  <p className="text-sm text-light/80">
                    <span className="text-green-400 font-medium">Continental:</span> Qualify for regional championships
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-accent text-xs font-bold">4</span>
                  </div>
                  <p className="text-sm text-light/80">
                    <span className="text-accent font-medium">World Stage:</span> Compete at World Championships!
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-dark/50 rounded-lg">
                <p className="text-xs text-light/60">
                  <i className="fa-solid fa-lightbulb text-yellow-400 mr-1"></i> <span className="text-light/80">Example:</span> A competitor from Kenya winning their National Championship (1.0x) with 50 competitors can gain <span className="text-green-400 font-bold">+45 to +60</span> rating points!
                </p>
              </div>
            </div>

            {/* Quick Scenarios */}
            <div className="bg-dark-secondary rounded-2xl border border-light/10 p-6">
              <h2 className="text-lg font-bold text-light mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Quick Scenarios
              </h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setRegion('local')
                    setCompetitors(8)
                    setPrizePool('none')
                    setPlacement(1)
                    setAvgOpponentRating(1400)
                  }}
                  className="w-full text-left p-3 bg-[#1a1a24] rounded-lg hover:bg-[#1a1a24]/80 transition-colors"
                >
                  <p className="text-sm font-medium text-light"><i className="fa-solid fa-school text-blue-400 mr-2"></i>School Club Win</p>
                  <p className="text-xs text-light/50">Local • 8 competitors • 1st place</p>
                </button>
                
                <button
                  onClick={() => {
                    setRegion('national')
                    setCompetitors(64)
                    setPrizePool('small')
                    setPlacement(1)
                    setAvgOpponentRating(1600)
                  }}
                  className="w-full text-left p-3 bg-[#1a1a24] rounded-lg hover:bg-[#1a1a24]/80 transition-colors"
                >
                  <p className="text-sm font-medium text-light"><i className="fa-solid fa-trophy text-yellow-400 mr-2"></i>National Championship</p>
                  <p className="text-xs text-light/50">National • 64 competitors • 1st place</p>
                </button>
                
                <button
                  onClick={() => {
                    setRegion('continental')
                    setCompetitors(128)
                    setPrizePool('medium')
                    setPlacement(3)
                    setAvgOpponentRating(1800)
                  }}
                  className="w-full text-left p-3 bg-[#1a1a24] rounded-lg hover:bg-[#1a1a24]/80 transition-colors"
                >
                  <p className="text-sm font-medium text-light"><i className="fa-solid fa-earth-americas text-green-400 mr-2"></i>Continental Bronze</p>
                  <p className="text-xs text-light/50">Continental • 128 competitors • 3rd place</p>
                </button>
                
                <button
                  onClick={() => {
                    setRegion('world')
                    setCompetitors(256)
                    setPrizePool('major')
                    setPlacement(1)
                    setAvgOpponentRating(2100)
                  }}
                  className="w-full text-left p-3 bg-[#1a1a24] rounded-lg hover:bg-[#1a1a24]/80 transition-colors"
                >
                  <p className="text-sm font-medium text-light"><i className="fa-solid fa-crown text-yellow-400 mr-2"></i>World Champion</p>
                  <p className="text-xs text-light/50">World • 256 competitors • 1st place</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingCalculator
