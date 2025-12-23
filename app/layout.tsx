import "app/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import Header from "@/components/Header";

function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Providers>
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
