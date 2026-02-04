"use client";

import { useEffect, useRef } from "react";

export function useSyncScroll() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sticky = stickyRef.current;
    const content = contentRef.current;

    if (!sticky || !content) return;

    const handleStickyScroll = (e: WheelEvent) => {
      if (content.scrollHeight > content.clientHeight) {
        e.preventDefault();
        content.scrollTop += e.deltaY;
      }
    };

    sticky.addEventListener("wheel", handleStickyScroll, { passive: false });

    return () => {
      sticky.removeEventListener("wheel", handleStickyScroll);
    };
  }, []);

  return { stickyRef, contentRef };
}
