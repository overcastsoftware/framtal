import { CardItem, FinancialTypes } from '@/app/types/financialTypes'
import { formatCurrency } from '@/lib/utils'
import React from 'react'
import CardWrapper from './card-components/CardWrapper'
import CardContent from './card-components/CardContent'
import CardFooter from './card-components/CardFooter'
import {
  DomesticPropertyItem,
  VehicleItem,
  PropertyDebtItem,
  OtherDebtItem,
  IncomeItem,
} from './card-components/CardItems'

type DisplayCardProps = {
  type: string
  category: string
  title: string
  totalAmount: number
  items: CardItem[]
  showTotal?: boolean
  uri: string
}

const DisplayCard: React.FC<DisplayCardProps> = ({
  title,
  totalAmount,
  items,
  type,
  category,
  uri,
}) => {
  console.log(type)

  const renderCardHeader = () => {
    if (category === FinancialTypes.DEBT.category && type === 'other') {
      return (
        <div className="flex justify-between gap-2 lg:mt-2">
          <span className="text-primary-dark-400 font-medium flex-1">Tegund</span>
          <span className="text-md text-right font-medium text-primary-header flex-1">
            Vaxtagjöld
          </span>
        </div>
      )
    }
    return null
  }

  const renderCardFooter = () => {
    if (category === FinancialTypes.INCOME.category && type === 'salary') {
      return (
        <div className="flex justify-between gap-2 lg:mt-4">
          <span className="text-md font-medium text-primary-header flex-1">Samtals:</span>
          <span className="text-md text-right font-medium text-primary-header flex-1">
            {formatCurrency(totalAmount)}
          </span>
        </div>
      )
    }
    return null
  }

  const renderItem = (item: CardItem) => {
    if (type === 'domestic_property') {
      return <DomesticPropertyItem item={item} />
    }

    if (type === 'vehicle') {
      return <VehicleItem item={item} />
    }

    if (type === 'other') {
      return <VehicleItem item={item} />
    }

    if (category === FinancialTypes.DEBT.category && type === 'property') {
      return <PropertyDebtItem item={item} />
    }

    if (category === FinancialTypes.DEBT.category && type === 'other') {
      return <OtherDebtItem item={item} />
    }

    if (category === FinancialTypes.INCOME.category) {
      return <IncomeItem item={item} />
    }

    return null
  }

  return (
    <CardWrapper>
      <CardContent title={title}>
        <div className="space-y-2">
          {renderCardHeader()}
          {items.map((item) => (
            <div key={item.id}>{renderItem(item)}</div>
          ))}
          {renderCardFooter()}
        </div>
      </CardContent>
      <CardFooter category={uri} type={type} />
    </CardWrapper>
  )
}

export default DisplayCard
