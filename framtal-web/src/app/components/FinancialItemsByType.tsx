import React from 'react'
import DisplayCard from './ui/cards/cards'
import {
  Income,
  Asset,
  Debt,
  FinancialItemsByTypeProps,
  FinancialTypes,
} from '../types/financialTypes'
import { formatCurrency, groupIncomesByTypeAndPayor, sortByKeysArray } from '@/lib/utils'

// Static mappings for different categories
const INCOME_TYPE_LABELS: Record<string, string> = {
  salary: 'Launatekjur og starfstengdar greiðslur',
  perdiem: 'Ökutækjastyrkur, dagpeningar, hlunnindi',
  education_and_sports:
    'Lífeyrisgreiðslur. Greiðslur frá Tryggingastofnun. Aðrar bótagreiðslur, styrkir o.fl.',
}

const ASSET_TYPES: Record<string, { label: string }> = {
  domestic_property: {
    label: 'Fasteignir á Íslandi',
  },
  foreign_property: {
    label: 'Fasteignir erlendis',
  },
  vehicle: {
    label: 'Bifreiðir',
  },
  cash: {
    label: 'Handbært fé',
  },
  stocks: {
    label: 'Hlutabréf',
  },
  other: {
    label: 'Aðrar eignir',
  },
}

const DEBT_TYPES: Record<string, { label: string }> = {
  property: {
    label: 'Húsnæðislán',
  },
  vehicle: {
    label: 'Bílalán',
  },
  student: {
    label: 'Námslán',
  },
  credit_card: {
    label: 'Kreditkort',
  },
  tax: {
    label: 'Skattskuldir',
  },
  other: {
    label: 'Aðrar skuldir',
  },
}

// Main component
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
                category="tekjur"
                title={INCOME_TYPE_LABELS[type] || type}
                totalAmount={totalAmount}
                showTotal={true}
                items={groupedByPayor.map((group) => ({
                  id: group.nationalId,
                  amount: group.totalAmount,
                  entity: group.entity,
                  nationalId: group.nationalId,
                  originalTypes: [...new Set(group.items.map((item) => item.incomeType))],
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
                parentType={type}
                category="eignir"
                type={type}
                amount={typeTotal || 0}
                items={typeAssets.map((asset) => ({
                  id: asset.id,
                  entity: asset.description,
                  description: asset.description,
                  amount: asset.amount || 0,
                  identifier:
                    asset.assetType === 'other'
                      ? `${asset.description} ${asset.assetIdentifier}`
                      : asset.assetIdentifier,
                }))}
                className="mb-4"
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
            const typeTotalCost = typeDebts.reduce((sum, debt) => sum + (debt.totalCost || 0), 0)

            return (
              <DisplayCard
                key={type}
                type={type}
                category="skuldir"
                parentType="debt"
                title={typeInfo.label}
                amount={typeTotal}
                items={typeDebts.map((debt) => ({
                  id: debt.id,
                  description: debt.description,
                  amount: debt.amount || 0,
                  totalCost: debt.totalCost || 0,
                  lender: debt.lender,
                }))}
                className="mb-4"
                footer={
                  typeTotalCost > 0
                    ? `Vaxtagjöld samtals: ${formatCurrency(typeTotalCost)}`
                    : undefined
                }
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
