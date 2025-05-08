'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_DEBT } from '@/graphql/queries/getUserInfo'
import { useQuery } from '@apollo/client'
import DebtForm from '../../components/forms/DebtForm'
import NewDebtForm from '../../components/forms/NewDebtForm'
import { sortById } from '../../../lib/utils'

export default function DebtPage() {
  const { slug } = useParams()
  const familyNumber = '1203894569' // In a real app, this should come from user context/auth

  const { loading, error, data } = useQuery(GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_DEBT, {
    variables: { familyNumber },
  })

  // Validate the debt type from URL parameter
  if (!['property', 'other'].includes(slug)) {
    return <Layout>Síða fannst ekki</Layout>
  }

  if (loading)
    return (
      <Layout>
        <p className="text-center">Sæki gögn ...</p>
      </Layout>
    )
  if (error)
    return (
      <Layout>
        <p className="text-center text-primary-red-600">Villa: {error.message}</p>
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

  // Get debt type display name
  const loanTypeLabels = {
    property: 'Vaxtagjöld af húsnæðislánum',
    other: 'Vaxtagjöld vegna annarra lána',
  }

  // Group debts by their type
  const groupedDebts = {}
  application.debts.forEach((debt) => {
    const type = debt.loanType
    if (!groupedDebts[type]) {
      groupedDebts[type] = []
    }
    groupedDebts[type].push(debt)
  })

  // Filter to only include the requested type if slug is provided
  let loanTypesToShow = slug ? [slug] : Object.keys(groupedDebts)

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

        <h1 className="text-2xl font-bold mb-3">Skuldir</h1>
        <h3 className="mb-7">Vaxtagjöld af lánum</h3>

        {loanTypesToShow.length === 0 ? (
          <p className="mb-6">Engar tekjulínur fundust</p>
        ) : (
          <>
            {loanTypesToShow.map((type, i) => {
              const debts = groupedDebts[type] || []
              if (debts.length === 0) return null

              return (
                <div
                  key={type}
                  className={`mb-8 ${i !== loanTypesToShow.length - 1 ? 'border-b' : ''} border-blue-600 pb-5`}
                >
                  <h3 className="font-semibold">{loanTypeLabels[type] || type}</h3>

                  <div className="mb-6">
                    {debts.sort(sortById).map((debt) => (
                      <div key={debt.id}>
                        <DebtForm
                          debt={debt}
                          applicationId={parseInt(application.id)}
                          nationalId={familyNumber}
                          familyNumber={familyNumber}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <NewDebtForm
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
    </Layout>
  )
}
