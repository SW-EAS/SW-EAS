// src/app/page.tsx

import { ShieldCheck } from 'lucide-react';

export default async function Home() {
  return (
    <>
      <section className="h-full grid place-items-center px-6 py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-xl w-full grid gap-6 text-center">
          <ShieldCheck className="h-16 w-16 mx-auto text-primary-600 dark:text-primary-400" />
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight">
            Eliminate risk, enforce compliance, and protect brand reputation
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Our verification platform ensures every campaign reflects your
            authority, aligns with strict regulatory, brand standards, and
            reinforces the integrity of your business. When you&#39;re in
            charge, nothing less than flawless execution is acceptable.
          </p>
        </div>
      </section>
    </>
  );
}
