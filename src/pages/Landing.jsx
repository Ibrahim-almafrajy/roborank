import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Zap, Trophy, Globe, Users, TrendingUp, Target, 
  ChevronRight, Play, Star, Award, MapPin, Calendar 
} from 'lucide-react'

const Landing = () => {
  const painPoints = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Fragmented Competitions",
      description: "VEX, FIRST, local events - none talk to each other.  Your achievements stay siloed."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title:  "Geographic Barriers",
      description: "No competitions near you? No pathway to compete.  Talent goes unrecognized."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "No Unified Progression",
      description: "Win a tournament, then what? No ranking, no league, no clear path forward."
    }
  ]

  const features = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Universal Rating System",
      description: "One ELO-style rating across ALL robotics competitions. Finally know where you stand.",
      color: "text-yellow-400"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title:  "Tournament Infrastructure",
      description: "Easy bracket generation, registration, and scheduling for any organizer.",
      color: "text-accent"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title:  "Online-to-Offline Pipeline",
      description: "Virtual qualifiers → Regional finals → World championships.  Compete from anywhere.",
      color: "text-green-400"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title:  "Seasonal Leagues",
      description: "Bronze, Silver, Gold, Masters divisions with promotion and relegation.",
      color: "text-purple-400"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Discovery Platform",
      description: "Find competitions near you, register instantly, track your progression.",
      color: "text-orange-400"
    }
  ]

  const stats = [
    { value: "2,847", label: "Active Competitors" },
    { value: "47", label: "Live Tournaments" },
    { value:  "89", label: "Countries" },
    { value: "$127K", label: "Prize Pool" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-secondary to-dark"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        {/* Circuit Lines SVG Background */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Left side circuits */}
          <path d="M0 200 L100 200 L100 150 L150 150" stroke="#30bced" strokeWidth="2" fill="none" className="animate-pulse" />
          <circle cx="150" cy="150" r="4" fill="#30bced" className="animate-pulse" />
          <path d="M0 300 L80 300 L80 250 L120 250 L120 200" stroke="#30bced" strokeWidth="2" fill="none" />
          <circle cx="120" cy="200" r="4" fill="#30bced" />
          <path d="M0 400 L60 400 L60 350 L100 350" stroke="#30bced" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="350" r="3" fill="#30bced" />
          <path d="M0 500 L120 500 L120 450 L180 450 L180 400" stroke="#30bced" strokeWidth="2" fill="none" />
          <circle cx="180" cy="400" r="4" fill="#30bced" />
          <path d="M50 100 L50 180 L90 180" stroke="#30bced" strokeWidth="1.5" fill="none" />
          <circle cx="90" cy="180" r="3" fill="#30bced" />
          
          {/* Right side circuits */}
          <path d="M100% 200 L calc(100% - 100px) 200 L calc(100% - 100px) 150 L calc(100% - 150px) 150" stroke="#30bced" strokeWidth="2" fill="none" style={{transform: 'scaleX(-1)', transformOrigin: 'center'}} />
          <path d="M1400 180 L1300 180 L1300 130 L1250 130" stroke="#30bced" strokeWidth="2" fill="none" className="animate-pulse" />
          <circle cx="1250" cy="130" r="4" fill="#30bced" className="animate-pulse" />
          <path d="M1400 280 L1320 280 L1320 230 L1280 230 L1280 180" stroke="#30bced" strokeWidth="2" fill="none" />
          <circle cx="1280" cy="180" r="4" fill="#30bced" />
          <path d="M1400 380 L1340 380 L1340 330 L1300 330" stroke="#30bced" strokeWidth="1.5" fill="none" />
          <circle cx="1300" cy="330" r="3" fill="#30bced" />
          <path d="M1400 480 L1280 480 L1280 430 L1220 430 L1220 380" stroke="#30bced" strokeWidth="2" fill="none" />
          <circle cx="1220" cy="380" r="4" fill="#30bced" />
          <path d="M1350 100 L1350 160 L1310 160" stroke="#30bced" strokeWidth="1.5" fill="none" />
          <circle cx="1310" cy="160" r="3" fill="#30bced" />
          
          {/* Vertical connector lines */}
          <path d="M200 0 L200 80 L250 80 L250 120" stroke="#30bced" strokeWidth="1.5" fill="none" />
          <circle cx="250" cy="120" r="3" fill="#30bced" />
          <path d="M300 0 L300 60 L350 60" stroke="#30bced" strokeWidth="1" fill="none" />
          <circle cx="350" cy="60" r="2" fill="#30bced" />
          
          <path d="M1200 0 L1200 80 L1150 80 L1150 120" stroke="#30bced" strokeWidth="1.5" fill="none" />
          <circle cx="1150" cy="120" r="3" fill="#30bced" />
          <path d="M1100 0 L1100 60 L1050 60" stroke="#30bced" strokeWidth="1" fill="none" />
          <circle cx="1050" cy="60" r="2" fill="#30bced" />
          
          {/* Bottom circuits */}
          <path d="M400 600 L400 550 L450 550 L450 500" stroke="#30bced" strokeWidth="1.5" fill="none" />
          <circle cx="450" cy="500" r="3" fill="#30bced" />
          <path d="M1000 600 L1000 550 L950 550 L950 500" stroke="#30bced" strokeWidth="1.5" fill="none" />
          <circle cx="950" cy="500" r="3" fill="#30bced" />
        </svg>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg: px-8">
          <div className="text-center">

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-light mb-6 leading-tight">
              The Competitive Infrastructure
              <br />
              <span className="gradient-text">for Robotics Sport</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              Chess. com for robotics.  Unified ratings, tournament management, and 
              accessible pathways to make robotics a legitimate sport.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/dashboard"
                className="group flex items-center space-x-2 bg-accent hover:bg-accent/90 text-dark font-bold px-8 py-4 rounded-xl transition-all duration-300 glow-accent"
              >
                <span>See Demo</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="flex items-center space-x-2 bg-dark-secondary hover:bg-gray-800 text-light font-medium px-8 py-4 rounded-xl border border-gray-700 transition-all">
                <Play className="w-5 h-5" />
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 bg-dark-secondary/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-accent">{stat.value}</p>
                <p className="text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-light mb-4">
              Robotics Has a Competition Problem
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The talent exists.  The passion exists. What's missing is the infrastructure 
              to connect, compete, and grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <div 
                key={index}
                className="bg-dark border border-gray-800 rounded-xl p-8 text-center card-hover"
              >
                <div className="w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center text-red-400 mx-auto mb-6">
                  {point.icon}
                </div>
                <h3 className="text-xl font-bold text-light mb-3">{point.title}</h3>
                <p className="text-gray-400">{point.description}</p>
              </div>
            ))}
          </div>

          {/* Personal Story */}
          <div className="mt-16 bg-gradient-to-r from-accent/10 to-purple-500/10 border border-accent/30 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center text-dark text-3xl font-bold shrink-0">
                AC
              </div>
              <div>
                <p className="text-lg text-light italic mb-4">
                  "I'm from Cyprus - there ARE no robotics competitions here. I built robots 
                  for years with nowhere to compete, no way to know if I was any good.  This 
                  platform fixes that.  Online qualifiers let me compete globally, and now I'm 
                  ranked #234 in the world."
                </p>
                <p className="text-accent font-semibold">Alex Chen • Gold Division • 1847 Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-light mb-4">
              The Solution: Complete Competitive Infrastructure
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything robotics needs to become a legitimate sport, in one platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-dark-secondary border border-gray-800 rounded-xl p-6 card-hover group"
              >
                <div className={`w-12 h-12 bg-dark rounded-xl flex items-center justify-center ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-light mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-light mb-4">
              From Anywhere to World Stage
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our online-to-offline pipeline creates pathways for talent everywhere.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {[
              { step: "1", title: "Join Online Qualifier", desc: "Compete from home" },
              { step: "2", title: "Earn Your Rating", desc: "Rise through divisions" },
              { step: "3", title: "Qualify for Regionals", desc: "Top performers advance" },
              { step:  "4", title: "World Championship", desc: "Compete for the title" }
            ].map((item, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-accent text-dark rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-light mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
                {index < 3 && (
                  <ChevronRight className="w-8 h-8 text-gray-600 hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg: px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-light mb-6">
            Ready to Compete?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join thousands of robotics competitors worldwide. Find tournaments, 
            build your rating, and prove yourself on the global stage.
          </p>
          <Link 
            to="/dashboard"
            className="inline-flex items-center space-x-2 bg-accent hover: bg-accent/90 text-dark font-bold px-10 py-5 rounded-xl transition-all duration-300 glow-accent text-lg"
          >
            <span>Explore Dashboard</span>
            <ChevronRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Landing