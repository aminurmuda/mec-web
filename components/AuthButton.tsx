'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

const AuthButton = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button
        onClick={() => signIn('google')}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl"
      >
        Login with Google
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white rounded-xl">
        Logout
      </button>
    </div>
  );
};

export default AuthButton;
