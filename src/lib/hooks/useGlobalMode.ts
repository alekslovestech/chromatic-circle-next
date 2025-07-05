"use client";
import { usePathname } from "next/navigation";

export enum GlobalMode {
  Default = "Default",
  Advanced = "Advanced",
}

export const useGlobalMode = () => {
  const pathname = usePathname();
  return pathname === "/advanced" ? GlobalMode.Advanced : GlobalMode.Default;
};
