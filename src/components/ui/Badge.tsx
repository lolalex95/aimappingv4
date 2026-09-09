import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  const variantStyles = {
    primary: 'text-[#3CB4A3]',
    secondary: 'text-[#4F56A1]',
    neutral: 'text-[#4F5051]',
  };

  return (
    <span
      className={`text-xs font-mono font-bold tracking-widest uppercase inline-block ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
