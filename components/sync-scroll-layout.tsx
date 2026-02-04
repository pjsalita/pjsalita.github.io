"use client";

import { Profile } from "./home/profile";
import { AppDock } from "./app-dock";
import { useSyncScroll } from "@/hooks/use-sync-scroll";

export function SyncScrollLayout({ children }: { children: React.ReactNode }) {
  const { stickyRef, contentRef } = useSyncScroll();

  return (
    <div className="bg-background text-foreground relative min-h-screen w-full overflow-hidden lg:flex lg:h-screen">
      <Profile ref={stickyRef} />

      <div ref={contentRef} className="w-full lg:h-screen lg:w-1/2 lg:overflow-y-auto">
        {children}
      </div>

      <AppDock />
    </div>
  );
}
