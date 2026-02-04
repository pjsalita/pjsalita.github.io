import { projectCategories, projectModalTabs } from "./data";

export type Technology =
  | "laravel"
  | "php"
  | "vue"
  | "node"
  | "express"
  | "livewire"
  | "typescript"
  | "react"
  | "nextjs"
  | "angular"
  | "ionic"
  | "inertia"
  | "tailwind"
  | "bootstrap"
  | "sass"
  | "css"
  | "html"
  | "javascript"
  | "jquery"
  | "mysql"
  | "postgresql"
  | "mongodb"
  | "aws"
  | "docker"
  | "git"
  | "wordpress"
  | "shopify"
  | "joomla"
  | "rds"
  | "ec2"
  | "s3"
  | "python"
  | "nginx"
  | "apache2"
  | "gcp"
  | "digitalocean";

export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectModalTab = (typeof projectModalTabs)[number];
export type ProjectStatus = "ongoing" | "completed";
export type ProjectType = "End-to-End Development" | "Maintenance & Feature Development";

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  technologies: Technology[];
  category: ProjectCategory[];
  thumbnail?: string;
  images?: string[];
  mobileImages?: string[];
  link?: string;
  githubLink?: string;
  features?: string[];
  completionDate?: string;
  type?: ProjectType;
  status?: ProjectStatus;
  highlights?: {
    title: string;
    description: string;
  }[];
}

export interface SkillCategory {
  title: string;
  skills: Technology[];
}
export interface Position {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: Technology[];
}
