// src/app/login/page.tsx

import { LoginForm } from '@/components/ui/login-form';

export default function LoginPage() {
  return (
    <div className="h-full grid place-items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <LoginForm />
    </div>
  );
}
