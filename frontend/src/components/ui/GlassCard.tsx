import type { HTMLAttributes, ReactNode } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '', ...rest }: GlassCardProps) {
  return (
    <div className={`glass rounded-2xl p-6 ${className}`} {...rest}>
      {children}
    </div>
  );
}
