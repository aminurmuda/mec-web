'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-32 h-32 bg-gray-200 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Not authenticated</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your personal information</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 p-6">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || 'User'}
                width={80}
                height={80}
                className="rounded-full"
              />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center bg-gray-300 rounded-full text-xl font-semibold">
                {session.user?.name?.charAt(0)}
              </div>
            )}

            {/* Info */}
            <div>
              <p className="text-lg font-semibold text-gray-900">{session.user?.name}</p>
              <p className="text-sm text-gray-500 mt-1">{session.user?.email}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 my-6" />

          {/* Details */}
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="text-sm font-medium text-gray-900 mt-1">{session.user?.name}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Email Address</p>
              <p className="text-sm font-medium text-gray-900 mt-1">{session.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
