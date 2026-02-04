'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

interface ScrollableImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  className?: string;
  scrollDuration?: number;
  scrollDelay?: number;
  autoScroll?: boolean;
  containerHeight?: number;
  hoverOnly?: boolean;
}

export function ScrollableImage({
  src,
  alt = '',
  className,
  scrollDuration = 10,
  scrollDelay = 0,
  autoScroll = true,
  hoverOnly = false,
  ...props
}: ScrollableImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: false });
  const [isHovered, setIsHovered] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, [containerRef]);

  const resetScroll = useCallback(() => {
    setIsHovered(false);
    controls.start({
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    });
  }, [controls]);

  // useEffect(() => {
  //   const imageHeight = imageRef.current?.offsetHeight || 0;

  //   if (isInView && autoScroll && (!hoverOnly || isHovered || isMobile) && imageHeight > containerHeight) {
  //     const scrollDistance = imageHeight - containerHeight;

  //     controls.start({
  //       y: [0, -scrollDistance, 0],
  //       transition: {
  //         duration: scrollDuration,
  //         delay: scrollDelay,
  //         ease: [0.4, 0, 0.2, 1],
  //         repeat: Infinity,
  //         times: [0, 1],
  //       },
  //     });
  //   } else {
  //     controls.stop();
  //     if (!isHovered) {
  //       resetScroll();
  //     }
  //   }
  // }, [resetScroll, isInView, controls, autoScroll, scrollDuration, scrollDelay, containerHeight, hoverOnly, isHovered, isMobile]);

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full overflow-hidden', className)}
      style={{ height: '100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => resetScroll()}
      {...props}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ y: 0 }}
        animate={controls}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 30,
          restDelta: 0.001,
        }}
      >
        <img ref={imageRef} src={src} alt={alt} className="h-auto w-full" />
      </motion.div>
    </div>
  );
}
