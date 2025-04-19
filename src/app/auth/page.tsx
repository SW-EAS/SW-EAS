import AuthTabs from '@/components/auth-tabs';

export default function AuthPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full text-gray-900 dark:text-white">
      {/* Left column: Auth forms */}
      <div className="flex items-center justify-center p-6">
        <AuthTabs />
      </div>

      {/* Right column: Branding / illustration */}
      <div className="hidden md:flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        {/* Branding/logo/illustration */}
        <div className="text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Welcome to SW-EAS</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
            Empowering ethical advertising. Join us and make your message
            matter.
          </p>
        </div>
      </div>
    </div>
  );
}
