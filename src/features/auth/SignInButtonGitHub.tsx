"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { singInActionWitGithub } from "./auth.action";

export const SignInButtonGitHub = () => {
  return (
    <Button
      size="lg"
      variant="ghost"
      className="w-full rounded-full bg-cyan-500 py-3 text-white shadow-md transition duration-300 ease-in-out hover:bg-cyan-700"
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
