"use client";

import { Technology } from "@/lib/types";
import { getTechColor } from "@/lib/utils";
import { TextShimmer } from "../ui/text-shimmer";

interface SkillCategory {
  title: string;
  skills: string[];
}

// Map skill names to technology keys for color lookup
const skillTechMap: Record<string, Technology> = {
  Laravel: "laravel",
  PHP: "php",
  "Node.js": "node",
  "Express.js": "express",
  Livewire: "livewire",
  TypeScript: "typescript",
  "React.js": "react",
  "Next.js": "nextjs",
  "Angular.js": "angular",
  Ionic: "ionic",
  "Inertia.js": "inertia",
  "Tailwind CSS": "tailwind",
  Bootstrap: "bootstrap",
  Sass: "sass",
  CSS: "css",
  HTML: "html",
  JavaScript: "javascript",
  jQuery: "jquery",
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  "AWS (EC2/RDS/S3)": "aws",
  Docker: "docker",
  Git: "git",
  WordPress: "wordpress",
  Shopify: "shopify",
  Joomla: "joomla",
  Vue: "vue",
};

const skillsData: SkillCategory[] = [
  {
    title: "Backend",
    skills: ["Laravel", "PHP", "Node.js", "Express.js", "Livewire", "TypeScript"],
  },
  {
    title: "Frontend",
    skills: [
      "Vue",
      "React.js",
      "Next.js",
      "Angular.js",
      "Ionic",
      "Inertia.js",
      "Tailwind CSS",
      "Bootstrap",
      "Sass",
      "CSS",
      "HTML",
      "JavaScript",
      "TypeScript",
      "jQuery",
    ],
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS (EC2/RDS/S3)", "Docker", "Git"],
  },
  {
    title: "CMS & Platforms",
    skills: ["WordPress", "Shopify", "Joomla"],
  },
];

export function Skills() {
  return (
    <section className="border-border/50 bg-background/80 border-l px-8 pb-20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <TextShimmer as="h2" className="mb-12 text-3xl font-bold [--base-color:var(--primary)] [--base-gradient-color:var(--accent)]">
          Skills & Expertise
        </TextShimmer>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-8">
          {skillsData.map((category) => (
            <div key={category.title} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors duration-300">
              {/* Category Title */}
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                {category.title}
              </h3>

              {/* Skills List */}
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const techKey = skillTechMap[skill];
                  const colors = techKey ? getTechColor(techKey) : getTechColor("javascript" as Technology);
                  return (
                    <li
                      key={skill}
                      className={`px-3 py-1.5 ${colors.bg} ${colors.text} rounded-full text-sm font-medium transition-colors duration-200`}
                    >
                      {skill}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
