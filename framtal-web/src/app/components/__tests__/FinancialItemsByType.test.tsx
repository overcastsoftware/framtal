import React from 'react'
import { render, screen } from '@testing-library/react'
import FinancialItemsByType from '../FinancialItemsByType'
import { FinancialTypes } from '../../types/financialTypes'
import '@testing-library/jest-dom'

// Mock the DisplayCard component
jest.mock('../ui/cards/cards', () => {
  return {
    __esModule: true,
    default: jest.fn(({ title, items, type, category }) => (
      <div data-testid={`display-card-${category}-${type}`}>
        <h4>{title}</h4>
        <div data-testid="items-count">{items.length}</div>
      </div>
    ))
  }
})

// Mock the utility functions
jest.mock('@/lib/utils', () => ({
  formatCurrency: jest.fn((amount) => `${amount} kr.`),
  groupIncomesByTypeAndPayor: jest.fn((incomes) => {
    // Simple mock implementation that groups by incomeType
    const result: Record<string, any[]> = {}
    incomes.forEach(income => {
      const type = income.incomeType
      if (!result[type]) {
        result[type] = []
      }
      
      // Check if there's already an entry for this nationalId
      const existingGroup = result[type].find(group => 
        group.nationalId === income.payor?.nationalId
      )
      
      if (existingGroup) {
        existingGroup.totalAmount += income.amount
        existingGroup.items.push(income)
      } else {
        result[type].push({
          entity: income.payor?.name || 'Unknown',
          nationalId: income.payor?.nationalId || 'Unknown',
          totalAmount: income.amount,
          items: [income]
        })
      }
    })
    return result
  }),
  sortByKeysArray: jest.fn((keys, orderArray) => keys)
}))

describe('FinancialItemsByType', () => {
  // Test for Income type
  test('renders income items correctly', () => {
    const mockIncomeItems = [
      {
        __typename: 'Income',
        id: '1',
        amount: 500000,
        incomeType: 'salary',
        payor: {
          __typename: 'Entity',
          name: 'Company A',
          nationalId: '123456-7890'
        },
        payorId: '123456-7890'
      },
      {
        __typename: 'Income',
        id: '2',
        amount: 450000,
        incomeType: 'salary',
        payor: {
          __typename: 'Entity',
          name: 'Company A',
          nationalId: '123456-7890'
        },
        payorId: '123456-7890'
      },
      {
        __typename: 'Income',
        id: '3',
        amount: 200000,
        incomeType: 'perdiem',
        payor: {
          __typename: 'Entity',
          name: 'Company B',
          nationalId: '098765-4321'
        },
        payorId: '098765-4321'
      },
    ]

    render(
      <FinancialItemsByType
        title="Tekjur"
        category={FinancialTypes.INCOME.category}
        items={mockIncomeItems}
      />
    )

    // Check if the section header is rendered
    expect(screen.getByText('Tekjur')).toBeInTheDocument()
    
    // Check if display cards are rendered
    expect(screen.getByTestId('display-card-income-salary')).toBeInTheDocument()
    expect(screen.getByTestId('display-card-income-perdiem')).toBeInTheDocument()
  })

  // Test for Asset type
  test('renders asset items correctly', () => {
    const mockAssetItems = [
      {
        __typename: 'Asset',
        id: '1',
        amount: 50000000,
        assetType: 'domestic_property',
        description: 'Apartment',
        assetIdentifier: 'Property A',
      },
      {
        __typename: 'Asset',
        id: '2',
        amount: 5000000,
        assetType: 'vehicle',
        description: 'Car',
        assetIdentifier: 'AB-123',
      },
      {
        __typename: 'Asset',
        id: '3',
        amount: 1000000,
        assetType: 'cash',
        description: 'Savings account',
        assetIdentifier: '123-456-789',
      },
    ]

    render(
      <FinancialItemsByType
        title="Eignir"
        category={FinancialTypes.ASSET.category}
        items={mockAssetItems}
      />
    )

    // Check if the section header is rendered
    expect(screen.getByText('Eignir')).toBeInTheDocument()
    
    // Check if display cards are rendered for each asset type
    expect(screen.getByTestId('display-card-asset-domestic_property')).toBeInTheDocument()
    expect(screen.getByTestId('display-card-asset-vehicle')).toBeInTheDocument()
    expect(screen.getByTestId('display-card-asset-cash')).toBeInTheDocument()
  })

  // Test for Debt type
  test('renders debt items correctly', () => {
    const mockDebtItems = [
      {
        __typename: 'Debt',
        id: '1',
        amount: 20000000,
        loanType: 'property',
        description: 'Home mortgage',
        totalCost: 800000,
        lender: {
          __typename: 'Lender',
          name: 'Bank A',
          nationalId: '111111-1111'
        }
      },
      {
        __typename: 'Debt',
        id: '2',
        amount: 3000000,
        loanType: 'vehicle',
        description: 'Car loan',
        totalCost: 200000,
        lender: {
          __typename: 'Lender',
          name: 'Bank B',
          nationalId: '222222-2222'
        }
      },
    ]

    render(
      <FinancialItemsByType
        title="Skuldir"
        category={FinancialTypes.DEBT.category}
        items={mockDebtItems}
      />
    )

    // Check if the section header is rendered
    expect(screen.getByText('Skuldir')).toBeInTheDocument()
    
    // Check if display cards are rendered for each debt type
    expect(screen.getByTestId('display-card-debt-property')).toBeInTheDocument()
    expect(screen.getByTestId('display-card-debt-vehicle')).toBeInTheDocument()
  })

  // Test for invalid category
  test('returns null when category is invalid', () => {
    const { container } = render(
      <FinancialItemsByType
        title="Invalid"
        category="invalid" as any
        items={[]}
      />
    )
    
    // The component should return null, so the container should be empty
    expect(container.firstChild).toBeNull()
  })
})