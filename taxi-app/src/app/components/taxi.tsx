import React, { useEffect, useRef, useState } from 'react';

export default function Taxi() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(300);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const adjustedHeight = Math.max(
          300,
          Math.min(500, containerWidth * 0.6),
        );
        setHeight(adjustedHeight);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gray-100 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
      style={{
        padding: '10px',
        boxSizing: 'border-box',
      }}
    >
      <img
        src="/img/map.png"
        alt="Mapa"
        className="w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"
        style={{
          height: `${height}px`,
          maxHeight: '500px',
          filter: 'brightness(95%) contrast(105%)',
        }}
      />
      <></>
    </div>
  );
}
