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

export const singInActionWitTiktok = async () => {
  await signIn("tiktok", { redirectTo: "/dashboard" });
};

export const singInActionWitEmail = async (email: string) => {
  await signIn("email", { email: email, redirect: false });
};
