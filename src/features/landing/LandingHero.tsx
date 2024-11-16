"use client";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

// import dynamic from "next/dynamic";

// // Import Typewriter dynamically to prevent SSR issues
// const Typewriter = dynamic(
//   () => import("react-simple-typewriter").then((mod) => mod.Typewriter),
//   { ssr: false }
// );

// "Optimiser vos images",
// "Vectoriser",
// "Supprimer le fond",
// "Augmenter la résoluton",
// "Coloriser les images",
// "Agrandissez les photos",
// "Créez des visuels",
// "Optimisez votre temps",

export const LandingHero = () => {
  const { scrollY } = useScroll();
  const translateY = useTransform(scrollY, [0, 300], [0, -50]);
  return (
    <motion.div
      style={{ translateY }}
      className="space-y-10 pt-48 text-center font-bold text-white"
    >
      <div className="space-y-5 text-4xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl">
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
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </div>
      </div>

      <div className="text-sm font-light text-zinc-200 md:text-xl">
        Enhance and elevate your creations with AI.
      </div>

      <div>
        <Link href="/login">
          <Button
            variant="premium"
            className="rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 p-4 font-semibold shadow-lg shadow-indigo-500/50 transition duration-300 ease-in-out hover:scale-105 md:p-6 md:text-lg"
          >
            Unlock Free AI-Enhanced Image Perfection
          </Button>
        </Link>
      </div>

      <div className="text-xs font-normal text-zinc-400 md:text-sm">
        No credit card required.
      </div>
    </motion.div>
    // <div className="space-y-5 py-36 text-center font-bold text-white">
    //   <div className="space-y-5 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
    //     <h1>Éditez avec Facilité et Simplicité.</h1>
    //     <div className="bg-gradient-to-r from-cyan-500 to-sky-400 bg-clip-text text-transparent">
    //       <Typewriter
    //         words={[
    //           "Optimiser vos images",
    //           "Supprimer le fond",
    //           "Augmenter la résoluton",
    //           "Restaurer vos souvenirs",
    //           "Coloriser les images",
    //           "Agrandissez les photos",
    //           "Donnez vie à vos photos avec un style cartoon",
    //           "Optimisez votre temps",
    //         ]}
    //         loop={true}
    //         cursor
    //         cursorStyle="_"
    //         typeSpeed={70}
    //         deleteSpeed={50}
    //         delaySpeed={1000}
    //       />
    //     </div>
    //   </div>
    //   <div className="text-sm font-light text-zinc-400 md:text-xl">
    //     Optimisez et sublimez vos créations notamment grâce à l&apos;IA.
    //   </div>
    //   <div>
    //     <Link href="/login">
    //       <Button
    //         variant="premium"
    //         className="rounded-full p-4 font-semibold md:p-6 md:text-lg"
    //       >
    //         Get Started
    //       </Button>
    //     </Link>
    //   </div>
    //   <div className="text-xs font-normal text-zinc-400 md:text-sm">
    //     Aucune carte bancaire requise.
    //   </div>
    // </div>
  );
};
