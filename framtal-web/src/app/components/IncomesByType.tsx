import React from 'react'
import DisplayCard from '../components/ui/cards/cards'

type Entity = {
  __typename: string
  name: string
  nationalId: string
}

type Income = {
  __typename: string
  id: string
  amount: number
  incomeType: string
  payor: Entity
}

type IncomesByTypeProps = {
  title: string
  incomes: Income[]
}

// Type for grouped incomes
type GroupedIncome = {
  entity: string
  nationalId: string
  totalAmount: number
  items: Income[]
}

// Function to normalize income types before grouping
const normalizeIncomeType = (type: string): string => {
  // Combine sports and job_education_grant into a single category
  if (type === 'sports' || type === 'job_education_grant') {
    return 'education_and_sports'
  }
  return type
}

// Function to group incomes by type and then by payor
const groupIncomesByTypeAndPayor = (incomes: Income[]) => {
  // First group by normalized income type
  const groupedByType = incomes.reduce<Record<string, Income[]>>((grouped, income) => {
    const type = normalizeIncomeType(income.incomeType)

    if (!grouped[type]) {
      grouped[type] = []
    }

    grouped[type].push(income)
    return grouped
  }, {})

  // Then for each type, group by payor
  const result: Record<string, GroupedIncome[]> = {}

  Object.keys(groupedByType).forEach((type) => {
    const typeIncomes = groupedByType[type]

    // Group by payor national ID
    const groupedByPayor = typeIncomes.reduce<Record<string, Income[]>>((grouped, income) => {
      const payorId = income.payorId

      if (!grouped[payorId]) {
        grouped[payorId] = []
      }

      grouped[payorId].push(income)
      return grouped
    }, {})

    // Convert to array format with totals
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

// A mapping of income types to display names
const incomeTypeLabels: Record<string, string> = {
  salary: 'Launatekjur og starfstengdar greiðslur',
  perdiem: 'Ökutækjastyrkur, dagpeningar, hlunnindi',
  education_and_sports:
    'Lífeyrisgreiðslur. Greiðslur frá Tryggingastofnun. Aðrar bótagreiðslur, styrkir o.fl. ', // Combined category
}

const IncomesByType: React.FC<IncomesByTypeProps> = ({ incomes, title }) => {
  const groupedIncomes = groupIncomesByTypeAndPayor(incomes)

  // Get all unique income types
  const incomeTypes = Object.keys(groupedIncomes)

  return (
    <div>
      <h3 className="section-header">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {incomeTypes.map((type) => {
          const groupedByPayor = groupedIncomes[type]
          const totalAmount = groupedByPayor.reduce((sum, group) => sum + group.totalAmount, 0)

          return (
            <DisplayCard
              key={type}
              type={type}
              category="tekjur"
              title={incomeTypeLabels[type] || type}
              totalAmount={totalAmount}
              showTotal={true}
              items={groupedByPayor.map((group) => ({
                id: group.nationalId,
                amount: group.totalAmount,
                entity: group.entity,
                nationalId: group.nationalId,
                // Add original types for detailed display if needed
                originalTypes: [...new Set(group.items.map((item) => item.incomeType))],
              }))}
            />
          )
        })}
      </div>
    </div>
  )
}

export default IncomesByType
