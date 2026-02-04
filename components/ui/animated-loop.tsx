import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import type React from 'react';
import { Children, isValidElement, useEffect, useState } from 'react';

export interface AnimatedLoopProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Duration in milliseconds for each child to be displayed
   * @default 3000
   */
  duration?: number;
  /**
   * Transition duration in milliseconds
   * @default 500
   */
  transitionDuration?: number;
  /**
   * Whether to pause the animation when hovering
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * The animation type for transitions
   * @default "fade"
   */
  animationType?: 'fade' | 'slide' | 'zoom' | 'none';
  /**
   * Whether to show indicators
   * @default false
   */
  showIndicators?: boolean;
  /**
   * Whether to show navigation arrows
   * @default false
   */
  showArrows?: boolean;
  /**
   * Whether to autoplay the loop
   * @default true
   */
  autoplay?: boolean;
}

/**
 * AnimatedLoop
 *
 * A component that loops through its children with configurable animation and timing.
 */
export function AnimatedLoop({
  children,
  duration = 3000,
  transitionDuration = 500,
  pauseOnHover = false,
  animationType = 'fade',
  showIndicators = false,
  showArrows = false,
  autoplay = true,
  className,
  ...props
}: AnimatedLoopProps) {
  const validChildren = Children.toArray(children).filter(isValidElement);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const childCount = validChildren.length;

  // Handle edge cases
  if (childCount === 0) return null;
  if (childCount === 1) return <div className={className}>{children}</div>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!autoplay || isPaused) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % childCount);
    }, duration);

    return () => clearTimeout(timer);
  }, [isPaused, autoplay, duration, childCount]); // Removed currentIndex from dependencies

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % childCount);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + childCount) % childCount);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  // Animation variants based on the selected animation type
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { x: 20, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -20, opacity: 0 },
    },
    zoom: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.1, opacity: 0 },
    },
    none: {
      initial: {},
      animate: {},
      exit: {},
    },
  };

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      {...props}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={variants[animationType].initial}
          animate={variants[animationType].animate}
          exit={variants[animationType].exit}
          transition={{ duration: transitionDuration / 1000 }}
          className="w-full"
        >
          {validChildren[currentIndex]}
        </motion.div>
      </AnimatePresence>

      {showArrows && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between">
          <button
            onClick={goToPrev}
            className="text-primary hover:bg-primary hover:text-primary-foreground pointer-events-auto z-10 ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-colors"
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="text-primary hover:bg-primary hover:text-primary-foreground pointer-events-auto z-10 mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-colors"
            aria-label="Next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      {showIndicators && (
        <div className="absolute right-0 bottom-4 left-0 flex justify-center gap-2">
          {validChildren.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={cn('h-2 w-2 rounded-full transition-all', index === currentIndex ? 'bg-primary w-4' : 'bg-primary/30 hover:bg-primary/50')}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
