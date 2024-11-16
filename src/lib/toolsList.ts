import { Services } from "@prisma/client";
import {
  Edit3,
  History,
  LayoutDashboard,
  Palette,
  Scissors,
  Sun,
  ZoomIn,
} from "lucide-react";
import { formatEnumLowerString } from "./formatEnumLowerString";
import { formatEnumToPath } from "./formatEnumToPath";
import { formatEnumToTitleCase } from "./formatEnumToTitleCase";

export const toolsServices = [
  {
    id: 1,
    label: formatEnumToTitleCase(Services.COLORIZATION),
    attachedLabel: formatEnumLowerString(Services.COLORIZATION),
    icon: Palette,
    href: formatEnumToPath(Services.COLORIZATION),
    enumValue: Services.COLORIZATION,
    colorMenu: "text-violet-500",
    colorService: "text-violet-700",
    bgColorService: "bg-gradient-to-r from-violet-400 to-purple-500",
    dargAndDropTextService: `Drag your image here to start AI ${formatEnumToTitleCase(
      Services.COLORIZATION
    )}`,
  },
  {
    id: 2,
    label: formatEnumToTitleCase(Services.VINTAGE_RESTORATION),
    attachedLabel: formatEnumLowerString(Services.VINTAGE_RESTORATION),
    icon: History,
    href: formatEnumToPath(Services.VINTAGE_RESTORATION),
    enumValue: Services.VINTAGE_RESTORATION,
    colorMenu: "text-pink-500",
    colorService: "text-emerald-700",
    bgColorService: "bg-gradient-to-r from-green-400 to-emerald-500",
    dargAndDropTextService: `Drag your image here to start AI ${formatEnumToTitleCase(
      Services.VINTAGE_RESTORATION
    )}`,
  },
  {
    id: 3,
    label: formatEnumToTitleCase(Services.ULTRA_RESOLUTION),
    attachedLabel: formatEnumLowerString(Services.ULTRA_RESOLUTION),
    icon: ZoomIn,
    href: formatEnumToPath(Services.ULTRA_RESOLUTION),
    enumValue: Services.ULTRA_RESOLUTION,
    colorMenu: "text-orange-500",
    colorService: "text-pink-700",
    bgColorService: "bg-gradient-to-r from-pink-400 to-rose-500",
    dargAndDropTextService: `Drag your image here to start AI ${formatEnumToTitleCase(
      Services.ULTRA_RESOLUTION
    )}`,
  },
  {
    id: 4,
    label: formatEnumToTitleCase(Services.BACKGROUND_ERASER),
    attachedLabel: formatEnumLowerString(Services.BACKGROUND_ERASER),
    icon: Scissors,
    href: formatEnumToPath(Services.BACKGROUND_ERASER),
    enumValue: Services.BACKGROUND_ERASER,
    colorMenu: "text-emerald-500",
    colorService: "text-orange-700",
    bgColorService: "bg-gradient-to-r from-orange-400 to-orange-500",
    dargAndDropTextService: `Drag your image here to start AI ${formatEnumToTitleCase(
      Services.BACKGROUND_ERASER
    )}`,
  },
  {
    id: 5,
    label: formatEnumToTitleCase(Services.CARTOONIFY),
    attachedLabel: formatEnumLowerString(Services.CARTOONIFY),
    icon: Edit3,
    href: formatEnumToPath(Services.CARTOONIFY),
    enumValue: Services.CARTOONIFY,
    colorMenu: "text-green-500",
    colorService: "text-green-700",
    bgColorService: "bg-gradient-to-r from-lime-400 to-green-500",
    dargAndDropTextService: `Drag your image here to start AI ${formatEnumToTitleCase(
      Services.CARTOONIFY
    )}`,
  },
  {
    id: 6,
    label: formatEnumToTitleCase(Services.HDR_ENHANCEMENT),
    attachedLabel: formatEnumLowerString(Services.HDR_ENHANCEMENT),
    icon: Sun,
    href: formatEnumToPath(Services.HDR_ENHANCEMENT),
    enumValue: Services.HDR_ENHANCEMENT,
    colorMenu: "text-red-500",
    colorService: "text-yellow-800",
    bgColorService: "bg-gradient-to-r from-yellow-500 to-orange-500",
    dargAndDropTextService: `Drag your image here to start AI ${formatEnumToTitleCase(
      Services.HDR_ENHANCEMENT
    )}`,
  },
  // {
  //   id: 6,
  //   label: formatEnumToTitleCase(Services.DEBLUR),
  //   icon: Aperture,
  //   href: formatEnumToPath(Services.DEBLUR),
  //   enumValue: Services.DEBLUR,
  //   colorMenu: "text-teal-500",
  //   colorService: "text-blue-800",
  //   bgColorService: "bg-gradient-to-r from-cyan-400 to-blue-500",
  //   dargAndDropTextService: `Drag your image here to start AI ${formatEnumToTitleCase(
  //     Services.DEBLUR
  //   )}`,
  // },
  // {
  //   id: 8,
  //   label: formatEnumToTitleCase(Services.BOKEH_EFFECT),
  //   icon: Aperture,
  //   href: formatEnumToPath(Services.BOKEH_EFFECT),
  //   enumValue: Services.BOKEH_EFFECT,
  //   colorMenu: "text-indigo-500",
  //   colorService: "text-purple-800",
  //   bgColorService: "bg-gradient-to-r from-indigo-400 to-purple-600",
  //   dargAndDropTextService: `Drag your image here to start AI ${formatEnumToTitleCase(
  //     Services.BOKEH_EFFECT
  //   )}`,
  // },
];

export const toolsMenu = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    colorMenu: "text-sky-500",
    colorService: null,
    bgColorService: null,
    dargAndDropTextService: null,
  },
  ...toolsServices,
];
