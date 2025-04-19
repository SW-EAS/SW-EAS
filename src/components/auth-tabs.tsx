'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type LoginForm = {
  email: string;
  password: string;
};

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  termsAccepted: boolean;
};

export default function AuthTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    termsAccepted: false,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = searchParams.get('tab');
    setTab(t === 'register' ? 'register' : 'login');
  }, [searchParams]);

  const handleChange =
    <T extends Record<string, unknown>>(
      setState: React.Dispatch<React.SetStateAction<T>>
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, type, checked, value } = e.target;
      setState((prev) => ({
        ...prev,
        [id]: type === 'checkbox' ? checked : value,
      }));
    };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      email: loginForm.email,
      password: loginForm.password,
    });

    if (!result || result.error) {
      setError(result?.error || 'Invalid credentials');
    } else {
      setSuccess('Login successful. Redirecting...');
      router.replace('/dashboard');
    }

    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!registerForm.termsAccepted) {
      setError('You must accept the Terms and Privacy Policy.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...registerForm, role: 'user' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess('Registration successful. Redirecting...');
      setTimeout(() => router.push('/auth?tab=login'), 1500);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full grid place-items-center bg-white dark:bg-gray-900 px-4 text-gray-900 dark:text-white">
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as 'login' | 'register')}
        className="w-full max-w-md"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardContent className="p-6">
              <form
                onSubmit={handleLogin}
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
                    value={loginForm.email}
                    onChange={handleChange(setLoginForm)}
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
                    value={loginForm.password}
                    onChange={handleChange(setLoginForm)}
                    required
                    autoComplete="current-password"
                    className="border border-gray-300 dark:border-gray-700 bg-transparent"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>

                {error && <p className="text-sm text-red-500">{error}</p>}
                {success && <p className="text-sm text-green-600">{success}</p>}

                <div className="text-center text-sm text-gray-700 dark:text-gray-300">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/auth?tab=register"
                    className="underline text-blue-600 dark:text-blue-400"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardContent className="p-6">
              <form
                onSubmit={handleRegister}
                noValidate
                className="w-full max-w-md grid gap-6"
              >
                <div>
                  <h1 className="text-2xl font-semibold mb-2">
                    Create an account
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Join SW-EAS and lead with integrity
                  </p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={registerForm.name}
                    onChange={handleChange(setRegisterForm)}
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
                    value={registerForm.email}
                    onChange={handleChange(setRegisterForm)}
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
                    value={registerForm.password}
                    onChange={handleChange(setRegisterForm)}
                    required
                    autoComplete="new-password"
                    className="border border-gray-300 dark:border-gray-700 bg-transparent"
                  />
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <input
                    id="termsAccepted"
                    type="checkbox"
                    checked={registerForm.termsAccepted}
                    onChange={handleChange(setRegisterForm)}
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

                {error && <p className="text-sm text-red-500">{error}</p>}
                {success && <p className="text-sm text-green-600">{success}</p>}

                <div className="text-sm text-gray-700 dark:text-gray-300 text-center">
                  Already have an account?{' '}
                  <Link
                    href="/auth?tab=login"
                    className="underline text-blue-600 dark:text-blue-400"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
