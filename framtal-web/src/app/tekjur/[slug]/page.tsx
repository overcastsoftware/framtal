'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME } from '@/graphql/queries/getUserInfo'
import { useQuery } from '@apollo/client'
import IncomeForm from '../../components/IncomeForm'
import NewIncomeForm from '../../components/NewIncomeForm'

const sortById = (a, b) => {
  if (a.id < b.id) return -1
  if (a.id > b.id) return 1
  return 0
}

export default function IncomePage() {
  const { slug } = useParams()
  const familyNumber = '1203894569' // In a real app, this should come from user context/auth

  // Validate the income type from URL parameter
  if (!['salary', 'perdiem', 'education_and_sports'].includes(slug)) {
    return <Layout>Síða fannst ekki</Layout>
  }

  const { loading, error, data } = useQuery(GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME, {
    variables: { familyNumber },
  })

  if (loading)
    return (
      <Layout>
        <p className="text-center">Sæki gögn ...</p>
      </Layout>
    )
  if (error)
    return (
      <Layout>
        <p className="text-center text-red-500">Villa: {error.message}</p>
      </Layout>
    )

  const application = data?.applicationsByFamilyNumber[0]
  if (!application) {
    return (
      <Layout>
        <p className="text-center">Ekkert framtal fannst</p>
      </Layout>
    )
  }

  // Get income type display name
  const incomeTypeLabels = {
    salary: 'Launatekjur',
    sports: 'Líkamsræktar- og íþróttastyrkir',
    perdiem: 'Dagpeningar',
    job_education_grant: 'Starfs- og menntunar styrkir',
  }

  // Group incomes by their type
  const groupedIncomes = {}
  application.incomes.forEach((income) => {
    const type = income.incomeType
    if (!groupedIncomes[type]) {
      groupedIncomes[type] = []
    }
    groupedIncomes[type].push(income)
  })

  let incomeTypesToShow = slug ? [slug] : Object.keys(groupedIncomes)
  // Filter to only include the requested type if slug is provided
  if (slug === 'education_and_sports') {
    incomeTypesToShow = ['sports', 'job_education_grant']
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="py-1 max-w-fit bg-white cursor-pointer duration-100 hover:shadow-[inset_0px_-2px_0px_0px_rgba(0,97,255,1.00)]  shadow-[inset_0px_-1px_0px_0px_rgba(0,97,255,1.00)] inline-flex justify-start items-center gap-1 overflow-hidden">
          <Link
            href="/yfirlit"
            className="justify-end text-primary-blue-600 text-sm font-semibold  leading-none "
          >
            Til baka
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-3">Tekjur</h1>
        <h3 className="mb-7">Launatekjur og starfstengdar greiðslur</h3>

        {incomeTypesToShow.length === 0 ? (
          <p className="mb-6">Engar tekjulínur fundust</p>
        ) : (
          <>
            {incomeTypesToShow.map((type, i) => {
              const incomes = groupedIncomes[type] || []
              if (incomes.length === 0) return null

              return (
                <div key={type} className={`mb-8 ${ i !== incomeTypesToShow.length-1 ? 'border-b' : ''} border-blue-600 pb-5`}>
                  <h2 className="text-xl font-semibold text-blue-600">
                    {incomeTypeLabels[type] || type}
                  </h2>

                  <div className="mb-6">
                    {incomes.sort(sortById).map((income) => (
                      <div key={income.id}>
                        <IncomeForm
                          income={income}
                          applicationId={parseInt(application.id)}
                          nationalId={familyNumber}
                          familyNumber={familyNumber}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <NewIncomeForm
                      applicationId={parseInt(application.id)}
                      nationalId={familyNumber}
                      familyNumber={familyNumber}
                    />
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>

      {/* <button
        data-icon="True"
        data-size="Small"
        data-state="Default"
        data-type="Back button"
        className="py-1 max-w-fit bg-white cursor-pointer duration-100 hover:shadow-[inset_0px_-2px_0px_0px_rgba(0,97,255,1.00)]  shadow-[inset_0px_-1px_0px_0px_rgba(0,97,255,1.00)] inline-flex justify-start items-center gap-1 overflow-hidden"
      >
        <div className="justify-end text-blue-600 text-sm font-semibold  leading-none ">
          Eldri framtöl
        </div>
      </button> */}
    </Layout>
  )
}
