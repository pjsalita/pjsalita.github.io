import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Technology } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTechColor(tech: Technology): { bg: string; text: string } {
  switch (
    tech
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/\./g, "")
      .replace(/[()/-]/g, "")
  ) {
    case "laravel":
      return { bg: "bg-[#FF2D20]/15 hover:bg-[#FF2D20]/25", text: "text-[#FF2D20]" };
    case "php":
      return { bg: "bg-[#777BB3]/15 hover:bg-[#777BB3]/25", text: "text-[#232531] dark:text-[#777BB3]" };
    case "react":
      return { bg: "bg-[#087EA4]/20 hover:bg-[#087EA4]/30", text: "text-[#087EA4] dark:text-[#149ECA]" };
    case "angular":
      return { bg: "bg-[#DD0031]/15 hover:bg-[#DD0031]/25", text: "text-[#DD0031]" };
    case "vue":
      return { bg: "bg-[#42B883]/15 hover:bg-[#42B883]/25", text: "text-[#34495E] dark:text-[#42B883]" };
    case "javascript":
      return { bg: "bg-[#F7DF1E]/15 hover:bg-[#F7DF1E]/25", text: "text-[#000000] dark:text-[#F7DF1E]" };
    case "typescript":
      return { bg: "bg-[#3178C6]/15 hover:bg-[#3178C6]/25", text: "text-[#3178C6]" };
    case "tailwind":
      return { bg: "bg-[#38BDF8]/15 hover:bg-[#38BDF8]/25", text: "text-[#0F172A] dark:text-[#38BDF8]" };
    case "bootstrap":
      return { bg: "bg-[#7952B3]/15 hover:bg-[#7952B3]/25", text: "text-[#7952B3]" };
    case "jquery":
      return { bg: "bg-[#0769AD]/15 hover:bg-[#0769AD]/25", text: "text-[#0769AD]" };
    case "node":
      return { bg: "bg-[#539E43]/15 hover:bg-[#539E43]/25", text: "text-[#215732] dark:text-[#539E43]" };
    case "express":
      return { bg: "bg-[#000000]/15 hover:bg-[#000000]/25", text: "text-[#000000] dark:text-[#FFFFFF]" };
    case "wordpress":
      return { bg: "bg-[#21759B]/15 hover:bg-[#21759B]/25", text: "text-[#21759B]" };
    case "shopify":
      return { bg: "bg-[#95BF47]/15 hover:bg-[#95BF47]/25", text: "text-[#004C3F] dark:text-[#95BF47]" };
    case "joomla":
      return { bg: "bg-[#1E3B70]/15 hover:bg-[#1E3B70]/25", text: "text-[#1E3B70] dark:text-[#4A90E2]" };
    case "nextjs":
      return { bg: "bg-[#000000]/15 hover:bg-[#000000]/25", text: "text-[#000000] dark:text-[#FFFFFF]" };
    case "livewire":
      return { bg: "bg-[#FB70A9]/15 hover:bg-[#FB70A9]/25", text: "text-[#FB70A9]" };
    case "inertia":
      return { bg: "bg-[#5A67D8]/15 hover:bg-[#5A67D8]/25", text: "text-[#5A67D8]" };
    case "ionic":
      return { bg: "bg-[#3880FF]/15 hover:bg-[#3880FF]/25", text: "text-[#3880FF]" };
    case "html":
      return { bg: "bg-[#E34C26]/15 hover:bg-[#E34C26]/25", text: "text-[#E34C26]" };
    case "css":
      return { bg: "bg-[#563D7C]/15 hover:bg-[#563D7C]/25", text: "text-[#563D7C]" };
    case "sass":
      return { bg: "bg-[#C69]/15 hover:bg-[#C69]/25", text: "text-[#C69]" };
    case "mysql":
      return { bg: "bg-[#00758F]/15 hover:bg-[#00758F]/25", text: "text-[#00758F]" };
    case "postgresql":
      return { bg: "bg-[#336791]/15 hover:bg-[#336791]/25", text: "text-[#336791]" };
    case "mongodb":
      return { bg: "bg-[#13AA52]/15 hover:bg-[#13AA52]/25", text: "text-[#13AA52]" };
    case "aws":
      return { bg: "bg-[#FF9900]/15 hover:bg-[#FF9900]/25", text: "text-[#FF9900]" };
    case "docker":
      return { bg: "bg-[#2496ED]/15 hover:bg-[#2496ED]/25", text: "text-[#2496ED]" };
    case "git":
      return { bg: "bg-[#F1502F]/15 hover:bg-[#F1502F]/25", text: "text-[#F1502F]" };
    default:
      return { bg: "bg-secondary/50 hover:bg-secondary", text: "text-secondary-foreground" };
  }
}
