import { GroupedIncome, Income } from "@/app/types/financialTypes"

export const sortById = (a, b) => {
  if (a.id < b.id) return -1
  if (a.id > b.id) return 1
  return 0
}

export const sortByKeysArray = (data: any[], keyOrder: string[]) => {
  const sortedData = keyOrder.map((key) => {
    const index = data.indexOf(key)
    if (index !== -1) {
      return data[index]
    }
    return null
  })
  return sortedData.filter((item) => item !== null)
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('is-IS', {
    style: 'currency',
    currency: 'ISK',
    maximumFractionDigits: 0,
  }).format(amount)
}

// Income normalizer function
export const normalizeIncomeType = (type: string): string => {
  if (type === 'sports' || type === 'job_education_grant') {
    return 'education_and_sports'
  }
  return type
}

export const groupIncomesByTypeAndPayor = (incomes: Income[]) => {
  const groupedByType = incomes.reduce<Record<string, Income[]>>((grouped, income) => {
    const type = normalizeIncomeType(income.incomeType)
    if (!grouped[type]) {
      grouped[type] = []
    }
    grouped[type].push(income)
    return grouped
  }, {})

  const result: Record<string, GroupedIncome[]> = {}

  Object.keys(groupedByType).forEach((type) => {
    const typeIncomes = groupedByType[type]

    const groupedByPayor = typeIncomes.reduce<Record<string, Income[]>>((grouped, income) => {
      const payorId = income.payorId;
      if (!grouped[payorId]) {
        grouped[payorId] = []
      }
      grouped[payorId].push(income)
      return grouped
    }, {})

    result[type] = Object.keys(groupedByPayor).map((payorId) => {
      const payorIncomes = groupedByPayor[payorId]
      const totalAmount = payorIncomes.reduce((sum, income) => sum + income.amount, 0)

      return {
        entity: payorIncomes[0].payor?.name || payorId,
        nationalId: payorId,
        totalAmount,
        items: payorIncomes,
      }
    })
  })

  return result
}