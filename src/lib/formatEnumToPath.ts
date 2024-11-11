import { Services } from "@prisma/client";

export const formatEnumToPath = (service: Services): string => {
  const serviceStringToPath = Services[service];
  return "/" + serviceStringToPath.toLowerCase().replace(/_/g, "");
};
