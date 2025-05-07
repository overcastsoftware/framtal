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
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_CURRENT_USER);
  const { loading, error, data } = useQuery(GET_APPLICATIONS_BY_FAMILY_NUMBER, {
    variables: { familyNumber: '1203894569' }, // Replace with actual ID or variable
  })

  const { familyNumber } = data?.applicationsByFamilyNumber[0] || {}

  const { assets } = data?.applicationsByFamilyNumber[0] || {}
  const { incomes } = data?.applicationsByFamilyNumber[0] || {}
  const { debts } = data?.applicationsByFamilyNumber[0] || {}
  console.log('assets', assets)
  console.log('incomes', incomes)
  console.log('debts', debts)


  // const incomesByType = groupIncomesByType(incomes)
  // console.log('incomesByType', incomesByType)

  // {data.applicationsByFamilyNumber[0].familyNumber}

  if (loading || userLoading) return <p className="text-center">Loading...</p>
  if (error || userError) return <p className="text-center text-red-500">Error: {error.message}</p>
  
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
                  <div className="justify-end text-blue-600 text-sm font-semibold  leading-none">
                    skil á skattframtali
                  </div>
                </div>
              </div>
              <h1 className="text-5xl text-color-primary-dark-400 font-bold">
                Velkominn {firstName}! Hér að neðan er yfirlit yfir framtalið þitt.
              </h1>
              <p className="text-lg">
                Þú getur farið yfir, bætt við, breytt og skilað þegar þú ert tilbúin.
              </p>

              <button
                data-icon="True"
                data-size="Small"
                data-state="Default"
                data-type="Back button"
                className="py-1 max-w-fit bg-white shadow-[inset_0px_-1px_0px_0px_rgba(0,97,255,1.00)] inline-flex justify-start items-center gap-1 overflow-hidden"
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
          {/* GraphQL Example Component */}
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
            <button className="bg-primary-blue-400 text-lg font-semibold text-white rounded-lg h-fit px-4 py-2.5">
              Skila framtali
            </button>
          </div>

          {/* SECTIONS */}

          <div className="flex flex-col w-full space-y-12">
            <h3 className="text-2xl text-primary-header font-bold mb-4">Tekjur</h3>

            {/* CARDS */}
            <IncomesByType incomes={incomes} />

            <h3 className="text-2xl text-primary-header font-bold mb-4">Eignir</h3>

            {/* CARDS */}
            <AssetsByType assets={assets} />

            <h3 className="text-2xl text-primary-header font-bold mb-4">Skuldir</h3>

            {/* CARDS */}
            <DebtsByType debts={debts} />
          </div>

          {/* <Cards /> */}
          {/* <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2 tracking-[-.01em]">
              Get started by editing{' '}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                src/app/page.tsx
              </code>
              .
            </li>
            <li className="tracking-[-.01em]">Save and see your changes instantly.</li>
          </ol> */}

          {/* <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </div> */}
        </main>
        <footer className="w-full h-96 bg-primary-blue-100 row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <p>s</p>
          {/* <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
            Go to nextjs.org →
          </a> */}
        </footer>
      </div>
    </Layout>
  )
}
