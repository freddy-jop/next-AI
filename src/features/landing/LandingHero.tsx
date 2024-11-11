"use client";
import { Button } from "@/components/ui/button";
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
  return (
    <div className="space-y-5 py-36 text-center font-bold text-white">
      <div className="space-y-5 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
        <h1>Éditez avec Facilité et Simplicité.</h1>
        <div className="bg-gradient-to-r from-cyan-500 to-sky-400 bg-clip-text text-transparent">
          <Typewriter
            words={[
              "Optimiser vos images",
              "Supprimer le fond",
              "Augmenter la résoluton",
              "Restaurer vos souvenirs",
              "Coloriser les images",
              "Agrandissez les photos",
              "Donnez vie à vos photos avec un style cartoon",
              "Optimisez votre temps",
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
      <div className="text-sm font-light text-zinc-400 md:text-xl">
        Optimisez et sublimez vos créations notamment grâce à l&apos;IA.
      </div>
      <div>
        <Link href="/login">
          <Button
            variant="premium"
            className="rounded-full p-4 font-semibold md:p-6 md:text-lg"
          >
            Get Started
          </Button>
        </Link>
      </div>
      <div className="text-xs font-normal text-zinc-400 md:text-sm">
        Aucune carte bancaire requise.
      </div>
    </div>
  );
};
