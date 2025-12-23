"use client";

import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect } from "react";

export default function MiniAppInitializer() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return null;
}
