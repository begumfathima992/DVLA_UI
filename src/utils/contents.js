import { useEffect, useRef, useState } from "react";

export function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else setCount(Math.floor(start));
          }, 16);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export const fmt = (n) => `£${Number(n).toFixed(2)}`;

// ─── CALCULATE LINE ITEMS SUBTOTAL ──────────────────────────────────────────
export const calcLineTotal = (items = []) =>
  items.reduce(
    (sum, it) => sum + parseFloat(it.qty || 1) * parseFloat(it.rate || 0),
    0,
  );

// ─── TODAY'S DATE AS ISO STRING ──────────────────────────────────────────────
export const today = () => new Date().toISOString().slice(0, 10);

// ─── PAD ID ──────────────────────────────────────────────────────────────────
export const padId = (prefix, count) =>
  `${prefix}-${String(count + 1).padStart(3, "0")}`;
