import React from 'react'

interface ProgressRingProps {
  progress: number
  size: number
  strokeWidth: number
}

export const ProgressRing: React.FC<ProgressRingProps> = ({ progress, size, strokeWidth }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <svg height={size} width={size} className="transform -rotate-90">
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
    </svg>
  )
}