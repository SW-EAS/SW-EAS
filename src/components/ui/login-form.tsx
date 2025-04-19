//src/app/components/ui/login-form

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

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
        'grid gap-6 container mx-auto w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg',
        className
      )}
      {...props}
    >
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-0">
        <CardContent className="grid md:grid-cols-2 p-0 ">
          <div className="grid grid-rows-[auto_1fr_auto] p-6">
            {/* Row 1: Heading */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-gray-700 dark:text-gray-300">
                Login to your SW-EAS account
              </p>
            </div>

            {/* Row 2: Form */}
            <form
              className="grid gap-6 w-full max-w-md justify-self-center self-center"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="focus:outline-none focus:ring-0"
                />
              </div>

              <div className="grid gap-3">
                <div className="grid grid-cols-[auto_1fr] items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="justify-self-end text-sm text-blue-600 dark:text-blue-400 underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="focus:outline-none focus:ring-0"
                />
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>

              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-600">{success}</p>}
            </form>

            {/* Row 3: Alternative Action */}
            <div className="text-center text-sm text-gray-700 dark:text-gray-300 mt-6">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="underline underline-offset-4 text-blue-600 dark:text-blue-400"
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* Column 2: Full-height Gradient */}
          <div className="hidden md:block w-full h-full bg-gradient-to-br from-blue-100 via-purple-200 to-pink-300 dark:from-blue-900 dark:via-purple-800 dark:to-pink-900 rounded-r-lg" />
        </CardContent>
      </Card>

      <div className="text-center text-xs text-gray-700 dark:text-gray-400 text-balance">
        By clicking continue, you agree to our{' '}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
