"use client";

import { Section } from "../section";
import { skills } from "@/lib/data";
import { TechBadge } from "../tech-badge";

export function Skills() {
  return (
    <Section title="Skills & Expertise">
      <div className="grid grid-cols-1 gap-8">
        {skills.map((category) => (
          <div key={category.title} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              {category.title}
            </h3>

            <ul className="flex flex-wrap gap-2">
              {category.skills.map((tech) => (
                <TechBadge key={tech} technology={tech} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
