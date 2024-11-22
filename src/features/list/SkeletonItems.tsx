import { Skeleton } from "@/components/ui/skeleton"; // Import correct du Skeleton

export const SkeletonItems = () => {
  return (
    <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 sm:px-10 md:grid-cols-2 md:px-10 lg:grid-cols-3 xl:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-200 ease-in-out hover:scale-105"
        >
          {/* Skeleton pour l'image */}
          <div className="relative h-64 w-96">
            <Skeleton className="size-full object-cover" />
            <div className="absolute right-2 top-2 flex space-x-2">
              {/* Skeleton pour ViewButton */}
              <Skeleton className="h-10 w-20 rounded-full bg-white shadow-lg" />
              {/* Skeleton pour FavoriteButton */}
              <Skeleton className="size-10 rounded-full bg-white shadow-lg" />
            </div>
          </div>

          {/* Skeleton pour le titre et la description */}
          <div className="space-y-2 p-4">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </div>

          {/* Skeleton pour le bouton AddToCart */}
          <div className="px-4 pb-4">
            <Skeleton className="h-10 w-full rounded-md bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
};
