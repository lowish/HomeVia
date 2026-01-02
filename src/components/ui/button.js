import React from 'react';

const baseClasses =
  'inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md';

const variants = {
  // Public pages
  user: {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
    secondary:
      'bg-[var(--surface-soft)] text-blue-700 border border-blue-600 hover:bg-[#f0eeea] focus:ring-blue-600',
  },
  // Dashboard (admin)
  admin: {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
    secondary:
      'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
  },
};

export function Button({
  children,
  role = 'user', // 'user' | 'admin'
  intent = 'primary', // 'primary' | 'secondary' | 'danger'
  className = '',
  ...props
}) {
  const roleVariants = variants[role] || variants.user;
  const intentClasses = roleVariants[intent] || roleVariants.primary;

  // Accessibility: ensure type button by default to avoid form submits unexpectedly
  const type = props.type || 'button';

  return (
    <button type={type} className={`${baseClasses} ${intentClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
