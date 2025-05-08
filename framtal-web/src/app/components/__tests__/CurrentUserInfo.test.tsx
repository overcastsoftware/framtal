import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import CurrentUserInfo from '../CurrentUserInfo'
import { GET_CURRENT_USER } from '../../../graphql/queries/getUserInfo'

// Mock the GraphQL response data
const mocks = [
  {
    request: {
      query: GET_CURRENT_USER,
    },
    result: {
      data: {
        currentUser: {
          id: '123',
          name: 'John Doe',
          nationalId: '123456-7890',
          __typename: 'User',
        },
      },
    },
  },
]

// Mock with loading state
const loadingMock = [
  {
    request: {
      query: GET_CURRENT_USER,
    },
    result: { data: { currentUser: null } },
    delay: 100, // Simulate network delay for loading state
  },
]

// Mock with error state
const errorMock = [
  {
    request: {
      query: GET_CURRENT_USER,
    },
    error: new Error('An error occurred'),
  },
]

describe('CurrentUserInfo', () => {
  test('renders loading state', async () => {
    render(
      <MockedProvider mocks={loadingMock} addTypename={true}>
        <CurrentUserInfo />
      </MockedProvider>
    )
    
    // Initially should show loading
    expect(screen.getByText('Loading user information...')).toBeInTheDocument()
  })
  
  test('renders error state', async () => {
    render(
      <MockedProvider mocks={errorMock} addTypename={true}>
        <CurrentUserInfo />
      </MockedProvider>
    )
    
    // Wait for error state to appear
    const errorMessage = await screen.findByText(/Error:/)
    expect(errorMessage).toBeInTheDocument()
  })
  
  test('renders user information when data is available', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <CurrentUserInfo />
      </MockedProvider>
    )
    
    // Wait for user name to appear
    const userName = await screen.findByText('John Doe')
    expect(userName).toBeInTheDocument()
  })
  
  test('renders no user information message when data is null', async () => {
    const nullDataMock = [
      {
        request: {
          query: GET_CURRENT_USER,
        },
        result: {
          data: { currentUser: null },
        },
      },
    ]
    
    render(
      <MockedProvider mocks={nullDataMock} addTypename={true}>
        <CurrentUserInfo />
      </MockedProvider>
    )
    
    // Wait for no user message to appear
    const noUserMessage = await screen.findByText('No user information available.')
    expect(noUserMessage).toBeInTheDocument()
  })
})