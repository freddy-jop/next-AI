import Image from "next/image";
import Link from "next/link";
import { SignInButtonGitHub } from "../auth/SignInButtonGitHub";
import { SignInButtonGoogle } from "../auth/SignInButtonGoogle";
import { MagicLink } from "./MagicLink";

export const LoginUser = () => {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Header */}
      <div className="mb-6 flex flex-col items-center">
        <Image
          priority
          src="/images/logo_opti_pix_AI.png"
          alt="OptiPixAI"
          width={175}
          height={46}
          className="drop-shadow-lg"
        />
        <h1 className="mt-4 text-4xl font-normal text-cyan-700">
          Welcome back
        </h1>
      </div>

      {/* Content */}
      <div className="w-full">
        <div className="flex flex-col gap-4">
          <SignInButtonGitHub />
          <SignInButtonGoogle />
        </div>
        <div className="my-6 flex items-center">
          <div className="h-1 grow border-t border-dotted border-slate-700"></div>
          <p className="mx-3 text-gray-800">Or, Sign in with Magic Link</p>
          <div className="h-1 grow border-t border-dotted border-slate-700"></div>
        </div>
        <MagicLink />
      </div>

      {/* Footer */}
      <div className="mt-6">
        <Link href="/">
          <p className="text-gray-600 transition hover:text-blue-500">
            Go to home
          </p>
        </Link>
      </div>
    </div>
    // <Card className="flex w-full flex-col items-center rounded-xl bg-white/90 shadow-lg">
    //   <CardHeader className="pt-6 text-center">
    //     <Image
    //       priority
    //       src="/images/logo_opti_pix_AI.png"
    //       alt="OptiPixAI"
    //       width={250}
    //       height={67}
    //       className="drop-shadow-lg"
    //     />
    //     <h1 className="mt-4 text-xl font-semibold text-gray-800">
    //       Welcome to Optima Pix
    //     </h1>
    //   </CardHeader>
    //   <CardContent className="flex w-full flex-col items-center gap-4 py-8">
    //     <SignInButtonGitHub />
    //     <div className="my-6 flex w-full items-center">
    //       <div className="mr-3 h-1 grow border-t border-dotted border-slate-700" />
    //       {/* <div className="ml-3 h-1 w-full bg-gray-800" /> */}
    //       <div className="text-gray-400">
    //         Or, sign in with <span className="underline">Magic Link</span>
    //       </div>
    //       {/* <div className="ml-3 h-[2px] w-full bg-gray-800" /> */}
    //       <div className="ml-3 h-1 grow border-t border-dotted border-slate-700" />
    //     </div>
    //     <MagicLink />
    //   </CardContent>
    //   <CardFooter className="pb-6">
    //     <Link href="/">
    //       <p className="cursor-pointer text-gray-600 transition duration-300 hover:text-blue-500">
    //         Go to home
    //       </p>
    //     </Link>
    //   </CardFooter>
    // </Card>
  );
};
