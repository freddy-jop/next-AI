"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { singInActionWitTiktok } from "./auth.action";

export const SignInButtonTiktok = () => {
  return (
    <Button
      size="lg"
      variant="ghost"
      className="w-full rounded-full bg-pink-500 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-pink-600"
      onClick={() => {
        singInActionWitTiktok();
      }}
    >
      <div className="flex items-center justify-center">
        <Image
          src="/images/tiktok.svg"
          alt="Dribble icon"
          width={24}
          height={24}
          className="mr-2"
        />
        Sign in with Tiktok
      </div>
    </Button>
  );
};
