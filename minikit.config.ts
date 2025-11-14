
import { pump, cubey } from '@coinbase/onchainkit/mini-app';
import type { MinikitConfig } from '@coinbase/onchainkit/mini-app';

const ROOT_URL = "https://eswap.dexkit.app";

export const minikitConfig = {
  // Omit the accountAssociation field for now
  miniapp: {
    version: "1",
    name: "eSwap",
    subtitle: "DEX Aggregator",
    description: "The most efficient DEX aggregator.",
    screenshotUrls: [
      `${ROOT_URL}/screenshot1.png`,
      `${ROOT_URL}/screenshot2.png`,
    ],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    primaryCategory: "defi",
    tags: ["dex", "aggregator", "swap", "crypto"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    ogImageUrl: `${ROOT_URL}/og.png`,
  },
} as const satisfies MinikitConfig;
