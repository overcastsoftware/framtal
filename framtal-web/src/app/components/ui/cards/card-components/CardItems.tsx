import React from 'react'
import { CardItem } from '@/app/types/financialTypes'
import { formatCurrency } from '@/lib/utils'

export const DomesticPropertyItem: React.FC<{ item: CardItem }> = ({ item }) => (
  <div className="flex flex-col">
    <div className="flex justify-between gap-2">
      <span className="text-primary-dark-400 flex-1">{item.description}</span>
      <span className="text-primary-dark-400 flex-1 text-right">{formatCurrency(item.amount)}</span>
    </div>
    <span className="text-primary-dark-400">{item.identifier}</span>
  </div>
)

export const VehicleItem: React.FC<{ item: CardItem }> = ({ item }) => (
  <div className="flex flex-col">
    <div className="flex justify-between gap-2">
      <span className="text-primary-dark-400 flex-1">{item.identifier}</span>
      <span className="text-primary-dark-400 flex-1 text-right">{formatCurrency(item.amount)}</span>
    </div>
  </div>
)

export const PropertyDebtItem: React.FC<{ item: CardItem }> = ({ item }) => (
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
        {item.lender?.name || item.lender?.nationalId}
      </span>
    </div>
  </div>
)

export const OtherDebtItem: React.FC<{ item: CardItem }> = ({ item }) => (
  <div className="flex flex-col">
    <div className="flex justify-between gap-2 lg:mt-2">
      <span className="text-primary-dark-400 flex-1">{item.description}</span>
      <span className="text-md text-right text-primary-header flex-1">
        {formatCurrency(item.totalCost)}
      </span>
    </div>
  </div>
)

export const IncomeItem: React.FC<{ item: CardItem }> = ({ item }) => (
  <div className="flex justify-between gap-2">
    <span className="text-primary-dark-400 flex-1">{item.entity}</span>
    <span className="text-primary-dark-400 flex-1 text-right">{formatCurrency(item.amount)}</span>
  </div>
)
