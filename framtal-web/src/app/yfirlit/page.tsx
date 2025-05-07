'use client'
import Image from 'next/image'
import dynamic from 'next/dynamic'
// import Navigation from './components/Navigation';
import { useQuery } from '@apollo/client'
import { GET_APPLICATIONS_BY_FAMILY_NUMBER, GET_CURRENT_USER } from '@/graphql/queries/getUserInfo'
import IncomesByType from '../components/IncomesByType'
import Layout from '../components/Layout'
import { AssetsByType } from '../components/AssetsByType'
import { DebtsByType } from '../components/DebtsByType'

// Dynamic import for the GraphQL component to avoid SSR issues
// const Cards = dynamic(() => import('../components/Cards'), { ssr: true })

// const groupIncomesByType = (incomes) => {
//   return incomes.reduce((grouped, income) => {
//     const type = income.incomeType

//     if (!grouped[type]) {
//       grouped[type] = []
//     }

//     grouped[type].push(income)
//     return grouped
//   }, {})
// }
// Dynamic import for the GraphQL components to avoid SSR issues
// const Cards = dynamic(() => import('../components/Cards'), { ssr: true })

// const CurrentUserInfo = dynamic(() => import('../components/CurrentUserInfo'), { ssr: true })

export default function Home() {
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_CURRENT_USER)
  const { loading, error, data } = useQuery(GET_APPLICATIONS_BY_FAMILY_NUMBER, {
    variables: { familyNumber: '1203894569' }, // Replace with actual ID or variable
  })

  const { assets } = data?.applicationsByFamilyNumber[0] || {}
  const { incomes } = data?.applicationsByFamilyNumber[0] || {}
  const { debts } = data?.applicationsByFamilyNumber[0] || {}

  // const incomesByType = groupIncomesByType(incomes)

  // {data.applicationsByFamilyNumber[0].familyNumber}

  if (loading || userLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-center">Í vinnslu...</p>
      </div>
    )
  }
  if (error || userError) return <p className="text-center text-red-500">Villa: {error.message}</p>

  const firstName = userData?.currentUser.name.split(' ')[0]

  return (
    <Layout>
      <div className="grid grid-rows-[0fr_2fr_400px] items-center justify-items-center min-h-screen sm:p-0 font-[family-name:var(--font-geist-sans)]">
        {/* <Navigation /> */}
        <main className="flex flex-col gap-[32px] w-full row-start-2 items-center sm:items-start">
          <div className="flex flex-row gap-2 w-full justify-between items-center sm:items-center">
            <div className="flex flex-col gap-10 max-w-3xl">
              <div
                data-level="3"
                className="h-8 inline-flex justify-start items-center gap-2 overflow-hidden"
              >
                <div data-state="Default" className="flex justify-start items-center gap-2.5">
                  <div className="justify-center text-blue-600 text-sm font-semibold  leading-none">
                    Ísland.is
                  </div>
                </div>
                <div className="w-1 h-1 bg-blue-600 rounded-full" />
                <div data-state="Default" className="flex justify-start items-center gap-2.5">
                  <div className="justify-center text-blue-600 text-sm font-semibold  leading-none">
                    Skatturinn
                  </div>
                </div>
                <div className="w-1 h-1 bg-blue-600 rounded-full" />
                <div
                  data-color="Blue"
                  data-filled="True"
                  data-state="Default"
                  className="p-2 bg-sky-50 rounded-lg flex justify-start items-center overflow-hidden"
                >
                  <div className="justify-end text-blue-600 text-sm font-semibold leading-none">
                    Skil á skattframtali
                  </div>
                </div>
              </div>
              <h1 className="text-5xl text-color-primary-dark-400 font-bold">
                Velkominn {firstName}!<br />Hér að neðan er yfirlit yfir framtalið þitt.
              </h1>
              <p className="text-lg">
                Þú getur farið yfir, bætt við, breytt og skilað þegar þú ert tilbúinn.
              </p>

              <button
                data-icon="True"
                data-size="Small"
                data-state="Default"
                data-type="Back button"
                className="py-1 max-w-fit bg-white cursor-pointer duration-100 hover:shadow-[inset_0px_-2px_0px_0px_rgba(0,97,255,1.00)]  shadow-[inset_0px_-1px_0px_0px_rgba(0,97,255,1.00)] inline-flex justify-start items-center gap-1 overflow-hidden"
              >
                <div className="justify-end text-blue-600 text-sm font-semibold  leading-none ">
                  Eldri framtöl
                </div>
              </button>
            </div>
            <Image
              src={'/digital-service.svg'}
              alt="digital service"
              width={500}
              height={500}
              className="-translate-y-12"
            />
          </div>

          <div className="flex flex-row w-full justify-between rounded-lg items-center bg-secondary-blueberry-100 p-6">
            <div>
              <h3 className="text-2xl text-primary-blue-400 font-bold mb-4">
                Bráðabirgðaútreikningur:
              </h3>
              <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2">
                  <span>Áætluð upphæð skatta og gjalda:</span>
                  <span className="font-semibold">177.533 kr.</span>
                </div>
                <div className="flex flex-row gap-2">
                  <span>Endurgreiðsla samkvæmt útreikningi:</span>
                  <span className="font-semibold">6.398 kr.</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <button className="btn-ghost">Vista</button>
              <button className="btn-primary">Skila framtali</button>
            </div>
          </div>

          {/* SECTIONS */}

          <div className="flex flex-col w-full space-y-12">
            <h3 className="section-header">Tekjur</h3>

            {/* CARDS */}
            <IncomesByType incomes={incomes} />

            <h3 className="section-header">Eignir</h3>

            {/* CARDS */}
            <AssetsByType assets={assets} />

            <h3 className="section-header">Skuldir</h3>

            {/* CARDS */}
            <DebtsByType debts={debts} />
          </div>
        </main>
      </div>
    </Layout>
  )
}
