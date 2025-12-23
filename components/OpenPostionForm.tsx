"use client";

import React from "react";
import { useAccount, usePrepareContractWrite, useContractRead, useNetwork, useContractWrite } from "wagmi";
import marketAbiData from "../abi/market.abi.json";
import positionsAbiData from "../abi/positions.abi.json";

import ERC20AbiData from "@/abi/ERC20.abi.json";
import { useEffect, useState } from "react";
import { networkConfig } from "@/helper-config.js";
import Button from "./Button";
import Extern from "./Extern";

type addressT = `0x${string}`;
type NetworkConfigKey = keyof typeof networkConfig;

function OpenPostionForm() {
	const { isConnected, address } = useAccount();
	const { chain } = useNetwork();
	const detectedChainId = chain?.id;
	const activeChainId: NetworkConfigKey =
		detectedChainId !== undefined && Object.prototype.hasOwnProperty.call(networkConfig, detectedChainId)
			? (detectedChainId as NetworkConfigKey)
			: 137;

	let marketAddress = networkConfig[activeChainId]["addressMarket"] as addressT;
	let positionsAddress = networkConfig[activeChainId]["addressPositions"] as addressT;
	const fee = 3000;

	const [addSend, setAddSend] = useState("");
	const [addTokenToTrade, setAddTokenToTrade] = useState("");
	const [isShort, setIsShort] = useState<boolean>(false);
	const [amount, setAmount] = useState(0);
	const [leverage, setleverage] = useState(1);
	const [limitPrice, setLimitPrice] = useState(0);
	const [stopPrice, setStopPrice] = useState(0);

	const [decTokenSend, setDecTokenSend] = useState(0);
	const [decTokenTrade, setDecTokenTrade] = useState(0);

	const [nameTokenSend, setNameTokenSend] = useState("");
	const [nameTokenTrade, setNameTokenTrade] = useState("");

	const [selectedValue, setSelectedValue] = useState("long");

	const { config: approveConf } = usePrepareContractWrite({
		address: addSend as addressT,
		abi: ERC20AbiData.ERC20ABI,
		functionName: "approve",
		args: [positionsAddress, amount],
	});
	//! TODO: change to market contract
	// let { config: openPosConf } = usePrepareContractWrite({
	// 	address: positionsAddress, // This will now use the dynamic positionsAddress
	// 	abi: positionsAbiData.positionsABI,
	// 	functionName: "openPosition",
	// 	args: [address, addSend, addTokenToTrade, fee, isShort, leverage, amount, limitPrice, stopPrice],
	// });

	let { config: openPosConf } = usePrepareContractWrite({
		address: marketAddress,
		abi: marketAbiData.marketABI,
		functionName: "openPosition",
		args: [addSend, addTokenToTrade, fee, isShort, leverage, amount, limitPrice, stopPrice],
	});

	// const { config: pauseConf } = usePrepareContractWrite({
	// 	address: networkConfig[activeChainId]["addressMarket"] as addressT, // Updated here as well
	// 	abi: marketAbiData.marketABI,
	// 	functionName: "pause",
	// });
	const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
		setSelectedValue(e.target.value);
		setIsShort(e.target.value === "short");
	};
	const {
		write: openPosition,
		isSuccess: isSuccessOpenPosition,
		isLoading: isLoadingOpenPosition,
	} = useContractWrite(openPosConf);

	const { write: approve, isSuccess: isSuccessApprove, isLoading: isLoadingApprove } = useContractWrite(approveConf);

	const { data: decTokenSendTemp } = useContractRead({
		address: addSend as addressT,
		abi: ERC20AbiData.ERC20ABI,
		functionName: "decimals",
		args: [],
	});
	const { data: decTokenTradeTemp } = useContractRead({
		address: addTokenToTrade as addressT,
		abi: ERC20AbiData.ERC20ABI,
		functionName: "decimals",
		args: [],
	});

	const { data: nameTokenSendTemp } = useContractRead({
		address: addSend as addressT,
		abi: ERC20AbiData.ERC20ABI,
		functionName: "symbol",
		args: [],
	});
	const { data: nameTokenTradeTemp } = useContractRead({
		address: addTokenToTrade as addressT,
		abi: ERC20AbiData.ERC20ABI,
		functionName: "symbol",
		args: [],
	});

	const handleSliderChange = (e: any) => {
		setleverage(Number(e.target.value));
	};

	useEffect(() => {
		setDecTokenSend(decTokenSendTemp as number);
		setDecTokenTrade(decTokenTradeTemp as number);

		setNameTokenSend(nameTokenSendTemp as string);
		setNameTokenTrade(nameTokenTradeTemp as string);

		console.log("address : ", address);
		console.log("addSend : ", addSend);
		console.log("addTokenToTrade : ", addTokenToTrade);
		console.log("fee : ", fee);
		console.log("isShort : ", isShort);
		console.log("leverage : ", leverage);
		console.log("amount : ", amount);
		console.log("limitPrice : ", limitPrice);
		console.log("stopPrice : ", stopPrice);
	}, [
		decTokenSendTemp,
		decTokenTradeTemp,
		nameTokenSendTemp,
		nameTokenTradeTemp,
		amount,
		addSend,
		addTokenToTrade,
		address,
		isShort,
		leverage,
		limitPrice,
		stopPrice,
	]);

	return (
		<div className="flex flex-col gap-6" style={{ height: "calc(100% - 6rem)" }}>
			<nav className="glass-container-darker w-fit px-6 py-2" style={{ borderRadius: "2.5rem" }}>
				<ul
					className="open-position-switch flex flex-row items-center justify-center gap-2 md:text-xl text-sm"
					style={{ fontStretch: "expanded" }}
				>
					<li>
						<input
							type="radio"
							id="long"
							name="position"
							value="long"
							checked={selectedValue === "long"}
							onChange={handleChange}
						/>
						<label htmlFor="long">Long</label>
					</li>
					<li>
						<input type="radio" id="short" name="position" value="short" onChange={handleChange} />
						<label htmlFor="short">Short</label>
					</li>
					<li>
						<input type="radio" id="swap" name="position" value="swap" onChange={handleChange} />
						<label htmlFor="swap">Swap</label>
					</li>
				</ul>
			</nav>
			{selectedValue === "long" || selectedValue === "short" ? (
				<div className="flex flex-col gap-2">
					<article className="glass-container flex flex-col gap-6 rounded-3xl md:p-6 p-4">
						<div className="flex flex-col gap-1">
							<label className="text-sm text-neutral-300" htmlFor="token-to-send">
								Base token ({nameTokenSend ? nameTokenSend : "-"})
							</label>
							<select
								id="token-to-send"
								className="w-full glass-input glass-input-small"
								style={{ lineHeight: "1.5rem" }}
								onChange={(e) => setAddSend(e.target.value)}
							>
								<option value="">Select a token</option>
								{networkConfig[activeChainId].pools.map((pool) => (
									<option key={pool.name} value={pool.token}>
										{pool.name}
									</option>
								))}
							</select>
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-sm text-neutral-300" htmlFor="token-to-trade">
								Quote token ({nameTokenTrade ? nameTokenTrade : "-"})
							</label>
							<select
								id="token-to-trade"
								className="w-full glass-input glass-input-small"
								style={{ lineHeight: "1.5rem" }}
								onChange={(e) => setAddTokenToTrade(e.target.value)}
							>
								<option value="">Select a token</option>
								{networkConfig[activeChainId].pools.map((pool) => (
									<option key={pool.name} value={pool.token}>
										{pool.name}
									</option>
								))}
							</select>
						</div>
					</article>
					<article className="glass-container flex flex-col gap-4 rounded-3xl md:p-6 p-4">
						<div className="grid grid-cols-[0.5fr,1fr] items-center gap-2">
							<label className="text-md font-bold text-neutral-300" htmlFor="token-to-send">
								Amount in {nameTokenSend ? nameTokenSend : "-"}
							</label>
							<input
								id="amount-to-trade"
								type="number"
								min={0}
								className="w-full glass-input glass-input-large"
								inputMode="numeric"
								onChange={(e) => setAmount(e.target.valueAsNumber * 10 ** decTokenSend)}
							/>
						</div>
						<div className="grid grid-cols-[0.5fr,1fr] items-center gap-2">
							<label className="text-sm text-neutral-300" htmlFor="token-to-send">
								Limit price in {nameTokenTrade ? nameTokenTrade : "-"}
							</label>
							<input
								id="limite-price"
								type="number"
								min={0}
								className="w-full glass-input glass-input-small"
								inputMode="numeric"
								onChange={(e) => setLimitPrice(e.target.valueAsNumber * 10 ** decTokenTrade)}
							/>
						</div>
						<div className="grid grid-cols-[0.5fr,1fr] items-center gap-2">
							<label className="text-sm text-neutral-300" htmlFor="token-to-send">
								Stop loss in {nameTokenTrade ? Number(nameTokenTrade) : "-"}
							</label>
							<input
								id="stop-loss"
								type="number"
								min={0}
								className="w-full glass-input glass-input-small"
								inputMode="numeric"
								onChange={(e) => setStopPrice(e.target.valueAsNumber * 10 ** decTokenTrade)}
							/>
						</div>
						<div className="grid grid-cols-[0.25fr,1fr] items-center gap-4">
							<label className="flex flex-row gap-1 text-sm text-neutral-300" htmlFor="token-to-send">
								<span>Leverage:</span>
								<span className="font-bold text-neutral-300" style={{ fontStretch: "expanded" }}>
									{leverage}
								</span>
							</label>
							<input
								id="leverage"
								type="range"
								step={1}
								min={1}
								max={5}
								className="w-full"
								value={leverage}
								onChange={handleSliderChange}
							/>
						</div>
					</article>
					<article className="glass-container text-neutral-300 flex flex-row justify-center gap-4 rounded-3xl md:p-6 p-4">
						<Button
							type="button"
							size="xs"
							style="solid"
							onClick={() => {
								approve?.();
							}}
						>
							Approve
						</Button>
						<Button
							type="button"
							size="xs"
							style="ghost"
							onClick={() => {
								openPosition?.();
							}}
						>
							Open position
						</Button>
					</article>
				</div>
			) : (
				<article className="glass-container flex flex-col gap-6 rounded-3xl md:p-8 p-4">
					<div className="flex justify-center">
						<Button type="a" style="ghost" size="md" to="https://eswap.dexkit.app/">
							<span>Go to Eswap</span>
							<Extern />
						</Button>
					</div>
				</article>
			)}
		</div>
	);
}

export default OpenPostionForm;
