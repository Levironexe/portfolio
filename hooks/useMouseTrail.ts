import { useState, useEffect, useRef } from 'react';

interface Trail {
  id: number;
  x: number;
  y: number;
  color: string;
}

const randomColor = () => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-cyan-500',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const useMouseTrail = (maxTrails: number = 20, trailLifetime: number = 1000) => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const newTrail: Trail = {
        id: trailIdRef.current++,
        x: event.clientX,
        y: event.clientY,
        color: randomColor(),
      };

      setTrails((prevTrails) => {
        const updatedTrails = [...prevTrails, newTrail];
        // Keep only the last maxTrails items
        return updatedTrails.slice(-maxTrails);
      });

      // Remove trail after lifetime
      setTimeout(() => {
        setTrails((prevTrails) =>
          prevTrails.filter((trail) => trail.id !== newTrail.id)
        );
      }, trailLifetime);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [maxTrails, trailLifetime]);

  return trails;
};
