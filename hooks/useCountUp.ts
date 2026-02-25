"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  target: number;
  duration?: number;
  decimal?: boolean;
}

export default function useCountUp({
  target,
  duration = 2000,
  decimal = false,
}: UseCountUpOptions) {
  // SSR/SSG에서는 target 값을 표시 (SEO + noscript 대응)
  const [count, setCount] = useState(target);
  const [hasMounted, setHasMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 클라이언트 마운트 시 0으로 리셋
  useEffect(() => {
    setCount(0);
    setHasMounted(true);
  }, []);

  // IntersectionObserver로 뷰포트 진입 감지
  useEffect(() => {
    if (!hasMounted || hasAnimated) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMounted, hasAnimated]);

  // 카운트업 애니메이션
  useEffect(() => {
    if (!hasAnimated) return;

    const start = performance.now();

    function update(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      setCount(decimal ? parseFloat(current.toFixed(1)) : Math.floor(current));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // 최종값 정확히 설정
        setCount(target);
      }
    }

    requestAnimationFrame(update);
  }, [hasAnimated, target, duration, decimal]);

  return { count, ref };
}
