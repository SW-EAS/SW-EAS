// src/app/components/layout/Header/Header.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="w-full grid grid-cols-[1fr_auto] items-center border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-4">
      <Link
        href="/"
        className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
      >
        SW / EAS
      </Link>
      <Link href="/login" className="justify-self-end">
        <Button
          variant="link"
          className="p-0 h-auto text-gray-800 dark:text-gray-100 underline"
        >
          Login
        </Button>
      </Link>
    </header>
  );
}
