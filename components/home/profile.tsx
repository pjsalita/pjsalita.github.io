"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { ContactButton } from "@/components/contact-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { SlidingNumber } from "@/components/ui/sliding-number";
import { TextEffect } from "@/components/ui/text-effect";
import { TextLoop } from "@/components/ui/text-loop";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Tilt } from "@/components/ui/tilt";
import { titles } from "@/lib/data";
import { motion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";
import { MorphingDialog, MorphingDialogContainer, MorphingDialogContent, MorphingDialogTrigger } from "../ui/morphing-dialog";
import Image from "next/image";

const Profile = forwardRef<HTMLDivElement>(function Profile(props, ref) {
  const [phTime, setPhTime] = useState(new Date());
  const [localTime, setLocalTime] = useState(new Date());
  const phTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Manila";

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setPhTime(new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" })));
      setLocalTime(now);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;

    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();

    return {
      hours: hours12,
      minutes,
      seconds,
      ampm,
      date: `${month} ${day}, ${year}`,
    };
  };

  const ph = formatTime(phTime);
  const local = formatTime(localTime);

  return (
    <div ref={ref} className="relative w-full lg:w-1/2 lg:shrink-0" {...props}>
      <div className="relative flex min-h-screen items-center overflow-auto justify-center px-8 py-20 lg:h-full lg:py-0">
        <DotPattern className="mask-[radial-gradient(300px_circle_at_center,white,transparent)] lg:mask-[radial-gradient(400px_circle_at_center,white,transparent)]" />
        <Tilt rotationFactor={5} isRevese>
          <div className="relative z-10 text-center">
            <MorphingDialog
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 24,
              }}
            >
              <MorphingDialogTrigger className="relative z-10 mx-auto size-30 rounded-full">
                <Avatar className="absolute inset-0 size-full overflow-hidden rounded-full">
                  <AvatarImage src="/images/pj.png" alt="PJ Salita" className="bg-white object-cover object-top dark:bg-black" />
                  <AvatarFallback>PJ</AvatarFallback>
                </Avatar>
              </MorphingDialogTrigger>
              <MorphingDialogContainer>
                <MorphingDialogContent className="bg-background relative h-auto w-full max-w-3xl overflow-y-auto rounded-2xl p-4 shadow-lg md:p-6">
                  <img src="/images/pj.png" alt="PJ Salita" className="rounded-full object-cover object-top" />
                </MorphingDialogContent>
              </MorphingDialogContainer>
            </MorphingDialog>

            <TextEffect className="pt-5" preset="fade-in-blur">
              Hey! I am
            </TextEffect>
            <TextShimmer as="h1" className="text-6xl font-bold [--base-color:var(--primary)] [--base-gradient-color:var(--accent)]">
              PJ Salita
            </TextShimmer>
            <motion.span
              className="inline-block text-5xl"
              style={{ transformOrigin: "100% 100%" }}
              animate={{
                rotate: [0, 20, 0, 20, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              👋
            </motion.span>
            <div className="text-lg">
              A Passionate{" "}
              <TextLoop
                className="text-primary block overflow-y-clip md:inline-block"
                interval={3}
                transition={{
                  type: "spring",
                  stiffness: 900,
                  damping: 80,
                  mass: 10,
                }}
              >
                {titles.map((title, key) => (
                  <span key={key}>{title}</span>
                ))}
              </TextLoop>
            </div>
            <p className="text-muted-foreground my-8">Crafting digital experiences with modern web technologies</p>
            <div className="flex justify-center gap-4 py-2">
              <ContactButton>Contact Me</ContactButton>
              <a href="/docs/pjsalita-resume.pdf" target="_blank" className={buttonVariants({ variant: "outline" })}>
                Download CV
              </a>
            </div>

            <div className="flex items-center justify-center gap-3 font-mono">
              <small>
                {phTimeZone ? "Current Time: " : "My Local Time: "} {ph.date}
              </small>
              <div className="font-small flex items-center gap-0.5">
                <SlidingNumber value={ph.hours} padStart={true} />
                <span className="text-zinc-400">:</span>
                <SlidingNumber value={ph.minutes} padStart={true} />
                <span className="text-zinc-400">:</span>
                <SlidingNumber value={ph.seconds} padStart={true} />
                <span className="ml-1 text-xs">{ph.ampm}</span>
              </div>
            </div>

            {!phTimeZone && (
              <div className="flex items-center justify-center gap-3 font-mono">
                <small>Your Time: {local.date}</small>
                <div className="font-small flex items-center gap-0.5">
                  <SlidingNumber value={local.hours} padStart={true} />
                  <span className="text-zinc-400">:</span>
                  <SlidingNumber value={local.minutes} padStart={true} />
                  <span className="text-zinc-400">:</span>
                  <SlidingNumber value={local.seconds} padStart={true} />
                  <span className="ml-1 text-xs">{local.ampm}</span>
                </div>
              </div>
            )}
          </div>
        </Tilt>
      </div>
    </div>
  );
});

export { Profile };
