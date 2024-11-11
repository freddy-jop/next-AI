import { Services } from "@prisma/client";

export const formatEnumLowerString = (service: Services): string => {
  const serviceStringToPath = Services[service];
  return serviceStringToPath.toLowerCase().replace(/_/g, "");
};
