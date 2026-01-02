import React, { createContext, useContext, useState } from 'react';

const CarouselContext = createContext(null);

export function Carousel({ children, className = '' }) {
  const [index, setIndex] = useState(0);
  const value = {
    index,
    length: React.Children.count(children),
    setIndex,
  };
  return (
    <CarouselContext.Provider value={value}>
      <div className={`relative ${className}`}>{children}</div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ children }) {
  const ctx = useContext(CarouselContext);
  const items = React.Children.toArray(children);
  const active = items[ctx?.index ?? 0];
  return <div className="w-full">{active}</div>;
}

export function CarouselItem({ children }) {
  return <div className="w-full">{children}</div>;
}

export function CarouselNext({ className = '' }) {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;
  return (
    <button
      aria-label="Next"
      onClick={() => ctx.setIndex((i) => (i + 1) % ctx.length)}
      className={`absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-2 rounded text-2xl${className}`}
    >
      ❯
    </button>
  );
}

export function CarouselPrevious({ className = '' }) {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;
  return (
    <button
      aria-label="Previous"
      onClick={() => ctx.setIndex((i) => (i - 1 + ctx.length) % ctx.length)}
      className={`absolute left-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-2 rounded text-2xl${className}`}
    >
      ❮
    </button>
  );
}

export default Carousel;
