export const FinancialTypes = {
  INCOME: {
    category: 'income',
    label: 'Tekjur',
    uri: 'tekjur',
  },
  ASSET: {
    category: 'asset',
    label: 'Eignir',
    uri: 'eignir',
  },
  DEBT: {
    category: 'debt',
    label: 'Skuldir',
    uri: 'skuldir',
  },
} as const

export const INCOME_TYPE: Record<string, string> = {
  salary: "salary",
  perdiem: "perdiem",
  education_and_sports: "education_and_sports",
}

export const INCOME_TYPE_LABELS: Record<string, string> = {
  salary: 'Launatekjur og starfstengdar greiðslur',
  perdiem: 'Ökutækjastyrkur, dagpeningar, hlunnindi',
  education_and_sports:
    'Lífeyrisgreiðslur. Greiðslur frá Tryggingastofnun. Aðrar bótagreiðslur, styrkir o.fl.',
}

export const ASSET_TYPES: Record<string, { label: string }> = {
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

export const DEBT_TYPES: Record<string, { label: string }> = {
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
  payorId: string
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
  lender?: Lender
}