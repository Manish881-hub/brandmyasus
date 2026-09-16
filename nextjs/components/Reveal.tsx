'use client';
import { useEffect, useRef, type ReactNode } from 'react';

export default function Reveal({ children, y = 18 }: { children: ReactNode; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [y]);
  return <div ref={ref}>{children}</div>;
}
