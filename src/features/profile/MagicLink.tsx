/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client";
import { KeyRound, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { singInActionWitEmail } from "../auth/auth.action";

export const MagicLink = () => {
  const [email, setEmail] = useState<string>("");
  const handleSignIn = async () => {
    await singInActionWitEmail(email);
    toast.custom(
      () => (
        <div
          className={`flex w-full max-w-md items-center rounded-lg bg-white shadow-md ring-4 ring-black ring-opacity-25`}
        >
          <div className="flex items-center p-4">
            <Send className="size-6 text-cyan-600" />
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-900">
                Check your inbox to complete your sign-in with the Magic Link!
              </p>
              <p className="mt-1 text-sm text-gray-500">
                No email? Don’t forget to peek into your spam or junk folder—it
                might be hiding there!
              </p>
            </div>
          </div>
        </div>
      ),
      {
        duration: 10000,
      }
    );
  };
  return (
    <div className="w-full">
      <form action={handleSignIn}>
        <div className="flex flex-col items-center space-y-4">
          <input
            type="email"
            placeholder="yourmailuser@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-700 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200"
          />
          <button className="flex w-full items-center justify-center space-x-2 rounded-lg bg-cyan-600 px-4 py-3 font-semibold text-white shadow-lg transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300">
            <KeyRound className="size-5" />
            <span>Sign in with Magic Link</span>
          </button>
        </div>
      </form>
    </div>
  );
};
