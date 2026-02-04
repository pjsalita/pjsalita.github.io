import { Technology } from "@/lib/types";
import { skillTechMap } from "@/lib/data";
import { Badge } from "./ui/badge";

export function TechBadge({ technology }: { technology: Technology }) {
  const tech = skillTechMap[technology];
  return (
    <Badge variant="secondary" className={`${tech.bg} ${tech.text} font-medium transition-colors`}>
      {tech.label}
    </Badge>
  );
}
