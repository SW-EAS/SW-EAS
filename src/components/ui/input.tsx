// src/components/ui/input.tsx

import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        // Core layout
        'grid w-full h-9 min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base md:text-sm',

        // Visuals
        'placeholder:text-muted-foreground file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30',

        // Focus
        'focus:outline-none focus:ring-0 focus:border-input',

        // States
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',

        // File input tweaks
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',

        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
