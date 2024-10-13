import React from 'react'

export const Sparkles: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative inline-block">
      {children}
      <span className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Add sparkle effect here */}
      </span>
    </div>
  )
}