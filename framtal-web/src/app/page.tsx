"use client";
import Image from "next/image";
import dynamic from 'next/dynamic';
// import Navigation from './components/Navigation';
import { useQuery } from "@apollo/client";
import { GET_APPLICATIONS_BY_FAMILY_NUMBER } from "@/graphql/queries/getUserInfo";
import Layout from "./components/Layout";

// Dynamic import for the GraphQL component to avoid SSR issues
const Cards = dynamic(
  () => import('./components/Cards'),
  { ssr: true }
);

export default function Home() {

  return (
    <Layout showCurrentUser={false}>

<div className="max-w-[1440px] mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Navigation Column */}
        <aside className="space-y-4">
          <div className="bg-gray p-8 rounded-xl flex">
          <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.4806 27.6674C42.4055 27.6674 45.16 28.8226 47.2323 30.9208L53.6462 37.4143C54.2102 37.9854 54.2102 38.9149 53.6462 39.486L52.5838 40.5615L34.6144 58.7941H34.6275L32.6732 60.7727C32.1616 61.2906 32.1616 62.1405 32.6732 62.6717L37.5525 67.6116C38.0771 68.1295 38.9034 68.1295 39.4281 67.6116L67.3528 39.3399C67.5627 39.1274 67.707 38.8619 67.7463 38.5697C67.7988 38.1713 67.6676 37.7729 67.3922 37.494L52.4395 22.3423C49.672 19.5404 45.9863 18 42.0645 18H37.9722C36.9098 18 35.8867 18.425 35.139 19.1819L26.7577 27.6674H39.4806Z" fill="#1B1C8A"/>
            <path d="M21.2831 37.1065L15.058 30.8255C14.6903 30.4545 14.5064 29.9509 14.5589 29.4209C14.5983 28.9968 14.8085 28.5993 15.1105 28.2945L15.8985 27.4994L15.8854 27.5128L36.0185 7.21195C36.5438 6.69515 36.5438 5.84707 36.0185 5.31703L31.1198 0.387597C30.6076 -0.129199 29.7671 -0.129199 29.2418 0.387597L1.16306 28.7186C0.952929 28.9307 0.808465 29.1956 0.769065 29.4871C0.716532 29.8846 0.847864 30.2822 1.12366 30.5604L16.0955 45.6668C18.8666 48.4628 22.557 50 26.4838 50H30.5157C31.5795 50 32.6039 49.5759 33.3525 48.8206L41.7577 40.3399H29.0448C26.1424 40.3531 23.345 39.187 21.2831 37.1065Z" fill="#1B1C8A"/>
          </svg>
          <div className="flex flex-col ml-4">
            <div className="font-semibold text-sm mb-1">Stofnun</div>
            <div className="text-gray-700 text-xl font-bold">Skatturinn</div>
          </div>
          </div>

          <nav className="bg-blue p-4 rounded-xl">
            <div className="font-semibold text-lg mb-2 text-blue-800 py-2 px-2">Efnisyfirlit</div>
            <ul className="space-y-2 text-blue-700 font-light">
              <li className="p-2"><a href="#">Álagningarseðill</a></li>
              <li className="p-2"><a href="#">Bráðabirgðaútreikningur</a></li>
              <li className="p-2"><a href="#" className="font-bold">Almennar upplýsingar og leiðbeiningar</a>
                <ul className="space-y-1 mt-3 pl-4 border-l border-gray-30 text-sm">
                <li className="p-2"><a href="#" className="font-bold">Hvernig skila ég framtali?</a></li>
                <li className="p-2"><a href="#">Skilafrestur og útgreiðslur</a></li>
                <li className="p-2"><a href="#">Umsóknir og leiðréttingar</a></li>
                <li className="p-2"><a href="#">Rafræn skilríki og veflykill</a></li>
                <li className="p-2"><a href="#">Vaxtabætur</a></li>
                <li className="p-2"><a href="#">Barnabætur</a></li>
                </ul>
              </li>
              <li className="p-2"><a href="#">Algengar spurningar</a></li>
              <li className="p-2"><a href="#">Skattar vegna atvinnu erlendis</a></li>
            </ul>
          </nav>

          <div className="bg-gray p-4 rounded-xl">
            <div className="font-semibold p-2 text-sm">Tengt efni</div>
            <ul className="space-y-1 font-light text-gray-600">
              <li className="p-2"><a href="#">Skattkort</a></li>
              <li className="p-2"><a href="#">Staðgreiðsla</a></li>
              <li className="p-2"><a href="#">RSK 1.02 Skattframtal barns</a></li>
              <li className="p-2"><a href="#">RSK 1.04 Skattframtal rekstraraðila (lögaðila)</a></li>
              <li className="p-2"><a href="#">RSK 1.06 Framtal óskattskyldra lögaðila</a></li>
            </ul>
          </div>
        </aside>

        {/* Content Column */}
        <main className="space-y-8">
        <div data-level="3" className="h-8 inline-flex justify-start items-center gap-2 overflow-hidden text-sm">
            <div data-state="Default" className="flex justify-start items-center gap-2.5">
              <div className="justify-center text-blue-600  font-semibold  leading-none">Ísland.is</div>
            </div>
            <div className="w-1 h-1 bg-blue-600 rounded-full" />
            <div data-state="Default" className="flex justify-start items-center gap-2.5">
              <div className="justify-center text-blue-600  font-semibold  leading-none">Skatturinn</div>
            </div>
            <div className="w-1 h-1 bg-blue-600 rounded-full" />
            <div data-color="Blue" data-filled="True" data-state="Default" className="p-2 bg-sky-50 rounded-lg flex justify-start items-center overflow-hidden">
              <div className="justify-end text-blue-600  font-semibold  leading-none">Skila skattframtali</div>
            </div>
          </div>
          <header className="space-y-2">
            <h1 className="text-3xl font-bold">RSK 1.01 Skattframtal einstaklinga</h1>
          </header>

          <section className="space-y-4">
            <div className="bg-blue rounded-xl text-blue-700 p-6 flex justify-between items-center mb-8">
              <h3 className="font-bold">Skil á skattframtali</h3>
                <a className="bg-blue-600 text-white font-bold rounded-lg p-4 flex" href="/innskraning">Opna framtal <svg className="ml-4" viewBox="0 0 512 512" data-testid="icon-open" fill="currentColor" color="currentColor" width="24px" height="24px"><path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48M336 64h112v112M224 288L440 72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></path></svg></a>
            </div>
            <h2 className="text-2xl font-semibold">Hér getur þú skilað skattframtali einstaklinga fyrir árið 2025</h2>
            <p className="text-gray-700  leading-relaxed">
            Flestar upplýsingar eru forskráðar en gott er að yfirfara. Þú getur bætt við og breytt upplýsingum. Að lokum þarft þú að staðfesta og skila framtali.
            </p>
            <h3 className="font-semibold">Almennar upplýsingar</h3>
            <p className="text-gray-700  leading-relaxed">
            Flestar upplýsingar í framtalinu eru forskráðar. Þú þarft að yfirfara þær og staðfesta eða breyta ef nauðsyn krefur. Þegar öll gögn eru rétt og tilbúin skilarðu framtalinu með einföldum hætti í lok ferlisins.
Þú skráir þig inn með rafrænum skilríkjum eða veflykli frá Skattinum.
Framtalið er opið frá 1. mars til 14. mars 2025. Ekki er hægt að sækja um framlengdan skilafrest.
Allir einstaklingar 16 ára og eldri sem voru búsettir á Íslandi árið 2024, höfðu tekjur eða áttu eignir, þurfa að skila framtali.
            </p>
            <h3 className="font-semibold">Að skrá sig inn</h3>
            <p className="text-gray-700  leading-relaxed">
            Smelltu á hnappinn „Opna framtal“ til að hefja ferlið.
Þú getur auðkennt þig með rafrænum skilríkjum eða veflykli frá Skattinum.
Ef þú ert ekki með veflykil geturðu sótt hann á skattur.is með því að slá inn kennitölu og velja afhendingarmáta.
            </p>
            <h3 className="font-semibold">Hvað gerist eftir að framtali er skilað?</h3>
            <p className="text-gray-700  leading-relaxed">
            Þú færð staðfestingu á vefnum þegar skilað hefur verið.
Skilaboð berast einnig í pósthólfið þitt á Ísland.is.
Fæ ég endurgreiðslu eða þarf ég að borga?
Niðurstöður álagningar birtast í lok maí.
Ef of mikið var dregið af í staðgreiðslu færðu endurgreiðslu.
Ef of lítið var dregið af þarftu að greiða mismuninn.
            </p>
            <h3 className="font-semibold">Greidd leiga og fylgiskjöl</h3>
            <p className="text-gray-700  leading-relaxed">
            Ef þú greiddir leigu á árinu 2024 þarftu að skila upplýsingum um leigusala og greiðslur.
Þetta er gert með því að fylla út fylgiskjal RSK 2.02 sem þú sendir með framtalinu.
            </p>
            <h3 className="font-semibold">Tekjur erlendis frá</h3>
            <p className="text-gray-700  leading-relaxed">
            Ef þú hafðir tekjur erlendis árið 2024 þarftu að skrá þær sérstaklega í framtalinu.
Þú þarft einnig að gera grein fyrir uppruna þeirra og skattlagningu í viðkomandi landi.
            </p>
            <h3 className="font-semibold">Þarftu aðstoð?</h3>
            <p className="text-gray-700  leading-relaxed">
            Sími: 442 1414
Netfang: framtal@skatturinn.is
            </p>
          </section>
        </main>
      </div>
    </div>

    </Layout>
  );
}
