import React from 'react'

export const FloatingElement: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="animate-bounce">
      {children}
    </div>
  )
}