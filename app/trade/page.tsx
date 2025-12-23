"use client";

import React from "react";
import TradingViewWidget from "@/components/TradingViewWidget";
import PositionCard from "@/components/PositionCard";
import OpenPostionForm from "@/components/OpenPostionForm";
import { useEffect, useState } from "react";
import marketAbiData from "../../abi/market.abi.json";
import { useAccount, usePrepareContractWrite, useContractRead, useNetwork, useContractWrite } from "wagmi";

import { networkConfig } from "@/helper-config.js";

type addressT = `0x${string}`;
const mockId = [1, 2, 3]; // Beirao will change this to a list of pool ids

export default function TradePage() {
	const { isConnected, address } = useAccount();

	const { chain } = useNetwork();
	const detectedChainId = chain?.id;
	const activeChainId: keyof typeof networkConfig =
		detectedChainId !== undefined && Object.prototype.hasOwnProperty.call(networkConfig, detectedChainId)
			? (detectedChainId as keyof typeof networkConfig)
			: 137;

	const marketAddress = networkConfig[activeChainId]["addressMarket"] as addressT;

	const [traderPositions, setTraderPositions] = useState<number[]>([]);

	const { data: traderPositionsTemp } = useContractRead({
		address: marketAddress,
		abi: marketAbiData.marketABI,
		functionName: "getTraderPositions",
		args: [address],
	});

	useEffect(() => {
		if (traderPositionsTemp) {
			setTraderPositions((traderPositionsTemp || []) as number[]);
		}
	}, [traderPositionsTemp]);

	return (
		<>
			<section className="fit-content flex justify-center h-full">
				<div className="md:mt-32 mt-24 md:grid md:grid-cols-[1fr,0.5fr] md:grid-rows-1 md:justify-between flex justify-center gap-8 w-full">
					<TradingViewWidget />
					<OpenPostionForm />
				</div>
			</section>
			<section className="fit-content flex justify-center h-full">
				<div className="md:mt-32 mt-24 flex flex-col gap-12 w-full">
					<div className="flex">
						<h3 className="text-4xl text-neutral-300" style={{ fontStretch: "expanded" }}>
							Your positions
						</h3>
					</div>
					<div className="flex flex-col gap-4">
						{isConnected ? (
							traderPositions.map((pool, index) => <PositionCard key={index} posId={pool} />)
						) : (
							<div className="text-xl text-slate-200"> → Connect your wallet to see your positions</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
}
