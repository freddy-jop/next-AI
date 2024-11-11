import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SessionType = {
  userMail: string | null;
  setUserMail: (mail: string) => void;
};

export const useSessionStore = create(
  persist<SessionType>(
    (set) => ({
      userMail: null,
      setUserMail: (mail) =>
        set({
          userMail: mail,
        }),
    }),
    { name: "session-store" }
  )
);
