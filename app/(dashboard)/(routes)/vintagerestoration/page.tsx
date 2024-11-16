import { ManageDropZone } from "@/features/dragDropZone/ManageDropZone";
import { ItemsComponent } from "@/features/list/ItemsComponent";
import { Services } from "@prisma/client";

export default async function RoutePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-20">
        <ManageDropZone serviceName={Services.VINTAGE_RESTORATION} />
      </div>
      <ItemsComponent serviceName={Services.VINTAGE_RESTORATION} />
    </div>
  );
}