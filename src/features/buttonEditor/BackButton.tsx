"use client";
import { ArrowLeftFromLine } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="rounded-full bg-slate-800 px-3 py-1 font-medium text-slate-200 transition-colors duration-200 hover:bg-slate-200 hover:text-slate-800"
    >
      <ArrowLeftFromLine className="mr-2 size-7" />
    </div>
  );
};
