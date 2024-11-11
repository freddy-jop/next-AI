import { Services } from "@prisma/client";

export const formatEnumToTitleCase = (service: Services): string => {
  const serviceString = Services[service];
  return serviceString
    .toLowerCase()
    .split("_")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
