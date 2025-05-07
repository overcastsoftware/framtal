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
    <div className="max-w-[1440px] mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Navigation Column */}
        <aside className="space-y-4">
          <div className="bg-gray p-4 rounded-xl">
            <div className="font-semibold text-lg mb-2">Stofnun</div>
            <div className="text-gray-700">Skatturinn</div>
          </div>

          <nav className="bg-blue p-4 rounded-xl">
            <h2 className="font-semibold text-lg mb-2">Efnisyfirlit</h2>
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
        <div data-level="3" className="h-8 inline-flex justify-start items-center gap-2 overflow-hidden">
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
                <a className="bg-blue-600 text-white font-bold rounded-lg p-4 flex" href="/login">Opna framtal <svg className="ml-4" viewBox="0 0 512 512" data-testid="icon-open" fill="currentColor" color="currentColor" width="24px" height="24px"><path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48M336 64h112v112M224 288L440 72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path></svg></a>
            </div>
            <h2 className="text-2xl font-semibold">Hér getur þú skilað skattframtali einstaklinga fyrir árið 2025</h2>
            <p className="text-gray-700  leading-relaxed">
              Foreldrar geta átt rétt á fæðingarorlofi þegar barn þeirra fæðist, er frumburður eða tekið í varanlegt fóstur. Hvort foreldri á rétt á 6 mánuðum í fæðingarorlof og heildaréttur beggja foreldra er því 12 mánuðir.
            </p>
            <p className="text-gray-700  leading-relaxed">
              Skilyrði er að hafa unnið á Íslandi samfellt síðustu 6 mánuðina fyrir fæðingardag barns, í að minnsta kosti 25% starfshlutfalli í hverjum mánuði.
            </p>
            <a href="#" className="text-blue-700  underline">Nánar um rétt til fæðingarorlofs</a>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">Að sækja um</h2>
            <p className=" text-gray-700">Hvenær á ég að sækja um?</p>
            {/* Additional content here */}
          </section>
        </main>
      </div>
    </div>
    
  );
}