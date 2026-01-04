import React from 'react'

const RatingBadge = ({ rating, division, size = 'md', showTrend = false, trend = null }) => {
  const getDivisionColor = (div) => {
    switch (div) {
      case 'Masters': return 'from-purple-500 to-purple-700'
      case 'Gold': return 'from-yellow-400 to-yellow-600'
      case 'Silver': return 'from-gray-300 to-gray-500'
      case 'Bronze': return 'from-orange-400 to-orange-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getDivisionIcon = (div) => {
    switch (div) {
      case 'Masters': return <i className="fa-solid fa-crown"></i>
      case 'Gold': return <i className="fa-solid fa-medal"></i>
      case 'Silver': return <i className="fa-solid fa-medal"></i>
      case 'Bronze': return <i className="fa-solid fa-medal"></i>
      default: return <i className="fa-solid fa-star"></i>
    }
  }

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${getDivisionColor(division)} rounded-lg ${sizeClasses[size]}`}>
      <span>{getDivisionIcon(division)}</span>
      <span className="font-bold text-dark">{rating}</span>
      {showTrend && trend && (
        <span className={`text-xs font-medium ${parseInt(trend) > 0 ? 'text-green-900' : 'text-red-900'}`}>
          {parseInt(trend) > 0 ? `↗${trend}` : `↘${trend}`}
        </span>
      )}
    </div>
  )
}

export default RatingBadge