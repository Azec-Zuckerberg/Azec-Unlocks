import clsx from 'clsx';
import { PropsWithChildren, HTMLAttributes } from 'react';
import { useSpotlight } from '../hooks/useSpotlight';

type OptimizedGlassProps = HTMLAttributes<HTMLElement> & {
  variant?: 'ultra' | 'premium' | 'standard';
};

export default function OptimizedGlass({
  children,
  className,
  variant = 'standard',
  ...rest
}: PropsWithChildren<OptimizedGlassProps>) {
  const ref = useSpotlight<HTMLElement>();

  const variantStyles = {
    ultra: 'bg-white/8 border-white/25 backdrop-blur-xl',
    premium: 'bg-white/6 border-white/20 backdrop-blur-lg',
    standard: 'bg-white/4 border-white/15 backdrop-blur-md'
  };

  return (
    <section
      ref={ref}
      className={clsx(
        'glass-base relative overflow-hidden isolate group border',
        variantStyles[variant],
        className
      )}
      style={{
        WebkitBackdropFilter: variant === 'ultra' ? 'blur(24px)' : variant === 'premium' ? 'blur(16px)' : 'blur(12px)',
      }}
      {...rest}
    >
      {children}
      {/* ::before is handled purely in CSS */}
    </section>
  );
}