import { useState, useRef } from 'react';

export interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

export function useClickEffects() {
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePageClick = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now() + Math.random();
      setClickEffects(prev => [...prev, { id, x, y }]);
      setTimeout(() => {
        setClickEffects(prev => prev.filter(effect => effect.id !== id));
      }, 350);
    }
  };

  return { containerRef, clickEffects, handlePageClick };
}
