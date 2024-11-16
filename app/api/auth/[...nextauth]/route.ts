import { handlers } from "@/auth/auth"; // Referring to the auth.ts we just created

export const maxDuration = 60; // This function can run for a maximum of 60 seconds
export const dynamic = "force-dynamic";

export const { GET, POST } = handlers;
