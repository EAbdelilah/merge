"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import { GradientCanvas } from "shadergradient";
import { Gradient } from "shadergradient";
import { usePathname } from "next/navigation";
import { networkConfig } from "../../helper-config.js";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<div className="w-screen" style={{ height: "100lvh" }}>
			<GradientCanvas>
				<Gradient
					type="waterPlane"
					color1="#D61C4E"
					color2="#5800FF"
					color3="#000000"
					grain="off"
					uSpeed={0.1}
					cDistance={4}
				/>
			</GradientCanvas>
			<main className="front-page-content page-content">
				<section className="fit-content flex justify-center">
					<div className="flex flex-col justify-center items-center gap-8 md:mt-32 mt-24">
						<nav className="glass-container-darker w-fit px-6 py-2" style={{ borderRadius: "2.5rem" }}>
							<ul className="flex flex-row items-center justify-center gap-2 md:text-xl text-sm" style={{ fontStretch: "expanded" }}>
								{networkConfig[137].pools.map((pool) => (
									<li key={pool.name}>
										<Link
											href={`/earn/${pool.name.toLowerCase()}`}
											className={`text-neutral-400 hover:text-neutral-300 md:px-6 px-4 border-2 border-transparent inline-flex ${
												pathname === `/earn/${pool.name.toLowerCase()}` ? "box-container-solid hover:text-neutral-950" : ""
											}`}
											style={{ transition: "all 450ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
										>
											{pool.name}
										</Link>
									</li>
								))}
							</ul>
						</nav>
						<div>{children}</div>
					</div>
				</section>
				<section className="flex items-end h-full">
					<Footer />
				</section>
			</main>
		</div>
	);
}
