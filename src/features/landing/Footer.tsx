import { Button } from "@/components/ui/button";
import { socialMediaLinks } from "@/constants";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      {/* Ligne avec la politique de confidentialité */}
      <div className="py-2 text-center">
        <Link
          href="/privacy"
          className="text-sm text-gray-400 transition-colors hover:text-white"
        >
          <span className="underline">Règles de confidentialité</span>
        </Link>
      </div>

      {/* Ligne séparatrice */}
      <div className="mx-6 border-t border-gray-700 lg:mx-16"></div>

      {/* Icônes des réseaux sociaux */}
      <div className="flex items-center justify-center space-x-4 pt-2">
        {socialMediaLinks.map(({ icon: Icon, link }) => (
          <Button
            key={link}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Link href={link} target="_blank" rel="noopener noreferrer">
              <Icon className="size-5" />
            </Link>
          </Button>
        ))}
      </div>

      {/* Espace pour affichage sur smartphones */}
      <div className="flex items-center justify-center space-x-4 pt-2">
        <span className="text-sm text-gray-400">
          © 2024 OptiPixAI - All rights reserved.
        </span>
      </div>
      <div className="h-8"></div>
    </footer>
  );
};
