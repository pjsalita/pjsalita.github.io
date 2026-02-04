import { ChevronRight } from "lucide-react";
import { Section } from "../section";
import { positions } from "@/lib/data";
import { TechBadge } from "../tech-badge";

const WorkHistory = () => {
  return (
    <Section title="Work History">
      <div className="space-y-6">
        {positions.map((position, index) => (
          <div key={index} className="group relative pb-8 border-l dark:border-accent/50 border-border pl-8 last:pb-0">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary border-4 border-background group-hover:scale-125 transition-transform" />

            <div className="space-y-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{position.title}</h3>
                  <p className="text-base text-muted-foreground">{position.company}</p>
                </div>
                <div className="text-sm text-muted-foreground whitespace-nowrap">
                  {position.startDate} – {position.endDate}
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{position.location}</p>

              <ul className="space-y-2 mt-4">
                {position.description.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-foreground text-sm md:text-base">
                    <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex flex-wrap gap-2">
                {position.technologies.map((tech) => (
                  <TechBadge key={tech} technology={tech} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export { WorkHistory };
