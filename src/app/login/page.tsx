// src/app/login/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/auth?tab=login');
  }, [router]);

  return null;
}
