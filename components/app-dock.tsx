import { CalendarIcon, HomeIcon, MailIcon } from "lucide-react";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { ShineBorder } from "./ui/shine-border";
import Link from "next/link";

export type IconProps = React.RefAttributes<SVGSVGElement> & { className?: string };

const Icons = {
  calendar: (props: IconProps) => <CalendarIcon {...props} />,
  email: (props: IconProps) => <MailIcon {...props} />,
  linkedin: (props: IconProps) => <LinkedInLogoIcon {...props} />,
  github: (props: IconProps) => <GitHubLogoIcon {...props} />,
  upwork: (props: IconProps) => (
    <svg width="32px" height="32px" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>upwork</title>
      <path d="M24.75 17.542c-1.469 0-2.849-0.62-4.099-1.635l0.302-1.432 0.010-0.057c0.276-1.521 1.13-4.078 3.786-4.078 1.99 0 3.604 1.615 3.604 3.604 0 1.984-1.615 3.599-3.604 3.599zM24.75 6.693c-3.385 0-6.016 2.198-7.083 5.818-1.625-2.443-2.865-5.38-3.583-7.854h-3.646v9.484c-0.005 1.875-1.521 3.391-3.396 3.396-1.875-0.005-3.391-1.526-3.396-3.396v-9.484h-3.646v9.484c0 3.885 3.161 7.068 7.042 7.068 3.885 0 7.042-3.182 7.042-7.068v-1.589c0.708 1.474 1.578 2.974 2.635 4.297l-2.234 10.495h3.729l1.62-7.615c1.417 0.906 3.047 1.479 4.917 1.479 4 0 7.25-3.271 7.25-7.266 0-4-3.25-7.25-7.25-7.25z" />
    </svg>
  ),
};

const DATA = {
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: '/blog', icon: PencilIcon, label: 'Blog' },
  ],
  contact: {
    social: {
      github: {
        name: "GitHub",
        url: "https://github.com/pjsalita",
        icon: Icons.github,
      },
      linkedin: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/pjsalita",
        icon: Icons.linkedin,
      },
      upwork: {
        name: "UpWork",
        url: "https://www.upwork.com/freelancers/~015f4b3658a29e26e0",
        icon: Icons.upwork,
      },
      email: {
        name: "Email",
        url: "mailto:hello@pjsalita.com",
        icon: Icons.email,
      },
    },
  },
};

export function AppDock() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-100 mx-auto mb-4 flex h-full max-h-14 origin-bottom">
      <div className="bg-background/80 fixed inset-x-0 bottom-0 h-16 w-full backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)]"></div>

      <TooltipProvider>
        <Dock className="relative overflow-hidden">
          <ShineBorder shineColor={["var(--primary)", "var(--accent)", "var(--secondary)"]} />

          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.href} aria-label={item.label} className={cn(buttonVariants({ variant: "dock", size: "iconDock" }))}>
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href={social.url} aria-label={social.name} target="_blank" className={cn(buttonVariants({ variant: "dock", size: "iconDock" }))}>
                    <social.icon className="size-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{social.name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full py-2" />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <AnimatedThemeToggler className="cursor-pointer px-2" />
                {/* <ModeToggle variant="dock" /> */}
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
