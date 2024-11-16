"use client";

import { ProModal } from "@/features/premium/ProModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

// Create a client
const queryClient = new QueryClient();

export type ProvidersProps = PropsWithChildren;

export const Providers = (props: ProvidersProps) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ProModal />
        <Toaster position="bottom-center" />
        {props.children}
      </QueryClientProvider>
    </div>
  );
};