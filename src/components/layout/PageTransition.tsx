'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(pathname);
  const [animKey, setAnimKey] = useState(0);

  // When the path changes, increment our key during render to trigger curtain swipe
  // (Avoids triggering on initial mount so Loader can complete cleanly)
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setAnimKey(animKey + 1);
  }

  return (
    <>
      <div
        key={animKey}
        className={`curtain-overlay ${animKey > 0 ? 'curtain-overlay-active' : ''}`}
      />
      {children}
    </>
  );
}
