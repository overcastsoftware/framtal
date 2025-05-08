import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AssetsByType } from '../AssetsByType'

// Mock the DisplayCard component
jest.mock('../ui/cards/cards', () => {
  return {
    __esModule: true,
    default: jest.fn(({ title, type, category, items, amount }) => (
      <div data-testid={`display-card-${category}-${type}`}>
        <h4>{title}</h4>
        <div data-testid="items-count">{items.length}</div>
        <div data-testid="amount">{amount}</div>
      </div>
    ))
  }
})

describe('AssetsByType', () => {
  test('renders title correctly', () => {
    render(
      <AssetsByType
        title="Eignir"
        assets={[]}
      />
    )
    
    // Check if the title is rendered
    expect(screen.getByText('Eignir')).toBeInTheDocument()
  })
  
  test('renders assets grouped by type', () => {
    const mockAssets = [
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
        assetType: 'vehicle',
        description: 'Motorcycle',
        assetIdentifier: 'CD-456',
      },
      {
        __typename: 'Asset',
        id: '4',
        amount: 2000000,
        assetType: 'cash',
        description: 'Savings account',
        assetIdentifier: '123-456-789',
      },
    ]

    render(
      <AssetsByType
        title="Eignir"
        assets={mockAssets}
      />
    )
    
    // Check if each asset type is rendered
    expect(screen.getByTestId('display-card-eignir-domestic_property')).toBeInTheDocument()
    expect(screen.getByTestId('display-card-eignir-vehicle')).toBeInTheDocument()
    expect(screen.getByTestId('display-card-eignir-cash')).toBeInTheDocument()
    
    // Check if the number of items for vehicle is correct (should be 2)
    const vehicleItems = screen.getByTestId('display-card-eignir-vehicle').querySelector('[data-testid="items-count"]')
    expect(vehicleItems).toHaveTextContent('2')
  })
  
  test('calculates total amount for each asset type correctly', () => {
    const mockAssets = [
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
        amount: 3000000,
        assetType: 'vehicle',
        description: 'Motorcycle',
        assetIdentifier: 'CD-456',
      },
    ]

    render(
      <AssetsByType
        title="Eignir"
        assets={mockAssets}
      />
    )
    
    // Check if the total amount for vehicle is correct (5000000 + 3000000 = 8000000)
    const vehicleAmount = screen.getByTestId('display-card-eignir-vehicle').querySelector('[data-testid="amount"]')
    expect(vehicleAmount).toHaveTextContent('8000000')
  })
  
  test('handles assets with undefined or null values', () => {
    const mockAssets = [
      {
        __typename: 'Asset',
        id: '1',
        amount: null as any, // Deliberately set to null for testing
        assetType: 'domestic_property',
        description: 'Apartment',
        assetIdentifier: 'Property A',
      },
      {
        __typename: 'Asset',
        id: '2',
        amount: 5000000,
        assetType: '', // Empty asset type should default to 'other'
        description: 'Some asset',
        assetIdentifier: undefined as any,
      },
    ]

    // This should render without errors
    render(
      <AssetsByType
        title="Eignir"
        assets={mockAssets}
      />
    )
    
    // Check that the component rendered without crashing
    expect(screen.getByText('Eignir')).toBeInTheDocument()
    
    // Check that "other" type is rendered for the asset with empty type
    expect(screen.getByTestId('display-card-eignir-other')).toBeInTheDocument()
  })
})