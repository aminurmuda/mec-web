'use client'; // <<< add this at the very top

import { ReactNode } from 'react';

const ButtonCTA = ({
  fullWidth = false,
  children,
}: {
  fullWidth?: boolean;
  children: ReactNode;
}) => {
  const redirectToWA = () => {
    const phone = '628999325539';
    const message = encodeURIComponent('Hello!');
    const waUrl = `https://wa.me/${phone}?text=${message}`;
    const appUrl = `whatsapp://send?phone=${phone}&text=${message}`;

    window.location.href = appUrl;
    setTimeout(() => {
      window.location.href = waUrl;
    }, 500);
  };

  return (
    <button
      onClick={redirectToWA}
      className={`px-8 py-3 bg-brand-primary text-white rounded-lg hover:opacity-90 font-bold ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </button>
  );
};

export default ButtonCTA;
