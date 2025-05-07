import React from 'react'
import DisplayCard from './ui/cards/cards'

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('is-IS', {
    style: 'currency',
    currency: 'ISK',
    maximumFractionDigits: 0,
  }).format(amount)
}

type Debt = {
  __typename: string
  id: string
  description: string
  loanType: string
  amount: number
  totalCost: number
}

interface DebtsByTypeProps {
  debts: Debt[]
}

interface DebtTypeInfo {
  label: string
  icon?: string
}

const DEBT_TYPES: Record<string, DebtTypeInfo> = {
  property: {
    label: 'Húsnæðislán',
    icon: '🏠',
  },
  vehicle: {
    label: 'Bílalán',
    icon: '🚗',
  },
  student: {
    label: 'Námslán',
    icon: '🎓',
  },
  credit_card: {
    label: 'Kreditkort',
    icon: '💳',
  },
  tax: {
    label: 'Skattskuldir',
    icon: '📝',
  },
  other: {
    label: 'Aðrar skuldir',
    icon: '📊',
  },
}

export const DebtsByType: React.FC<DebtsByTypeProps> = ({ debts }) => {
  // Group debts by type
  const debtsByType: Record<string, Debt[]> = {}

  let totalAmount = 0
  let totalCost = 0

  debts.forEach((debt) => {
    const type = debt.loanType || 'other'
    if (!debtsByType[type]) {
      debtsByType[type] = []
    }
    debtsByType[type].push(debt)
    totalAmount += debt.amount || 0
    totalCost += debt.totalCost || 0
  })

  return (
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
            }))}
            className="mb-4"
            footer={
              typeTotalCost > 0 ? `Vaxtagjöld samtals: ${formatCurrency(typeTotalCost)}` : undefined
            }
          />
        )
      })}
    </div>
  )
}
