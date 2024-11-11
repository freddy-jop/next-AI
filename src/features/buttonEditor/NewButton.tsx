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
        <Plus className="mr-2 size-5" />
        <span className="text-center text-sm font-bold">Nouveau</span>
      </Button>
    </Link>
  );
};
