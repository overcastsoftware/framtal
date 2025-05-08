import { CardItem } from '@/app/types/financialTypes'
import { formatCurrency } from '@/lib/utils'
import React from 'react'

type DisplayCardProps = {
  type: string
  category: string
  title: string
  totalAmount: number
  items: CardItem[]
  showTotal?: boolean
  parentType?: string
}

const DisplayCard: React.FC<DisplayCardProps> = ({
  title,
  totalAmount,
  items,
  type,
  category,
  parentType,
}) => {
  return (
    <div className="bg-white rounded-lg justify-between lg:min-h-80 flex flex-col p-6 border-2 border-primary-blue-200 duration-100 ease-in hover:border-primary-blue-400">
      <div>
        <h3 className="text-sm xl:text-2xl font-semibold text-primary-blue-400 mb-2">{title}</h3>
        <div className="space-y-2">
          {parentType === 'debt' && type === 'other' && (
            <div className="flex justify-between gap-2 lg:mt-2 ">
              <span className="text-primary-dark-400 font-semibold  flex-1">Tegund</span>
              <span className="text-md text-right font-semibold text-primary-header  flex-1">
                Eftirstöðvar
              </span>
            </div>
          )}
          {items.map((item) => (
            <div key={item.id} className="">
              {parentType === 'domestic_property' && (
                <div className="flex flex-col">
                  <div className="flex justify-between gap-2">
                    <span className="text-primary-dark-400 flex-1">{item.description}</span>
                    <span className="text-primary-dark-400 flex-1  text-right">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                  <span className="text-primary-dark-400">{item.identifier}</span>
                </div>
              )}
              {parentType === 'vehicle' && (
                <div className="flex flex-col">
                  <div className="flex justify-between gap-2">
                    <span className="text-primary-dark-400 flex-1">{item.identifier}</span>
                    <span className="text-primary-dark-400 flex-1  text-right">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                </div>
              )}
              {parentType === 'other' && (
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{item.identifier}</span>
                    <span className="text-gray-600">{formatCurrency(item.amount)}</span>
                  </div>
                </div>
              )}
              {parentType === 'debt' && type === 'property' && (
                <div className="flex flex-col">
                  <div className="flex justify-between gap-2 lg:mt-2">
                    <span className="text-primary-dark-400 flex-1">{item.description}</span>
                    <span className="text-md text-right text-primary-header flex-1"></span>
                  </div>
                  <div className="flex justify-between gap-2 lg:mt-2">
                    <span className="text-primary-header flex-1">Eftirstöðvar:</span>
                    <span className="text-md text-right text-primary-header flex-1">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2 lg:mt-2">
                    <span className="text-primary-dark-400 flex-1">Lánveitandi:</span>
                    <span className="text-md text-right text-primary-header flex-1">
                      {item.lender?.name || item.lenderId}
                    </span>
                  </div>
                </div>
              )}
              {parentType === 'debt' && type === 'other' && (
                <div className="flex flex-col">
                  <div className="flex justify-between gap-2 lg:mt-2">
                    <span className="text-primary-dark-400 flex-1">{item.description}</span>
                    <span className="text-md text-right text-primary-header flex-1">
                      {formatCurrency(item.totalCost)}
                    </span>
                  </div>
                </div>
              )}
              {category === 'tekjur' && (
                <div>
                  <div className="flex justify-between gap-2">
                    <span className="text-primary-dark-400 flex-1">{item.entity}</span>
                    <span className="text-primary-dark-400 flex-1 text-right">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                </div>
              )}
              {/* <div className="text-xs text-gray-500">Kennitala: {item.nationalId}</div> */}
            </div>
          ))}
          {category === 'tekjur' && type === 'salary' && (
            <div className="flex justify-between gap-2 lg:mt-2">
              <span className="text-primary-dark-400 flex-1">Samtals:</span>
              <span className="text-md text-right font-bold text-primary-header flex-1">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="w-full mt-2 flex justify-end">
        <a
          href={`/${category}/${type}`}
          // className="btn-link hover:shadow-[inset_0px_-2px_0px_0px_rgba(0,97,255,1.00)]  shadow-[inset_0px_-1px_0px_0px_rgba(0,97,255,1.00)]"
          className="btn-utility"
        >
          Breyta
        </a>
      </div>
    </div>
  )
}

export default DisplayCard
