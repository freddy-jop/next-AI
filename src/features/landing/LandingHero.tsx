"use client";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

export const LandingHero = () => {
  const { scrollY } = useScroll();
  const translateY = useTransform(scrollY, [0, 300], [0, -50]);
  return (
    <motion.div
      style={{ translateY }}
      className="space-y-10 pt-48 text-center font-bold text-white"
    >
      <div className="space-y-5 text-2xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl">
        <h1 className="drop-shadow-lg">Optimize with Ease and Simplicity</h1>
        <div className="bg-gradient-to-r from-cyan-500 to-sky-400 bg-clip-text text-transparent drop-shadow-lg">
          <Typewriter
            words={[
              "Optimize your images",
              "Remove backgrounds",
              "Increase resolution",
              "Enhance brightness",
              "Restore your memories",
              "Colorize images",
              "Maximize your time",
            ]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={110}
            deleteSpeed={90}
            delaySpeed={1750}
          />
        </div>
      </div>

      <div className="text-[12px] font-light text-zinc-200 sm:text-sm md:text-xl">
        Enhance and elevate your creations with AI.
      </div>

      <div>
        <Link href="/login">
          <Button
            variant="premium"
            className="rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 p-4 text-[12px] font-semibold shadow-lg shadow-indigo-500/50 transition duration-300 ease-in-out hover:scale-105 sm:text-sm md:p-6 md:text-lg"
          >
            Unlock Free AI-Enhanced Image Perfection
          </Button>
        </Link>
      </div>

      <div className="text-xs font-normal text-zinc-400 md:text-sm">
        No credit card required.
      </div>
    </motion.div>
  );
};
