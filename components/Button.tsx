'use client'; // <<< add this at the very top

import { ReactNode } from 'react';
import { scrollTo } from './utils';

const ButtonCTA = ({
  fullWidth = false,
  children,
}: {
  fullWidth?: boolean;
  children: ReactNode;
}) => {
  return (
    <button
      onClick={() => scrollTo('registration')}
      className={`px-8 py-3 bg-brand-primary text-white rounded-lg hover:opacity-90 font-bold ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </button>
  );
};

export default ButtonCTA;
