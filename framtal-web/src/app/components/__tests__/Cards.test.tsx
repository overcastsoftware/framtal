import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import Cards from '../Cards'
import { GET_APPLICATIONS_BY_FAMILY_NUMBER } from '../../../graphql/queries/getUserInfo'

// Mock data for the GraphQL query
const mockApplicationsData = {
  applicationsByFamilyNumber: [
    {
      __typename: 'Application',
      id: '123',
      familyNumber: '1203894569',
      status: 'IN_PROGRESS',
      lastUpdated: '2025-05-01T10:00:00Z',
      createdAt: '2025-04-15T10:00:00Z',
      taxYear: 2024
    }
  ]
}

// Mocks for the Apollo Client
const mocks = [
  {
    request: {
      query: GET_APPLICATIONS_BY_FAMILY_NUMBER,
      variables: { familyNumber: '1203894569' }
    },
    result: {
      data: mockApplicationsData
    }
  }
]

// Loading state mock
const loadingMock = [
  {
    request: {
      query: GET_APPLICATIONS_BY_FAMILY_NUMBER,
      variables: { familyNumber: '1203894569' }
    },
    result: { data: { applicationsByFamilyNumber: [] } },
    delay: 100
  }
]

// Error state mock
const errorMock = [
  {
    request: {
      query: GET_APPLICATIONS_BY_FAMILY_NUMBER,
      variables: { familyNumber: '1203894569' }
    },
    error: new Error('Failed to fetch applications')
  }
]

// Silence console.debug during tests
const originalConsoleDebug = console.debug
beforeEach(() => {
  console.debug = jest.fn()
})
afterEach(() => {
  console.debug = originalConsoleDebug
})

describe('Cards', () => {
  test('renders loading state', () => {
    render(
      <MockedProvider mocks={loadingMock} addTypename={true}>
        <Cards />
      </MockedProvider>
    )
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
  
  test('renders error state', async () => {
    render(
      <MockedProvider mocks={errorMock} addTypename={true}>
        <Cards />
      </MockedProvider>
    )
    
    // Wait for error message to appear
    const errorMessage = await screen.findByText(/Error: Failed to fetch applications/)
    expect(errorMessage).toBeInTheDocument()
  })
  
  test('renders applications data when loaded', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <Cards />
      </MockedProvider>
    )
    
    // Wait for the welcome text with the family number to appear
    const welcomeText = await screen.findByText(/Velkominn 1203894569/)
    expect(welcomeText).toBeInTheDocument()
    
    // Check that the help text appears
    expect(screen.getByText('Þú getur ferið yfir, bætt við breytt og staðfest þegar þú ert tilbúinn')).toBeInTheDocument()
    
    // Check that the JSON data is displayed
    const preElement = screen.getByText((content) => content.includes('"familyNumber": "1203894569"'))
    expect(preElement).toBeInTheDocument()
  })
})