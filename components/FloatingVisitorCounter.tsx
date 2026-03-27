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

      if (!visitorId) {
        visitorId = uuidv4();
        localStorage.setItem('visitorId', visitorId);

        await fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId }),
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
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      <div className="bg-brand-bg px-4 py-2 rounded-lg shadow-xl font-semibold">
        Total visitor: {count}
      </div>
    </div>,
    document.body,
  );
};

export default FloatingVisitorCounter;
