// src/app/components/layout/Footer/Footer.tsx

'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="w-full px-6 sm:px-8 py-10 grid gap-6 md:grid-cols-[1fr_auto] items-start">
        <section className="grid gap-2">
          <h4 className="text-xl font-semibold">About SW-EAS</h4>
          <p className="text-sm">
            SW-EAS defines the global standard for ethical advertising. Our
            platform ensures regulatory compliance, brand safety, and
            reputational integrity at scale.
          </p>
        </section>

        <nav className="grid gap-2 justify-end text-right">
          <h4 className="text-xl font-semibold">Resources</h4>
          <Link
            href="/legal"
            className="text-sm underline underline-offset-2 hover:text-primary-600 dark:hover:text-primary-400"
          >
            Legal
          </Link>
        </nav>
      </div>

      <div className="grid gap-4 border-t border-gray-100 dark:border-gray-700 p-4 text-sm sm:px-8 md:grid-cols-[1fr_auto] items-center">
        <p>&copy; {currentYear} SW-EAS Inc. All rights reserved.</p>
        <p className="text-right">Compliance. Precision. Trust.</p>
      </div>
    </footer>
  );
}
