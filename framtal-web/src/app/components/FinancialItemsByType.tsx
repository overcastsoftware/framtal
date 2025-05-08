import React from 'react'
import DisplayCard from './ui/cards/cards'
import {
  Income,
  Asset,
  Debt,
  FinancialItemsByTypeProps,
  FinancialTypes,
  INCOME_TYPE_LABELS,
  DEBT_TYPES,
  ASSET_TYPES,
} from '../types/financialTypes'
import { groupIncomesByTypeAndPayor, sortByKeysArray } from '@/lib/utils'

const FinancialItemsByType: React.FC<FinancialItemsByTypeProps> = ({ title, category, items }) => {
  if (category === FinancialTypes.INCOME.category) {
    // Group incomes by type and payor
    const incomes = items as Income[]
    const groupedIncomes = groupIncomesByTypeAndPayor(incomes)

    // Sort the income types by the order of keys in the supplied keyOrder array
    const keyOrder = Object.keys(INCOME_TYPE_LABELS)
    const incomeTypes = sortByKeysArray(Object.keys(groupedIncomes), keyOrder)

    return (
      <div>
        <h3 className="section-header">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {incomeTypes.map((type) => {
            const groupedByPayor = groupedIncomes[type]
            const totalAmount = groupedByPayor.reduce((sum, group) => sum + group.totalAmount, 0)

            return (
              <DisplayCard
                key={type}
                type={type}
                category={category}
                uri={FinancialTypes.INCOME.uri}
                title={INCOME_TYPE_LABELS[type] || type}
                totalAmount={totalAmount}
                showTotal={true}
                items={groupedByPayor.map((group) => ({
                  id: group.nationalId,
                  amount: group.totalAmount,
                  entity: group.entity,
                  nationalId: group.nationalId,
                  originalTypes: [...new Set(group.items.map((item) => item.incomeType))],
                  totalCost: 0,
                }))}
              />
            )
          })}
        </div>
      </div>
    )
  } else if (category === FinancialTypes.ASSET.category) {
    const assets = items as Asset[]
    const assetsByType: Record<string, Asset[]> = {}

    assets.forEach((asset) => {
      const type = asset.assetType || 'other'
      if (!assetsByType[type]) {
        assetsByType[type] = []
      }
      assetsByType[type].push(asset)
    })

    return (
      <div>
        <h3 className="section-header">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(assetsByType).map(([type, typeAssets]) => {
            const typeInfo = ASSET_TYPES[type] || { label: type, icon: '❓' }
            const typeTotal = typeAssets.reduce((sum, asset) => sum + (asset.amount || 0), 0)

            return (
              <DisplayCard
                key={type}
                title={typeInfo.label}
                totalAmount={typeTotal}
                category={category}
                uri={FinancialTypes.ASSET.uri}
                type={type}
                items={typeAssets.map((asset) => ({
                  id: asset.id,
                  entity: asset.description,
                  description: asset.description,
                  amount: asset.amount || 0,
                  totalCost: 0,
                  identifier:
                    asset.assetType === 'other'
                      ? `${asset.description} ${asset.assetIdentifier}`
                      : asset.assetIdentifier,
                }))}
              />
            )
          })}
        </div>
      </div>
    )
  } else if (category === FinancialTypes.DEBT.category) {
    const debts = items as Debt[]
    const debtsByType: Record<string, Debt[]> = {}

    debts.forEach((debt) => {
      const type = debt.loanType || 'other'
      if (!debtsByType[type]) {
        debtsByType[type] = []
      }
      debtsByType[type].push(debt)
    })

    return (
      <div>
        <h3 className="section-header">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(debtsByType).map(([type, typeDebts]) => {
            const typeInfo = DEBT_TYPES[type] || { label: type, icon: '❓' }
            const typeTotal = typeDebts.reduce((sum, debt) => sum + (debt.amount || 0), 0)

            return (
              <DisplayCard
                key={type}
                type={type}
                category={category}
                title={typeInfo.label}
                uri={FinancialTypes.DEBT.uri}
                totalAmount={typeTotal}
                items={typeDebts.map((debt) => ({
                  id: debt.id,
                  description: debt.description,
                  amount: debt.amount || 0,
                  totalCost: debt.totalCost || 0,
                  lender: debt.lender,
                }))}
              />
            )
          })}
        </div>
      </div>
    )
  }

  return null
}

export default FinancialItemsByType
