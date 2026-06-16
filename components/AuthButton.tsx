'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const AuthButton = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const error = searchParams ? searchParams.get('error') : null;

  let errorMessage = '';
  if (error) {
    if (error === 'AccessDenied') {
      errorMessage = 'Access denied. Your email is not registered on the allowed list.';
    } else {
      errorMessage = 'An authentication error occurred. Please try again.';
    }
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center gap-4 max-w-sm w-full px-6">
        {errorMessage && (
          <div className="w-full p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm text-center font-medium">
            {errorMessage}
          </div>
        )}
        <button
          onClick={() => signIn('google')}
          className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-medium transition duration-200 shadow-sm"
        >
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-xl font-medium transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default AuthButton;
