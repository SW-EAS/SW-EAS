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
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    termsAccepted: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, type, checked, value } = e.target;
    setForm({ ...form, [id]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!form.termsAccepted) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: 'user',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess('Registration successful. Redirecting...');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
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
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Create an account</h1>
              <p className="text-gray-700 dark:text-gray-300">
                Join SW-EAS and lead with integrity
              </p>
            </div>

            <form
              className="grid gap-6 w-full max-w-md justify-self-center self-center"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className="focus:outline-none focus:ring-0"
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
                  autoComplete="email"
                  required
                  className="focus:outline-none focus:ring-0"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className="focus:outline-none focus:ring-0"
                />
              </div>

              <div className="flex items-start gap-2 text-sm">
                <input
                  id="termsAccepted"
                  type="checkbox"
                  checked={form.termsAccepted}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
                <label
                  htmlFor="termsAccepted"
                  className="text-gray-700 dark:text-gray-400"
                >
                  I agree to the{' '}
                  <a
                    href="#"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="#"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Registering...' : 'Sign Up'}
              </Button>

              {error && (
                <p className="text-sm text-red-500" aria-live="assertive">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-sm text-green-600" aria-live="polite">
                  {success}
                </p>
              )}
            </form>

            <div className="text-center text-sm text-gray-700 dark:text-gray-300 mt-6">
              Already have an account?{' '}
              <a
                href="/login"
                className="underline underline-offset-4 text-blue-600 dark:text-blue-400"
              >
                Login
              </a>
            </div>
          </div>

          <div className="hidden md:block w-full h-full bg-gradient-to-br from-blue-100 via-purple-200 to-pink-300 dark:from-blue-900 dark:via-purple-800 dark:to-pink-900 rounded-r-lg" />
        </CardContent>
      </Card>

      <div className="text-center text-xs text-gray-700 dark:text-gray-400 text-balance">
        All verified advertisements will be displayed in the image container
        here.
      </div>
    </div>
  );
}
