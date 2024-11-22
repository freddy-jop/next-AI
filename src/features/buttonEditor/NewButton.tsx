import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const NewButton = () => {
  return (
    <Link href={"/dashboard"}>
      <Button
        variant="outline"
        className="px-4 py-2 font-bold text-blue-600 transition-colors duration-200 hover:bg-blue-100"
      >
        <Plus className="size-5 sm:mr-2" />
        <span className="hidden text-center text-sm font-bold sm:inline">
          Nouveau
        </span>
      </Button>
    </Link>
  );
};
