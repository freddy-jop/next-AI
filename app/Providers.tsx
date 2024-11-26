"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

// Create a client
const queryClient = new QueryClient();

export type ProvidersProps = PropsWithChildren;

export const Providers = (props: ProvidersProps) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Analytics />
        <Toaster position="bottom-center" />
        {props.children}
      </QueryClientProvider>
    </div>
  );
};
