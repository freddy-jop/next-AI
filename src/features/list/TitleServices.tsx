"use client";

import { toolsServices } from "@/lib/toolsList";

export const TitleServices = ({ serviceName }: { serviceName: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isServicePathName = (service: any) =>
    service.href === "/" + serviceName;
  const serviceIndex = toolsServices.findIndex(isServicePathName);

  return (
    <div className="m-8 flex flex-col items-center justify-center">
      <span className="text-3xl font-semibold text-slate-500">
        {toolsServices[serviceIndex].label} List
      </span>
    </div>
  );
};
