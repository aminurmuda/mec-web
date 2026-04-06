'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

const FloatingVisitorCounter = () => {
  const [count, setCount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
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

      const res = await fetch('/api/visitors', {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
      });

      const data = await res.json();
      setTotal(data.total || 0);
    };

    run();
  }, []);

  // ✅ ease-out animation (smooth & time-based)
  useEffect(() => {
    if (total === 0) return;

    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        setCount(total);
        return;
      }

      // ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(easedProgress * total);

      setCount(value);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [total]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="shadow-lg rounded-lg bg-white"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 50,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        opacity: 0.6,
      }}
    >
      <p className="px-4 py-2 rounded-lg font-semibold text-xs w-34">Total Visitors: {count}</p>
    </div>,
    document.body,
  );
};

export default FloatingVisitorCounter;
