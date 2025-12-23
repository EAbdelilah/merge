"use client";

import { GradientCanvas } from "shadergradient";
import { Gradient } from "shadergradient";
import React from "react";
import TextReveal from "@/components/TextReveal";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { uiConfig } from "../helper-config.js";

export default function Home() {
	type GradientType = "sphere" | "waterPlane" | "plane";
	const [type, setType] = React.useState("sphere" as GradientType);
	React.useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						if (entry.target.id === "introduction") {
							setType("waterPlane");
							entry.target.classList.add("introduction-reveal");
						} else if (entry.target.id === "empowering-neophytes") {
							setType("waterPlane");
							entry.target.classList.add("empowering-neophytes-reveal");
						} else if (entry.target.tagName === "FOOTER") {
							setType("sphere");
						}
					}
				});
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 1.0,
			},
		);
		const introduction = document.getElementById("introduction");
		if (introduction) {
			observer.observe(introduction);
		}
		const empoweringNeophytes = document.getElementById("empowering-neophytes");
		if (empoweringNeophytes) {
			observer.observe(empoweringNeophytes);
		}
		const footer = document.getElementsByTagName("footer")[0];
		if (footer) {
			observer.observe(footer);
		}
	}, []);

	const features: [emoji: string, feature: string][] = [
		["⛔️", "Stop Loss"],
		["🎯", "Limit Order"],
		["💰", "Margin Trading"],
		["🔁", "Leverage"],
		["⬇️", "Short Selling"],
	];

	const [TVL, setTVL] = React.useState(0.0);
	const [TVT, setTVT] = React.useState(0.0);
	React.useEffect(() => {
		const interval = setInterval(() => {
			if (document.getElementById("empowering-neophytes")?.classList.contains("empowering-neophytes-reveal")) {
				if (TVL < uiConfig.TVL) {
					setTVL(Number((TVL + 0.01).toLocaleString("en-US", { minimumFractionDigits: 2 })));
				}
				if (TVT < uiConfig.TVT) {
					setTVT(Number((TVL + 0.01).toLocaleString("en-US", { minimumFractionDigits: 2 })));
				}
			}
		}, 10);
		return () => clearInterval(interval);
	}, [TVT, TVL]);

	return (
		<div className="w-screen" style={{ height: "100lvh" }}>
			<GradientCanvas>
				<Gradient
					type={type}
					color1="#D61C4E"
					color2="#5800FF"
					color3="#000000"
					grain="off"
					uSpeed={0.1}
					cDistance={4}
				/>
				{/* <Gradient
					control="query"
				// @ts-ignore
					urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%2357caff&color2=%23dbba95&color3=%23d0bce1&embedMode=off&envPreset=city&fov=45&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=-1.4&positionY=0&positionZ=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=plane&uDensity=1.3&uFrequency=5.5&uSpeed=0.4&uStrength=4&uTime=0&wireframe=false"
				/> */}
			</GradientCanvas>
			<main className="front-page-content page-content">
				{/* FIRST PAGE */}
				<section className="flex justify-center items-center h-full">
					<TextReveal />
				</section>
				{/* SECOND PAGE */}
				<section className="fit-content flex justify-center h-full" id="introduction">
					<div className="introduction-container flex flex-col md:mt-32 mt-24">
						<div className="front-page-introduction-title opacity-0 flex flex-col justify-center items-center text-center gap-6">
							<h2
								className="text-neutral-300 lg:text-5xl md:text-3xl text-xl"
								style={{ fontStretch: "expanded", lineHeight: 1.25 }}
							>
								Introducing Eswap Margin
							</h2>
							<p className="text-neutral-400 lg:text-3xl md:text-xl text-lg" style={{ lineHeight: 1.4 }}>
								A Decentralized Trading Platform
								<br /> Built on Top of Deep Liquidity
							</p>
						</div>
						<div className="flex justify-center">
							<article className="glass-container to-reveal max-w-prose rounded-3xl md:p-8 p-4 flex flex-col gap-4">
								<p className="text-neutral-300 lg:text-xl md:text-md text-sm text-center">
								Eswap Margin is The Next Generation of Decentralized Trading
								</p>
								<div className="flex justify-center items-center">
									<Button type="link" to="/trade" style="solid" size="md">
										Trade
									</Button>
								</div>
							</article>
						</div>
						<ul className="lg:flex lg:flex-row md:gap-4 gap-4 justify-between grid grid-cols-2 grid-rows-3">
							{features.map((value, index) => {
								return (
									<li
										key={index}
										className={`box-container opacity-0 front-page-introduction-feature-${index} shadow-light-50 select-none`}
									>
										<div
											className="md:py-4 py-2 text-neutral-300 font-bold flex flex-row gap-2 items-center justify-center lg:text-sm text-xs"
											style={{ fontStretch: "expanded" }}
										>
											<span>{value[0]}</span>
											<span>{value[1]}</span>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</section>
				{/* THIRD PAGE */}
				<section className="fit-content flex justify-center h-full" id="empowering-neophytes">
					<div className="empowering-neophytes-container flex flex-col gap-8 md:mt-32 mt-24">
						<div className="empowering-neophytes-title opacity-0 flex flex-col justify-center items-center text-center gap-6">
							<h2
								className="text-neutral-300 lg:text-5xl md:text-3xl text-xl"
								style={{ fontStretch: "expanded", lineHeight: 1.4 }}
							>
								Zero interest rates. True decentralized freedom.
								<br />
								<br />
							</h2>
						</div>
						<div className="flex flex-col self-center gap-4 max-w-prose">
							<article
								className="glass-container to-reveal rounded-3xl md:p-8 p-4 flex flex-col gap-4"
								id="empowering-neophytes-text"
							>
								<p className="text-neutral-300 lg:text-xl md:text-md text-sm text-center">
								Eswap Margin: Built for Alpha Hunters
								</p>
								<div className="flex items-center justify-center">
									<Button type="link" to="/earn" style="solid" size="md">
										Earn
									</Button>
								</div>
							</article>
							<div className="grid grid-cols-2 gap-4">
								<article
									className="glass-container to-reveal flex flex-col gap-2 rounded-3xl md:p-8 p-4"
									id="TVT"
								>
									<h3 className="md:text-4xl text-2xl text-neutral-300">${TVT}B</h3>
									<p className="md:text-lg text-sm text-neutral-400">Total volume traded</p>
								</article>
								<article
									className="glass-container to-reveal flex flex-col gap-2 rounded-3xl md:p-8 p-4"
									id="TVL"
								>
									<h3 className="md:text-4xl text-2xl text-neutral-300">${TVL}B</h3>
									<p className="md:text-lg text-sm text-neutral-400">TVL into liquidity pools</p>
								</article>
							</div>
						</div>
					</div>
				</section>
				{/* FOURTH PAGE/FOOTER */}
				<section className="flex items-end h-full">
					<Footer />
				</section>
			</main>
		</div>
	);
}
