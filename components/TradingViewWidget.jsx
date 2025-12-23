"use client";

// TradingViewWidget.jsx

import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
	const onLoadScriptRef = useRef();

	useEffect(() => {
		onLoadScriptRef.current = createWidget;

		if (!tvScriptLoadingPromise) {
			tvScriptLoadingPromise = new Promise((resolve) => {
				const script = document.createElement("script");
				script.id = "tradingview-widget-loading-script";
				script.src = "https://s3.tradingview.com/tv.js";
				script.type = "text/javascript";
				script.onload = resolve;

				document.head.appendChild(script);
			});
		}

		tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

		return () => (onLoadScriptRef.current = null);

		function createWidget() {
			if (document.getElementById("tradingview_39004") && "TradingView" in window) {
				new window.TradingView.widget({
					autosize: true,
					symbol: "COINBASE:ETHDAI",
					interval: "D",
					timezone: "Etc/UTC",
					theme: "dark",
					style: "1",
					locale: "en",
					toolbar_bg: "#f1f3f6",
					enable_publishing: false,
					gridColor: "rgba(255, 0, 0, 0.06)",
					hide_legend: true,
					allow_symbol_change: true,
					container_id: "tradingview_39004",
				});
			}
		}
	}, []);

	return (
		<div className="tradingview-widget-container w-full h-full">
			<div id="tradingview_39004" style={{ height: "calc(100% - 6rem)" }} />
			<div className="tradingview-widget-copyright">
				<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"></a>
			</div>
		</div>
	);
}
