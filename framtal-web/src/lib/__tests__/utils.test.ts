import {
  sortById,
  sortByKeysArray,
  formatCurrency,
  normalizeIncomeType,
  groupIncomesByTypeAndPayor
} from '../utils'
import { Income, Entity } from '@/app/types/financialTypes'

describe('sortById', () => {
  test('should sort objects by id in ascending order', () => {
    const items = [
      { id: '3', name: 'Item 3' },
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' }
    ]

    const sortedItems = [...items].sort(sortById)
    
    expect(sortedItems).toEqual([
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' }
    ])
  })

  test('should handle numeric ids correctly', () => {
    const items = [
      { id: 3, name: 'Item 3' },
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ]

    const sortedItems = [...items].sort(sortById)
    
    expect(sortedItems).toEqual([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ])
  })

  test('should return 0 when comparing equal ids', () => {
    const item1 = { id: '1', name: 'Item 1' }
    const item2 = { id: '1', name: 'Another Item 1' }
    
    expect(sortById(item1, item2)).toBe(0)
  })
})

describe('sortByKeysArray', () => {
  test('should sort array according to key order provided', () => {
    const data = ['apple', 'banana', 'orange', 'grape', 'kiwi']
    const keyOrder = ['orange', 'grape', 'banana']
    
    const sortedArray = sortByKeysArray(data, keyOrder)
    
    expect(sortedArray).toEqual(['orange', 'grape', 'banana'])
  })

  test('should filter out null values', () => {
    const data = ['apple', 'banana', 'orange']
    const keyOrder = ['orange', 'pear', 'banana', 'mango']
    
    const sortedArray = sortByKeysArray(data, keyOrder)
    
    expect(sortedArray).toEqual(['orange', 'banana'])
    expect(sortedArray).not.toContain(null)
  })

  test('should return empty array if no matches found', () => {
    const data = ['apple', 'banana', 'orange']
    const keyOrder = ['pear', 'mango', 'kiwi']
    
    const sortedArray = sortByKeysArray(data, keyOrder)
    
    expect(sortedArray).toEqual([])
  })
})

describe('formatCurrency', () => {
  test('should format numbers in Icelandic currency format', () => {
    // Use toMatch instead of toBe to be more flexible with whitespace differences
    expect(formatCurrency(1000)).toMatch(/1.000\s+kr\./)
    expect(formatCurrency(1500)).toMatch(/1.500\s+kr\./)
    expect(formatCurrency(1000000)).toMatch(/1.000.000\s+kr\./)
  })

  test('should handle zero', () => {
    expect(formatCurrency(0)).toMatch(/0\s+kr\./)
  })

  test('should handle negative values', () => {
    expect(formatCurrency(-1000)).toMatch(/-1.000\s+kr\./)
  })

  test('should round decimals to whole numbers', () => {
    expect(formatCurrency(1000.49)).toMatch(/1.000\s+kr\./)
    expect(formatCurrency(1000.5)).toMatch(/1.001\s+kr\./)
  })
})

describe('normalizeIncomeType', () => {
  test('should normalize sports to education_and_sports', () => {
    expect(normalizeIncomeType('sports')).toBe('education_and_sports')
  })

  test('should normalize job_education_grant to education_and_sports', () => {
    expect(normalizeIncomeType('job_education_grant')).toBe('education_and_sports')
  })

  test('should return the original type for non-special cases', () => {
    expect(normalizeIncomeType('salary')).toBe('salary')
    expect(normalizeIncomeType('dividends')).toBe('dividends')
    expect(normalizeIncomeType('other')).toBe('other')
  })
})

describe('groupIncomesByTypeAndPayor', () => {
  // Helper functions to create test data
  const createEntity = (name: string, nationalId: string): Entity => ({
    __typename: 'Entity',
    name,
    nationalId
  })

  const createIncome = (id: string, amount: number, incomeType: string, payorId: string, payorName: string): Income => ({
    __typename: 'Income',
    id,
    amount,
    incomeType,
    payorId,
    payor: createEntity(payorName, payorId)
  })

  test('should group incomes by type and payor', () => {
    const incomes: Income[] = [
      createIncome('1', 1000, 'salary', '123456-7890', 'Company A'),
      createIncome('2', 2000, 'salary', '123456-7890', 'Company A'),
      createIncome('3', 3000, 'salary', '987654-3210', 'Company B'),
      createIncome('4', 4000, 'dividend', '123456-7890', 'Company A')
    ]

    const result = groupIncomesByTypeAndPayor(incomes)

    expect(Object.keys(result)).toHaveLength(2) // salary and dividend
    expect(result.salary).toHaveLength(2) // Two payors for salary
    expect(result.dividend).toHaveLength(1) // One payor for dividend

    // Check first salary group (Company A)
    expect(result.salary[0].entity).toBe('Company A')
    expect(result.salary[0].nationalId).toBe('123456-7890')
    expect(result.salary[0].totalAmount).toBe(3000) // 1000 + 2000
    expect(result.salary[0].items).toHaveLength(2)

    // Check second salary group (Company B)
    expect(result.salary[1].entity).toBe('Company B')
    expect(result.salary[1].nationalId).toBe('987654-3210')
    expect(result.salary[1].totalAmount).toBe(3000)
    expect(result.salary[1].items).toHaveLength(1)

    // Check dividend group (Company A)
    expect(result.dividend[0].entity).toBe('Company A')
    expect(result.dividend[0].nationalId).toBe('123456-7890')
    expect(result.dividend[0].totalAmount).toBe(4000)
    expect(result.dividend[0].items).toHaveLength(1)
  })

  test('should normalize income types', () => {
    const incomes: Income[] = [
      createIncome('1', 1000, 'sports', '123456-7890', 'Sports Organization'),
      createIncome('2', 2000, 'job_education_grant', '987654-3210', 'Education Fund')
    ]

    const result = groupIncomesByTypeAndPayor(incomes)

    // Both should be grouped under education_and_sports
    expect(Object.keys(result)).toHaveLength(1)
    expect(result.education_and_sports).toBeDefined()
    expect(result.education_and_sports).toHaveLength(2)
  })

  test('should handle empty input', () => {
    const result = groupIncomesByTypeAndPayor([])
    expect(Object.keys(result)).toHaveLength(0)
  })

  test('should handle missing payor name', () => {
    // Create an income with undefined payor name
    const income: Income = {
      __typename: 'Income',
      id: '1',
      amount: 1000,
      incomeType: 'salary',
      payorId: '123456-7890',
      payor: undefined
    }

    const result = groupIncomesByTypeAndPayor([income])
    
    expect(result.salary[0].entity).toBe('123456-7890') // Should use payorId as fallback
    expect(result.salary[0].nationalId).toBe('123456-7890')
  })
})