import React, { ReactNode } from 'react'

interface CardWrapperProps {
  children: ReactNode
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-lg justify-between lg:min-h-80 flex flex-col p-6 border-2 border-primary-blue-200 duration-100 ease-in hover:border-primary-blue-400">
      {children}
    </div>
  )
}

export default CardWrapper
