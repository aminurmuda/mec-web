'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

const FloatingVisitorCounter = () => {
  const [count, setCount] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const run = async () => {
      let visitorId = localStorage.getItem('visitorId');

      let source: string | null = null;

      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        source = params.get('source');
      }

      if (!visitorId) {
        visitorId = uuidv4();
        localStorage.setItem('visitorId', visitorId);

        await fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId, source }),
        });
      }

      const res = await fetch('/api/visitors');
      const data = await res.json();

      setCount(data.total || 0);
    };

    run();
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="shadow-lg rounded-lg bg-brand-bg"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <p className="px-4 py-2 font-semibold">Total visitor: {count}</p>
    </div>,
    document.body,
  );
};

export default FloatingVisitorCounter;
