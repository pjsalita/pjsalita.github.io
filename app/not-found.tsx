"use client";

import { buttonVariants } from "@/components/ui/button";
import { TextScramble } from "@/components/ui/text-scramble";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ErrorPage() {
  const title = "404: Page Not Found";
  const description = "Sorry, the page you are looking for could not be found.";
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <motion.div
        className="mb-2 max-w-lg text-base text-gray-600 dark:text-gray-400"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <TextScramble className="font-mono text-3xl" duration={1.2}>
          {title as string}
        </TextScramble>
      </motion.div>

      <motion.p
        className="mb-8 max-w-lg font-mono text-base text-gray-600 dark:text-gray-400"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {description}
      </motion.p>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <Link href="/" className={buttonVariants({ variant: "default" })}>
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}
