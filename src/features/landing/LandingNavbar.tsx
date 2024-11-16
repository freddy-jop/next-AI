/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

// Fonction clamp pour limiter une valeur dans un intervalle [min, max]
const clamp = (number: any, min: any, max: any) =>
  Math.min(Math.max(number, min), max);

const useBoundedScroll = (threshold: any) => {
  const { scrollY } = useScroll();
  const scrollYBounded = useMotionValue(0);
  const scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, threshold],
    [0, 1]
  );

  useEffect(() => {
    const handleScroll = () => {
      const current = scrollY.get();
      const previous = scrollY.getPrevious();
      const diff = current - previous!;
      const newScrollYBounded = clamp(
        scrollYBounded.get() + diff,
        0,
        threshold
      ); // Limite entre 0 et threshold

      scrollYBounded.set(newScrollYBounded); // Met à jour scrollYBounded avec la nouvelle valeur
    };

    return scrollY.on("change", handleScroll); // Réagit aux changements de scrollY
  }, [threshold, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
};

export const LandingNavbar = () => {
  const { scrollYBoundedProgress } = useBoundedScroll(300);

  // Transformation dynamiques
  const height = useTransform(scrollYBoundedProgress, [0, 1], [120, 70]);
  const backgroundOpacity = useTransform(
    scrollYBoundedProgress,
    [0, 1],
    [0.1, 0.25]
  );
  const blurAmount = useTransform(scrollYBoundedProgress, [0, 1], [10, 8]);
  const textScale = useTransform(scrollYBoundedProgress, [0, 1], [1, 0.9]);

  return (
    <motion.nav
      style={{
        height,
        backgroundColor: useMotionTemplate`rgba(255, 255, 255, ${backgroundOpacity})`,
        backdropFilter: useMotionTemplate`blur(${blurAmount}px)`,
        WebkitBackdropFilter: useMotionTemplate`blur(${blurAmount}px)`,
      }}
      className="fixed inset-x-0 top-0 z-10 flex items-center justify-between p-8 shadow-md backdrop-blur-lg"
    >
      <Link href="/" className="flex items-center gap-2">
        <motion.div
          className="relative mr-4"
          style={{
            scale: textScale,
          }}
        >
          <Image
            src="/images/logo_opti_pix.svg"
            alt="Optima Pix"
            width={180}
            height={50}
          />
        </motion.div>
      </Link>

      {/* Bouton */}
      <motion.div
        className="flex items-center gap-2"
        style={{
          opacity: useTransform(scrollYBoundedProgress, [0, 1], [1, 0.9]),
        }}
      >
        <Link href="/login" className="gap-2">
          <Button
            size="xl"
            variant="premium"
            className="rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 px-6 py-3 font-semibold text-white"
          >
            Launch App
          </Button>
        </Link>
      </motion.div>
    </motion.nav>
    //   <nav className="fixed inset-x-0 top-0 z-10 flex items-center justify-between bg-white/10 p-8 shadow-md backdrop-blur-lg">
    //     <Link href="/" className="flex items-center gap-2">
    //       <div className="relative mr-4">
    //         <Image
    //           src="/images/logo_opti_pix.svg"
    //           alt="Optima Pix"
    //           width={180}
    //           height={50}
    //         />
    //       </div>
    //     </Link>
    //     <div className="flex items-center gap-2">
    //       <Link href="/login" className="gap-2">
    //         <Button
    //           size="xl"
    //           variant="premium"
    //           className="rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 px-6 py-3 font-semibold text-white"
    //         >
    //           Launch App
    //         </Button>
    //       </Link>
    //     </div>
    //   </nav>
  );
};
