import { useRef, useEffect } from 'react';

/** Adds a "follow-the-mouse" spotlight to any element. */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handle = (e: MouseEvent) => {
      const { left, top } = el.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      // Write once per frame – avoids flooding style recalcs
      requestAnimationFrame(() => {
        el.style.setProperty('--x', `${x}px`);
        el.style.setProperty('--y', `${y}px`);
      });
    };

    el.addEventListener('mousemove', handle);
    return () => el.removeEventListener('mousemove', handle);
  }, []);

  return ref;
} 