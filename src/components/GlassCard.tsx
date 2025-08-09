// -----------------------------------------------------------------------------
// GlassCard.tsx – drop-in replacement for your current <section> element.
// -----------------------------------------------------------------------------
import clsx from 'clsx';
import { PropsWithChildren, HTMLAttributes } from 'react';
import { useSpotlight } from '../hooks/useSpotlight';

type CardProps = HTMLAttributes<HTMLElement>;

export default function GlassCard({
  children,
  className,
  ...rest
}: PropsWithChildren<CardProps>) {
  const ref = useSpotlight<HTMLElement>();

  return (
    <section
      ref={ref}
      className={clsx(
        'glass-base relative overflow-hidden isolate group',
        className
      )}
      {...rest}
    >
      {children}
      {/* ::before is handled purely in CSS */}
    </section>
  );
} 