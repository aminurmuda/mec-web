'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

const NavbarProfile = () => {
  const { redirect } = useLocale();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (status === 'loading') {
    return <div className="w-24 h-9 bg-gray-200 rounded-full animate-pulse" />;
  }

  if (!session) {
    return null;
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        onClick={handleToggle}
        className="flex items-center gap-3 px-2 py-1.5 rounded-full hover:bg-gray-100 transition"
      >
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || 'User'}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full text-sm font-medium">
            {session.user?.name?.charAt(0)}
          </div>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-3 w-72 bg-white rounded-2xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4">
              <p className="text-sm font-semibold text-gray-900">{session.user?.name}</p>
              <p className="text-xs text-gray-500 mt-1 truncate">{session.user?.email}</p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100" />

            {/* Menu */}
            <div className="py-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  redirect('/profile');
                }}
                className="w-full text-left px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Profile
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100" />

            {/* Footer */}
            <div className="py-2">
              <button
                onClick={handleLogout}
                className="w-full text-left px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
              >
                Log out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavbarProfile;
