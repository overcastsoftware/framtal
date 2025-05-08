export const FinancialTypes = {
  INCOME: {
    category: 'income',
    label: 'Tekjur',
  },
  ASSET: {
    category: 'asset',
    label: 'Eignir',
  },
  DEBT: {
    category: 'debt',
    label: 'Skuldir',
  },
} as const

// Common types
export type Entity = {
  __typename: string
  name: string
  nationalId: string
}

// Income types
export type Income = {
  __typename: string
  id: string
  amount: number
  incomeType: string
  payor: Entity
}

// Asset types
export type Asset = {
  __typename: string
  id: string
  description: string
  amount: number
  assetType: string
  assetIdentifier?: string
}

// Debt types
export type Lender = {
  __typename: string
  name: string
  nationalId: string
}

export type Debt = {
  __typename: string
  id: string
  description: string
  loanType: string
  amount: number
  totalCost: number
  lender?: Lender
}

// Props type for the combined component
export type FinancialItemsByTypeProps = {
  title: string
  category: 'income' | 'asset' | 'debt'
  items: (Income | Asset | Debt)[]
}

// For income grouping
export type GroupedIncome = {
  entity: string
  nationalId: string
  totalAmount: number
  items: Income[]
}

export type CardItem = {
  id: string
  amount: number
  entity?: string
  nationalId?: string
  description?: string
  assetType?: string
  assetIdentifier?: string
  identifier?: string
  totalCost: number
  lender: Lender
}