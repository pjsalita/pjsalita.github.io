import { cn } from "@/lib/utils";
import { TextShimmer } from "./ui/text-shimmer";

export function Section({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("border-border/50 bg-background/80 border-l dark:border-accent/60 px-8 pb-20 first:lg:pt-20 backdrop-blur-sm", className)}>
      <TextShimmer as="h2" className="mb-12 text-3xl font-bold [--base-color:var(--primary)] [--base-gradient-color:var(--accent)]">
        {title}
      </TextShimmer>
      {children}
    </section>
  );
}
