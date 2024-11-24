"use client";
import { Button } from "@/components/ui/button";
import { GoogleLogo } from "@/components/ui/icons";
import { singInActionWitGoogle } from "./auth.action";

export const SignInButtonGoogle = () => {
  return (
    <Button
      size="lg"
      variant="ghost"
      className="w-full rounded-lg bg-cyan-600 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300"
      onClick={() => {
        singInActionWitGoogle();
      }}
    >
      <div className="flex items-center justify-center">
        <GoogleLogo className="mr-2" />
        Sign in with Google
      </div>
    </Button>
  );
};
