"use client";
import { Items } from "@/features/list/Items";
import { SkeletonItems } from "@/features/list/SkeletonItems";
import { TitleServices } from "@/features/list/TitleServices";
import { LoaderEffect } from "@/features/loader/LoaderEffect";
import { formatEnumLowerString } from "@/lib/formatEnumLowerString";
import { toolsServices } from "@/lib/toolsList";
import { Services } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const ItemsComponent = ({
  serviceName,
}: {
  serviceName: keyof typeof Services;
}) => {
  const serviceLw = formatEnumLowerString(serviceName);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isServicePathName = (service: any) => service.href === "/" + serviceLw;
  const serviceIndex = toolsServices.findIndex(isServicePathName);
  const enumService = toolsServices[serviceIndex].enumValue;

  const { data, isPending } = useQuery({
    queryKey: ["picturesServiceList", enumService],
    //enabled: true,
    queryFn: async () => {
      try {
        const result = await axios.get("api/picturesservicetype", {
          params: { serviceType: enumService },
        });
        return result.data;
      } catch (err) {
        const error = err as Error;
        toast.error(`Error to get service List: ${error.message}`);
        throw err; // Propagation de l'erreur pour que React Query la prenne en compte
      }
    },
  });

  if (isPending) {
    return <LoaderEffect />;
  }

  return (
    <div>
      <div className="mb-4 h-px w-full space-y-1 bg-slate-200"></div>
      <TitleServices serviceName={serviceLw} />
      {data && data.length === 0 ? (
        <SkeletonItems />
      ) : (
        <>
          {/* <FavoriteButtonFilter serviceName={serviceName} /> */}
          <Items replicateData={data} />
        </>
      )}
    </div>
  );
};
