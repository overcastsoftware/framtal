"use client";

import LoginForm from "../components/login";

export default function Home() {
  return (
    <>
    
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 sm:p-1 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] w-full row-start-2 items-center sm:items-start">
        <div className="flex flex-row gap-2 w-full justify-between items-center sm:items-center">
            <LoginForm />
        </div>
      </main>
    </div>
    </>
  );
}