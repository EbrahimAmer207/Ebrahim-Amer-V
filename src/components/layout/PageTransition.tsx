'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    // When the path changes, increment our key to trigger a fresh curtain swipe animation.
    // Avoid triggering on the very first page load (when animKey is 0) to let the main Loader run cleanly.
    setAnimKey((prev) => prev + 1);
  }, [pathname]);

  return (
    <>
      {/* 
        This div will receive a new key and the active animation class 
        whenever pathname changes, forcing a hardware-accelerated CSS scale swipe.
      */}
      <div
        key={animKey}
        className={`curtain-overlay ${animKey > 0 ? 'curtain-overlay-active' : ''}`}
      />
      {children}
    </>
  );
}
