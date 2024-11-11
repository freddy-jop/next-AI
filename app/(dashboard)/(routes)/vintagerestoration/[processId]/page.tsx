import { baseAuth } from "@/auth/auth";
import { ReplicateComponent } from "@/features/editor/ReplicateComponent";
import type { PageParams } from "@/types/next";
import { redirect } from "next/navigation";

export default async function RoutePage({
  params,
}: PageParams<{ processId: string }>) {
  const { processId } = await params;

  const session = await baseAuth();
  if (!session) {
    redirect("/login");
  }

  return <ReplicateComponent processId={processId} />;
}
