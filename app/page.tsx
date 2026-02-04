import { Contact } from "@/components/home/contact";
import { Projects } from "@/components/home/projects";
import { Skills } from "@/components/home/skills";
import { WorkHistory } from "@/components/home/work-history";

export default function Portfolio() {
  return (
    <div className="relative">
      <WorkHistory />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}
