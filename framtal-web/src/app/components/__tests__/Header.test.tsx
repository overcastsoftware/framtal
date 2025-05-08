import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../Header'

// Mock the Next.js components and dynamic import
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

jest.mock('next/image', () => {
  return ({ src, alt, width, height, className }: { src: string; alt: string; width: number; height: number; className: string }) => {
    return <img src={src} alt={alt} width={width} height={height} className={className} />
  }
})

// Mock the CurrentUserInfo component that is dynamically imported
jest.mock('../CurrentUserInfo', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="current-user-info">Current User Info Mock</div>
  }
})

describe('Header', () => {
  test('renders logo and site title', () => {
    render(<Header />)
    
    // Check if the logo is rendered
    const logoImg = screen.getByAltText('Logo')
    expect(logoImg).toBeInTheDocument()
    expect(logoImg).toHaveAttribute('src', '/islandis.svg')
    
    // Check if the site title is rendered
    expect(screen.getByText('Skatturinn')).toBeInTheDocument()
    expect(screen.getByText('Framtalsskil')).toBeInTheDocument()
  })
  
  test('renders CurrentUserInfo component when showCurrentUser is true', () => {
    render(<Header showCurrentUser={true} />)
    
    // Check if CurrentUserInfo component is rendered
    const currentUserInfo = screen.getByTestId('current-user-info')
    expect(currentUserInfo).toBeInTheDocument()
  })
  
  test('does not render CurrentUserInfo component when showCurrentUser is false', () => {
    render(<Header showCurrentUser={false} />)
    
    // Check if CurrentUserInfo component is not rendered
    const currentUserInfo = screen.queryByTestId('current-user-info')
    expect(currentUserInfo).not.toBeInTheDocument()
    
    // Also verify that the divider and text are not rendered
    expect(screen.queryByText('Skatturinn')).not.toBeInTheDocument()
    expect(screen.queryByText('Framtalsskil')).not.toBeInTheDocument()
  })
})