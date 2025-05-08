import React from 'react'

interface CardFooterProps {
  category: string
  type: string
}

const CardFooter: React.FC<CardFooterProps> = ({ category, type }) => {
  return (
    <div className="w-full mt-2 flex justify-end">
      <a href={`/${category}/${type}`} className="btn-utility">
        Breyta{' '}
      </a>
    </div>
  )
}

export default CardFooter

// <a href={`/${category}/${type}`} className="btn-utility">
//           Breyta
//         </a>
