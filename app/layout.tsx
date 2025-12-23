import "app/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import { Metadata } from "next";
import MiniAppInitializer from "@/components/MiniAppInitializer";

export async function generateMetadata(): Promise<Metadata> {
	return {
		other: {
			"fc:miniapp": JSON.stringify({
				version: "next",
				imageUrl: "https://eswap.dexkit.app/logo.png",
				button: {
					title: "Launch eswap",
					action: {
						type: "launch_miniapp",
						name: "eswap",
						url: "https://eswap.dexkit.app/",
						splashImageUrl: "https://eswap.dexkit.app/logo.png",
						splashBackgroundColor: "#ffffff",
					},
				},
			}),
		},
	};
}

function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<MiniAppInitializer />
					<section className="flex justify-center">
						<Header />
					</section>
					{children}
				</Providers>
			</body>
		</html>
	);
}

export default RootLayout;
