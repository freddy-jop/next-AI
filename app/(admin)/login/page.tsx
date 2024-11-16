import { baseAuth } from "@/auth/auth";
import { LoginUser } from "@/features/profile/LoginUser";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await baseAuth();
  if (!session) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-900 pt-20">
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute left-1/4 top-1/4 size-[300px] rounded-full bg-blue-500 opacity-20 blur-2xl"></div>
          <div className="absolute right-1/3 top-1/2 size-[200px] rounded-full bg-cyan-400 opacity-30 blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/2 size-[150px] rounded-full bg-indigo-400 opacity-25 blur-xl"></div>
        </div>

        <div className="container relative mx-auto flex h-full items-center justify-center px-6 py-12">
          <div className="rounded-lg bg-white/80 p-10 shadow-lg backdrop-blur-sm md:w-8/12 lg:w-5/12">
            <LoginUser />
          </div>
        </div>
      </section>
    );
  }
  if (session) {
    redirect("/dashboard");
  }
}
