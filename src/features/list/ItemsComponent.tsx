"use client";
import { Items } from "@/features/list/Items";
import { SkeletonItems } from "@/features/list/SkeletonItems";
import { TitleServices } from "@/features/list/TitleServices";
import { LoaderEffect } from "@/features/loader/LoaderEffect";
import { formatEnumLowerString } from "@/lib/formatEnumLowerString";
import { toolsServices } from "@/lib/toolsList";
import { useReplicateStore } from "@/store/replicate.store";
import { Services } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";

export const ItemsComponent = ({
  serviceName,
}: {
  serviceName: keyof typeof Services;
}) => {
  const setReplicateList = useReplicateStore(
    useShallow((state) => state.setReplicateList)
  );
  const setReplicateListToNull = useReplicateStore(
    useShallow((state) => state.setReplicateListToNull)
  );
  const replicateList = useReplicateStore(
    useShallow((state) => state.replicateList)
  );
  const serviceLw = formatEnumLowerString(serviceName);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isServicePathName = (service: any) => service.href === "/" + serviceLw;

  const serviceIndex = toolsServices.findIndex(isServicePathName);
  const enumService = toolsServices[serviceIndex].enumValue;

  const { isPending } = useQuery({
    queryKey: ["picturesServiceList", enumService],
    enabled:
      replicateList === null ||
      replicateList.length === 0 ||
      (replicateList.length > 0 &&
        replicateList[0].serviceName !== enumService),
    queryFn: async () => {
      try {
        setReplicateListToNull();
        const result = await axios.get("api/picturesservicetype", {
          params: { serviceType: enumService },
        });
        setReplicateList(result.data);
        return result.data; // Propagation de la data pour bon fontionnement de React Query
      } catch (err) {
        const error = err as Error;
        toast.error(`Error to get service List: ${error.message}`);
        throw err; // Propagation de l'erreur pour que React Query la prenne en compte
      }
    },
  });

  if (isPending || replicateList === null) {
    return <LoaderEffect />;
  }

  return (
    <div>
      <div className="mb-4 h-px w-full space-y-1 bg-slate-200"></div>
      <TitleServices serviceName={serviceLw} />
      {replicateList === null || replicateList.length === 0 ? (
        <SkeletonItems />
      ) : (
        <>
          <Items replicateData={replicateList} />
        </>
      )}
    </div>
  );
};
