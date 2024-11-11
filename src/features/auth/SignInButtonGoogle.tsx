"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { singInActionWitGoogle } from "./auth.action";

export const SignInButtonGoogle = () => {
  return (
    <Button
      size="lg"
      variant="ghost"
      className="w-full rounded-full bg-red-600 py-3 text-white shadow-md transition duration-300 ease-in-out hover:bg-red-700"
      onClick={() => {
        singInActionWitGoogle();
      }}
    >
      <div className="flex items-center justify-center">
        <Image
          src="/images/google.svg"
          alt="Google icon"
          width={24}
          height={24}
          className="mr-2"
        />
        Sign in with Google
      </div>
    </Button>
  );
};
