"use client";

import { AnimatedBackground } from "@/components/ui/animated-background";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselIndicator, CarouselItem, CarouselNavigation } from "@/components/ui/carousel";
import Iphone from "@/components/ui/iphone";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";
import { Safari } from "@/components/ui/safari";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollableImage } from "@/components/ui/scrollable-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projectCategories, projectModalTabs, projects } from "@/lib/data";
import { Project, ProjectCategory } from "@/lib/types";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { Section } from "../section";
import { TechBadge } from "../tech-badge";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const filteredProjects = projects.filter((project) => activeCategory === "all" || project.category.includes(activeCategory));
  const handleTabChange = (value: string) => value && setActiveCategory(value as ProjectCategory);

  return (
    <Section title="Projects">
      <Tabs className="mb-8">
        <TabsList>
          <AnimatedBackground
            defaultValue={projectCategories[0]}
            className="bg-primary rounded-lg"
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.3,
            }}
            onValueChange={(value) => handleTabChange(value as ProjectCategory)}
          >
            {projectCategories.map((category, index) => (
              <TabsTrigger key={index} data-id={category} value={category} className="capitalize" variant="animated">
                {category}
              </TabsTrigger>
            ))}
          </AnimatedBackground>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {filteredProjects.map((project, key) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            layout
          >
            <MorphingDialog
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 24,
              }}
            >
              <MorphingDialogTrigger className="h-full">
                <ProjectCard project={project} />
              </MorphingDialogTrigger>
              <MorphingDialogContainer>
                <ProjectModal project={project} />
              </MorphingDialogContainer>
            </MorphingDialog>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="group relative h-full rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(196, 58, 49, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <Card className="border-border/50 bg-card/50 hover:shadow-primary/5 relative h-full cursor-pointer overflow-hidden backdrop-blur-sm transition-all hover:shadow-lg">
        {project.thumbnail && (
          <AspectRatio ratio={16 / 9}>
            <ScrollableImage src={project.thumbnail as string} alt={project.title} hoverOnly className="w-full object-cover" />
          </AspectRatio>
        )}
        <div className="flex h-full flex-col p-6 pt-0">
          <MorphingDialogTitle className="text-card-foreground group-hover:text-primary mb-2 text-xl font-semibold transition-colors">
            {project.title}
          </MorphingDialogTitle>
          <MorphingDialogSubtitle className="text-muted-foreground mb-4 line-clamp-2">{project.description}</MorphingDialogSubtitle>

          <div className="mb-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <TechBadge key={tech} technology={tech} />
            ))}
          </div>

          {(project.link || project.githubLink) && (
            <div className="mt-auto flex gap-2">
              {project.link && (
                <a
                  href={project.link}
                  className={buttonVariants({ variant: "outline" })}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="mr-2 h-3 w-3" />
                  View
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  className={buttonVariants({ variant: "outline" })}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GitHubLogoIcon className="mr-2 h-3 w-3" />
                  Code
                </a>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

const ProjectModal = ({ project }: { project: Project }) => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <MorphingDialogContent className="bg-background relative h-auto w-full max-w-3xl overflow-y-auto rounded-2xl p-4 shadow-lg md:p-6">
      <ScrollArea className="h-[80vh]" type="scroll">
        <div className="relative p-6">
          <div>
            <MorphingDialogTitle className="text-xl font-bold md:text-2xl">{project.title}</MorphingDialogTitle>
            <MorphingDialogSubtitle className="text-muted-foreground text-sm md:text-base">
              {project.longDescription || project.description}
            </MorphingDialogSubtitle>

            {project.technologies && (
              <div className="flex flex-wrap gap-2 py-4">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} technology={tech} />
                ))}
              </div>
            )}
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-2 text-sm md:text-base">
              <AnimatedBackground
                defaultValue={"overview"}
                className="bg-primary rounded-lg"
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.3,
                }}
              >
                {projectModalTabs.map((category, index) => (
                  <TabsTrigger key={index} data-id={category} value={category} variant="animated" className="capitalize">
                    {category}
                  </TabsTrigger>
                ))}
              </AnimatedBackground>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              {project.highlights && (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {project.highlights.map((highlight, index) => (
                    <Card key={index} className="bg-card/50 p-4">
                      <h4 className="font-semibold">{highlight.title}</h4>
                      <p className="text-muted-foreground text-sm">{highlight.description}</p>
                    </Card>
                  ))}
                </div>
              )}

              {project.type && (
                <div className="space-y-2">
                  <h3 className="font-semibold">
                    Development Type: <span className="font-normal">{project.type}</span>
                  </h3>
                </div>
              )}

              {project.features && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Key Features</h3>
                  <ul className="text-muted-foreground ml-4 list-disc space-y-1">
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {(project.link || project.githubLink) && (
                <div className="flex gap-4">
                  {project.link && (
                    <a href={project.link} className={buttonVariants({ variant: "outline" })} target="_blank" rel="noreferrer noopener">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} className={buttonVariants({ variant: "outline" })} target="_blank" rel="noreferrer noopener">
                      <GitHubLogoIcon className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="gallery" className="mt-4">
              {(project.images || project.mobileImages) && (
                <Carousel>
                  <CarouselContent>
                    {project.images &&
                      project.images.map((image, index) => (
                        <CarouselItem className="p-4" key={index}>
                          <div className="relative">
                            {isSafari ? (
                              <AspectRatio ratio={16 / 9}>
                                <ScrollableImage src={image as string} alt={project.title} hoverOnly className="w-full rounded-lg object-cover" />
                              </AspectRatio>
                            ) : (
                              <Safari url={project.link} imageSrc={image} className="size-full" height={700}>
                                <ScrollableImage src={image as string} alt={project.title} hoverOnly />
                              </Safari>
                            )}
                          </div>
                        </CarouselItem>
                      ))}
                    {project.mobileImages &&
                      project.mobileImages.map((image, index) => (
                        <CarouselItem className="p-4" key={index}>
                          <div className="relative">
                            <Iphone src={image} viewHeight="300px" className="size-full"></Iphone>
                          </div>
                        </CarouselItem>
                      ))}
                  </CarouselContent>

                  <CarouselNavigation alwaysShow />
                  <CarouselIndicator />
                </Carousel>
              )}
            </TabsContent>
          </Tabs>
          <p className="text-muted-foreground mt-4 text-xs capitalize md:text-sm">
            {project.status && <span className="block">Status: {project.status}</span>}
            {project.completionDate && (
              <span className="block">
                Completed: {new Date(project.completionDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
            )}
          </p>
        </div>
      </ScrollArea>
      <MorphingDialogClose className="text-primary rounded-full" />
    </MorphingDialogContent>
  );
};

export { Projects };
