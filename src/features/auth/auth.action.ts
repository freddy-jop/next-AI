"use server";
import { signIn, signOut } from "@/auth/auth";

export const signOutAction = async () => {
  await signOut({ redirectTo: "/" });
};

export const singInActionWitGithub = async () => {
  await signIn("github", { redirectTo: "/dashboard" });
};

export const singInActionWitGoogle = async () => {
  await signIn("google", { redirectTo: "/dashboard" });
};

export const singInActionWitDribbble = async () => {
  await signIn("dribbble", { redirectTo: "/dashboard" });
};
