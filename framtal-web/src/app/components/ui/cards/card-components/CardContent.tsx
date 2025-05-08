import React, { ReactNode } from 'react'

interface CardContentProps {
  title: string
  children: ReactNode
}

const CardContent: React.FC<CardContentProps> = ({ title, children }) => {
  return (
    <div className="flex-1">
      <h3 className="text-sm xl:text-2xl font-semibold text-primary-blue-400 mb-2">{title}</h3>
      {children}
    </div>
  )
}

export default CardContent
