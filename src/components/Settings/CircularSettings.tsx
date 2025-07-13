"use client";
import React from "react";

import { useGlobalMode, GlobalMode } from "@/lib/hooks";
import { CircularSettingsDefault } from "./CircularSettingsDefault";
import { CircularSettingsAdvanced } from "./CircularSettingsAdvanced";

export const CircularSettings = () => {
  const globalMode = useGlobalMode();
  const isAdvanced = globalMode === GlobalMode.Advanced;
  return isAdvanced ? (
    <CircularSettingsAdvanced />
  ) : (
    <CircularSettingsDefault />
  );
};
