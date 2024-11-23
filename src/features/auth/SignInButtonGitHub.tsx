"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { singInActionWitGithub } from "./auth.action";

export const SignInButtonGitHub = () => {
  return (
    <Button
      size="lg"
      variant="ghost"
      className="flex w-full items-center justify-center space-x-2 rounded-lg bg-cyan-600 px-4 py-3 font-semibold text-white shadow-lg transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300"
      onClick={() => {
        singInActionWitGithub();
      }}
    >
      <div className="flex items-center justify-center">
        <Image
          src="/images/github.svg"
          alt="GitHub icon"
          width={24}
          height={24}
          className="mr-2"
        />
        Sign in with GitHub
      </div>
    </Button>
  );
};
