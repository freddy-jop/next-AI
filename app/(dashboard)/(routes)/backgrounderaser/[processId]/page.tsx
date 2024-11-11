import { requiredCurrentUser } from "@/auth/current-user";
import { ReplicateComponent } from "@/features/editor/ReplicateComponent";
import type { PageParams } from "@/types/next";
import { redirect } from "next/navigation";

export default async function RoutePage({
  params,
}: PageParams<{ processId: string }>) {
  const { processId } = await params;

  const user = await requiredCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return <ReplicateComponent processId={processId} />;
}
