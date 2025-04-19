'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
        'grid grid-cols-1 md:grid-cols-2 h-full w-full text-gray-900 dark:text-white',
        className
      )}
      {...props}
    >
      <div className="grid place-items-center px-6 py-12">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full max-w-md grid gap-6"
        >
          <div>
            <h1 className="text-2xl font-semibold mb-2">Create an account</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Join SW-EAS and lead with integrity
            </p>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="border border-gray-300 dark:border-gray-700 bg-transparent"
            />
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="border border-gray-300 dark:border-gray-700 bg-transparent"
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
            <label htmlFor="termsAccepted">
              I agree to the{' '}
              <a href="#" className="underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="underline">
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

          <div className="text-sm text-gray-700 dark:text-gray-300 text-center">
            Already have an account?{' '}
            <a
              href="/login"
              className="underline text-blue-600 dark:text-blue-400"
            >
              Login
            </a>
          </div>
        </form>
      </div>

      <div className="hidden md:grid place-items-center bg-gray-100 dark:bg-gray-900 w-full h-full">
        {/* Optional: Add branding, logo, or illustration */}
      </div>
    </div>
  );
}
