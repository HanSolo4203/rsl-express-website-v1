"use client";

import { useEffect } from "react";
import Lenis from "lenis";

type LenisProviderProps = {
  children: React.ReactNode;
  /** Pass options to Lenis if needed */
  options?: ConstructorParameters<typeof Lenis>[0];
};

export function LenisProvider({ children, options }: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      ...options,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      // @ts-expect-error lenis has destroy at runtime
      lenis?.destroy?.();
    };
  }, [options]);

  return children as JSX.Element;
}

export default LenisProvider;


