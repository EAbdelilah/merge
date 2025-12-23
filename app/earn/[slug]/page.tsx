import LiquidityCard from "../../../components/LiquidityCard";
import { networkConfig } from "../../../helper-config.js";

export default function earnTokenPage({ params }: { params: { slug: string } }) {
	const pool = networkConfig[137].pools.find((pool) => pool.name === params.slug.toUpperCase());
	if (!pool) {
		return <div>
			<p className="text-neutral-300 text-4xl">Pool {params.slug} not found</p>
		</div>;
	}
	return (
		<main className="flex flex-row justify-center">
			<LiquidityCard
				asset={pool.name}
				address={pool.address}
				apy={parseFloat(pool.apy)}
				volume={parseFloat(pool.tvl)}
				useRate={20}
			/>
		</main>
	);
}