"use client";

import * as React from "react";
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { argentWallet, trustWallet, ledgerWallet } from "@rainbow-me/rainbowkit/wallets";
import { Chain, configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet, polygon, optimism, arbitrum, ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : [])],
	[publicProvider()],
);

// const { chains, publicClient, webSocketPublicClient } = configureChains(
// 	[mainnet],
// 	[
// 		jsonRpcProvider({
// 			rpc: (chain: Chain) => ({
// 				http: `http://127.0.0.1:8545`,
// 			}),
// 		}),
// 	],
// );

const projectId = "YOUR_PROJECT_ID";

const { wallets } = getDefaultWallets({
	appName: "RainbowKit demo",
	projectId,
	chains,
});

const demoAppInfo = {
	appName: "Eswap Margin",
};

const connectors = connectorsForWallets([
	...wallets,
	{
		groupName: "Other",
		wallets: [
			argentWallet({ projectId, chains }),
			trustWallet({ projectId, chains }),
			ledgerWallet({ projectId, chains }),
		],
	},
]);

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
	webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => setMounted(true), []);
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
				{mounted && children}
			</RainbowKitProvider>
		</WagmiConfig>
	);
}
