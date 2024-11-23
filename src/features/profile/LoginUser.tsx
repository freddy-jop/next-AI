import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { SignInButtonGitHub } from "../auth/SignInButtonGitHub";
import { SignInButtonGoogle } from "../auth/SignInButtonGoogle";

export const LoginUser = () => {
  return (
    <Card className="mx-auto flex w-full max-w-md flex-col items-center rounded-xl bg-white/90 shadow-lg transition-transform hover:scale-105">
      <CardHeader className="pt-6 text-center">
        <Image
          priority
          src="/images/logo_opti_pix_AI.png"
          alt="OptiPixAI"
          width={250}
          height={67}
          className="drop-shadow-lg"
        />
        <h1 className="mt-4 text-xl font-semibold text-gray-800">
          Welcome to Optima Pix
        </h1>
      </CardHeader>
      <CardContent className="flex w-full flex-col items-center gap-4 py-8">
        <SignInButtonGitHub />
        <SignInButtonGoogle />
        {/* <SignInButtonDribbble /> */}
      </CardContent>
      <CardFooter className="pb-6">
        <Link href="/">
          <p className="cursor-pointer text-gray-600 transition duration-300 hover:text-blue-500">
            Go to home
          </p>
        </Link>
      </CardFooter>
    </Card>
  );
};
