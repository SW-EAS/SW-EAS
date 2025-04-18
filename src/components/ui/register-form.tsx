'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      setSuccess('Registration successful. Redirecting to login...');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Something went wrong');
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-lg',
        className
      )}
      {...props}
    >
      <Card className="overflow-hidden p-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-gray-700 dark:text-gray-300 text-balance">
                  Join SW-EAS and lead with integrity
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>

              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-600">{success}</p>}

              <div className="text-center text-sm text-gray-700 dark:text-gray-300">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="underline underline-offset-4 text-blue-600 dark:text-blue-400"
                >
                  Login
                </a>
              </div>
            </div>
          </form>
          <div className="hidden md:block bg-gradient-to-br from-blue-100 via-purple-200 to-pink-300 dark:from-blue-900 dark:via-purple-800 dark:to-pink-900" />
        </CardContent>
      </Card>
      <div className="text-center text-xs text-gray-700 dark:text-gray-400 text-balance">
        By signing up, you agree to our{' '}
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
