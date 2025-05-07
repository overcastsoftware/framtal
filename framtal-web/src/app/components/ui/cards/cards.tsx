import React from 'react'

type CardItem = {
  id: string
  amount: number
  entity: string
  nationalId: string
}

type DisplayCardProps = {
  title: string
  totalAmount: number
  items: CardItem[]
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('is-IS', {
    style: 'currency',
    currency: 'ISK',
    maximumFractionDigits: 0,
  }).format(amount)
}

const DisplayCard: React.FC<DisplayCardProps> = ({ title, totalAmount, items }) => {
  return (
    <div className="bg-white rounded-lg justify-between min-h-80 flex flex-col p-6 border border-primary-blue-200 hover:border-primary-blue-300">
      <div>
        <h3 className="text-2xl font-semibold text-primary-blue-400 mb-2">{title}</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="">
              <div className="flex justify-between">
                <span className="text-gray-600">{item.entity}</span>
                <span className="text-gray-600">{formatCurrency(item.amount)}</span>
              </div>
              {/* <div className="text-xs text-gray-500">Kennitala: {item.nationalId}</div> */}
            </div>
          ))}
          <div className="flex justify-between mt-3">
            <span className="text-gray-600">Samtals:</span>
            <span className="text-md text-right font-bold text-primary-header">
              {formatCurrency(totalAmount)}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button className="mt-4 cursor-pointer bg-white text-primary-header border border-primary-blue-200 rounded-lg font-semibold py-2 px-4">
          Breyta
        </button>
      </div>
    </div>
  )
}

export default DisplayCard
