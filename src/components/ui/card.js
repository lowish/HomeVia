import React from 'react';

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-[var(--surface-soft)] rounded-lg shadow border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

export default Card;
