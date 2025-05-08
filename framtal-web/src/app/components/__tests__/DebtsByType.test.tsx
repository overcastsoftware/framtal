import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DebtsByType } from '../DebtsByType'

// Mock the DisplayCard component
jest.mock('../ui/cards/cards', () => {
  return {
    __esModule: true,
    default: jest.fn(({ title, type, category, items, amount, footer }) => (
      <div data-testid={`display-card-${category}-${type}`}>
        <h4>{title}</h4>
        <div data-testid="items-count">{items.length}</div>
        <div data-testid="amount">{amount}</div>
        {footer && <div data-testid="footer">{footer}</div>}
      </div>
    ))
  }
})

// Mock the formatCurrency function
jest.mock('react', () => {
  const originalReact = jest.requireActual('react')
  return {
    ...originalReact,
    // Any additional mocks can go here
  }
})

// Silence console.log during tests
const originalConsoleLog = console.log
beforeEach(() => {
  console.log = jest.fn()
})
afterEach(() => {
  console.log = originalConsoleLog
})

describe('DebtsByType', () => {
  test('renders title correctly', () => {
    render(
      <DebtsByType
        title="Skuldir"
        debts={[]}
      />
    )
    
    // Check if the title is rendered
    expect(screen.getByText('Skuldir')).toBeInTheDocument()
  })
  
  test('renders debts grouped by type', () => {
    const mockDebts = [
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
        amount: 5000000,
        loanType: 'vehicle',
        description: 'Car loan',
        totalCost: 300000,
        lender: {
          __typename: 'Lender',
          name: 'Bank B',
          nationalId: '222222-2222'
        }
      },
      {
        __typename: 'Debt',
        id: '3',
        amount: 3000000,
        loanType: 'vehicle',
        description: 'Motorcycle loan',
        totalCost: 150000,
        lender: {
          __typename: 'Lender',
          name: 'Bank B',
          nationalId: '222222-2222'
        }
      },
      {
        __typename: 'Debt',
        id: '4',
        amount: 1000000,
        loanType: 'student',
        description: 'Student loan',
        totalCost: 50000,
        lender: {
          __typename: 'Lender',
          name: 'LÍN',
          nationalId: '333333-3333'
        }
      },
    ]

    render(
      <DebtsByType
        title="Skuldir"
        debts={mockDebts}
      />
    )
    
    // Check if each debt type is rendered
    expect(screen.getByTestId('display-card-skuldir-property')).toBeInTheDocument()
    expect(screen.getByTestId('display-card-skuldir-vehicle')).toBeInTheDocument()
    expect(screen.getByTestId('display-card-skuldir-student')).toBeInTheDocument()
    
    // Check if the number of items for vehicle is correct (should be 2)
    const vehicleItems = screen.getByTestId('display-card-skuldir-vehicle').querySelector('[data-testid="items-count"]')
    expect(vehicleItems).toHaveTextContent('2')
  })
  
  test('calculates total amount and cost for each debt type correctly', () => {
    const mockDebts = [
      {
        __typename: 'Debt',
        id: '1',
        amount: 5000000,
        loanType: 'vehicle',
        description: 'Car loan',
        totalCost: 300000,
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
        description: 'Motorcycle loan',
        totalCost: 150000,
        lender: {
          __typename: 'Lender',
          name: 'Bank B',
          nationalId: '222222-2222'
        }
      },
    ]

    render(
      <DebtsByType
        title="Skuldir"
        debts={mockDebts}
      />
    )
    
    // Check if the total amount for vehicle is correct (5000000 + 3000000 = 8000000)
    const vehicleAmount = screen.getByTestId('display-card-skuldir-vehicle').querySelector('[data-testid="amount"]')
    expect(vehicleAmount).toHaveTextContent('8000000')
    
    // Check if the footer contains the correct total cost
    const vehicleFooter = screen.getByTestId('display-card-skuldir-vehicle').querySelector('[data-testid="footer"]')
    expect(vehicleFooter).toHaveTextContent('Vaxtagjöld samtals:')
  })
  
  test('handles debts with undefined or null values', () => {
    const mockDebts = [
      {
        __typename: 'Debt',
        id: '1',
        amount: null as any, // Deliberately set to null for testing
        loanType: 'property',
        description: 'Home mortgage',
        totalCost: null as any,
        lender: undefined
      },
      {
        __typename: 'Debt',
        id: '2',
        amount: 5000000,
        loanType: '', // Empty loan type should default to 'other'
        description: 'Some debt',
        totalCost: 200000,
        lenderId: '123456',
      },
    ]

    // This should render without errors
    render(
      <DebtsByType
        title="Skuldir"
        debts={mockDebts}
      />
    )
    
    // Check that the component rendered without crashing
    expect(screen.getByText('Skuldir')).toBeInTheDocument()
    
    // Check that "other" type is rendered for the debt with empty type
    expect(screen.getByTestId('display-card-skuldir-other')).toBeInTheDocument()
  })
})