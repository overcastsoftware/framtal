import React from 'react'

type CardItem = {
  id: string
  amount: number
  entity?: string
  nationalId?: string
  description?: string
  assetType?: string
  assetIdentifier?: string
  identifier?: string
  totalCost: number
}

type DisplayCardProps = {
  type: string
  category: string
  title: string
  totalAmount: number
  items: CardItem[]
  type?: string
  showTotal?: boolean
  parentType?: string
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('is-IS', {
    style: 'currency',
    currency: 'ISK',
    maximumFractionDigits: 0,
  }).format(amount)
}

const DisplayCard: React.FC<DisplayCardProps> = ({
  title,
  totalAmount,
  items,
  type,
  category,
  parentType,
}) => {
  if (parentType === 'debt') {
    console.log(type)
  }
  console.log(parentType)
  return (
    <div className="bg-white rounded-lg justify-between min-h-80 flex flex-col p-6 border border-primary-blue-200 hover:border-primary-blue-300">
      <div>
        <h3 className="text-2xl font-semibold text-primary-blue-400 mb-2">{title}</h3>
        <div className="space-y-2">
          {parentType === 'debt' && type === 'other' && (
            <div className="flex justify-between mt-3">
              <span className="text-gray-600 font-semibold">Tegund</span>
              <span className="text-md text-right font-semibold text-primary-header">
                Eftirstöðvar
              </span>
            </div>
          )}
          {items.map((item) => (
            <div key={item.id} className="">
              {parentType === 'domestic_property' && (
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{item.description}</span>
                    <span className="text-gray-600">{formatCurrency(item.amount)}</span>
                  </div>
                  <span className="text-gray-600">{item.identifier}</span>
                </div>
              )}
              {parentType === 'vehicle' && (
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{item.identifier}</span>
                    <span className="text-gray-600">{formatCurrency(item.amount)}</span>
                  </div>
                </div>
              )}
              {parentType === 'debt' && type === 'property' && (
                <div className="flex justify-between mt-3">
                  <span className="text-gray-600">Samtals:</span>
                  <span className="text-md text-right font-bold text-primary-header">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              )}
              {parentType === 'debt' && type === 'other' && (
                <div className="flex flex-col">
                  <div className="flex justify-between gap-2 mt-3">
                    <span className="text-gray-600">{item.description}</span>
                    <span className="text-md text-right text-primary-header">
                      {formatCurrency(item.totalCost)}
                    </span>
                  </div>
                </div>
              )}
              {/* Alternative display for debt type */}
              {/* {parentType === 'debt' && type === 'other' && (
                <div className="flex flex-col">
                  <span className="text-gray-600 font-semibold">{item.description}</span>
                  <div className="flex justify-between mt-3">
                    <span className="text-gray-600">Vaxtagjöld</span>
                    <span className="text-md text-right font-bold text-primary-header">
                      {formatCurrency(item.totalCost)}
                    </span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-gray-600">Eftirstöðvar</span>
                    <span className="text-md text-right font-bold text-primary-header">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                </div>
              )} */}
              {type === 'income' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">{item.entity}</span>
                  <span className="text-gray-600">{formatCurrency(item.amount)}</span>
                </div>
              )}
              {/* <div className="text-xs text-gray-500">Kennitala: {item.nationalId}</div> */}
            </div>
          ))}
          {parentType === 'salary' && (
            <div className="flex justify-between mt-3">
              <span className="text-gray-600">Samtals:</span>
              <span className="text-md text-right font-bold text-primary-header">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex justify-end">
        <a href={`/${category}/${type}`} className="mt-4 cursor-pointer bg-white text-primary-header border border-primary-blue-200 rounded-lg font-semibold py-2 px-4">
          Breyta
        </a>
      </div>
    </div>
  )
}

export default DisplayCard
