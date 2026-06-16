import { Suspense } from 'react';
import AuthButton from '@/components/AuthButton';

const LoginPage = () => {
  return (
    <div className="bg-white h-screen w-full flex items-center justify-center">
      <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
        <AuthButton />
      </Suspense>
    </div>
  );
};

export default LoginPage;
