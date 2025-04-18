// src/app/login/page.tsx

import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6 md:p-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
