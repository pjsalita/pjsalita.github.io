import { Contact } from "@/components/home/contact";
import { Projects } from "@/components/home/projects";
import { Skills } from "@/components/home/skills";

export default function Portfolio() {
  return (
    <div className="relative">
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}
