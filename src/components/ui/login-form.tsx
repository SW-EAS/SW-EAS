//src/app/components/ui/login-form

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (!result || result.error) {
      setError(result?.error || 'Invalid credentials');
    } else {
      setSuccess('Login successful. Redirecting...');
      router.replace('/dashboard');
    }
  };

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 h-full w-full text-gray-900 dark:text-white',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full max-w-md grid gap-6"
        >
          <div>
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Login to your SW-EAS account
            </p>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>

          <div className="grid gap-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="text-sm text-blue-600 dark:text-blue-400 underline-offset-2 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <div className="text-center text-sm text-gray-700 dark:text-gray-300">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="underline text-blue-600 dark:text-blue-400"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>

      <div className="hidden md:grid place-items-center bg-gray-100 dark:bg-gray-900 w-full h-full">
        {/* Placeholder for image/branding if needed */}
      </div>
    </div>
  );
}
