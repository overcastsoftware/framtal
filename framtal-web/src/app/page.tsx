"use client";
import Image from "next/image";
import dynamic from 'next/dynamic';
// import Navigation from './components/Navigation';
import { useQuery } from "@apollo/client";
import { GET_APPLICATIONS_BY_FAMILY_NUMBER } from "@/graphql/queries/getUserInfo";

// Dynamic import for the GraphQL component to avoid SSR issues
const Cards = dynamic(
  () => import('./components/Cards'),
  { ssr: true }
);

export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 sm:p-1 font-[family-name:var(--font-geist-sans)]">
      {/* <Navigation /> */}
      <main className="flex flex-col gap-[32px] w-full row-start-2 items-center sm:items-start">
        <div className="flex flex-row gap-2 w-full justify-between items-center sm:items-center">
          <div className="flex flex-col gap-10 max-w-3xl">

            <div data-level="3" className="h-8 inline-flex justify-start items-center gap-2 overflow-hidden">
              <div data-state="Default" className="flex justify-start items-center gap-2.5">
                <div className="justify-center text-blue-600 text-sm font-semibold  leading-none">Ísland.is</div>
              </div>
              <div className="w-1 h-1 bg-blue-600 rounded-full" />
              <div data-state="Default" className="flex justify-start items-center gap-2.5">
                <div className="justify-center text-blue-600 text-sm font-semibold  leading-none">Skatturinn</div>
              </div>
              <div className="w-1 h-1 bg-blue-600 rounded-full" />
              <div data-color="Blue" data-filled="True" data-state="Default" className="p-2 bg-sky-50 rounded-lg flex justify-start items-center overflow-hidden">
                <div className="justify-end text-blue-600 text-sm font-semibold  leading-none">skil á skattframtali</div>
              </div>
            </div>
            <h1 className="text-5xl text-color-primary-dark-400 font-bold">RSK 1.01 Skattframtal einstaklinga</h1>
            <p className="text-lg">Þú getur farið yfir, bætt við, breytt og skilað þegar þú ert tilbúin.</p>

            <div class="bg-blue-100 border-t border-b border-blue-500 rounded text-blue-700 px-4 py-3" role="alert">
              <p class="font-bold">Skil á skattframtali</p>
              <button>Skila</button>
            </div>
          </div>

          <button data-icon="True" data-size="Small" data-state="Default" data-type="Back button" className="py-1 max-w-fit bg-white shadow-[inset_0px_-1px_0px_0px_rgba(0,97,255,1.00)] inline-flex justify-start items-center gap-1 overflow-hidden">
            <div className="justify-end text-blue-600 text-sm font-semibold  leading-none ">Eldri framtöl</div>
          </button>
        </div>
      </main>
    </div>
  );
}
