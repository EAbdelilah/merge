import Link from "next/link";
import Button from "./Button";
import Logo from "./Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
	return (
		<header className="md:mt-8 mt-4 fixed z-10 fit-content flex flex-row justify-between items-center px-6 py-2 rounded-full text-neutral-300">
			<div>
				<Link href="/" className="flex flex-row md:gap-2 gap-1 items-center">
					<Logo />
					<span className="font-bold md:text-lg text-sm">Eswap Margin</span>
				</Link>
			</div>
			<nav className="md:block hidden">
				<ul className="flex flex-row md:gap-12 gap-4 md:text-sm text-xs tracking-wider">
					<li>
						<Link href="/dashboard"> How to use ? </Link>
					</li>
					<li>
						<Link href="/earn">Earn</Link>
					</li>
					<li>
						<Link href="/trade">Trade</Link>
					</li>
				</ul>
			</nav>
			<div className="md:block hidden">
				{/* <Button type="button" size="xs" style="solid">
					Connect Wallet
				</Button> */}
				<ConnectButton />
			</div>
			<div className="md:hidden block">
				<button className="flex items-center hover:opacity-50 transition-all">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-12"
						fill="none"
						viewBox="6 0 24 20"
						stroke="currentColor"
					>
						<path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" d="M4 6h28M4 12h28M4" />
					</svg>
				</button>
			</div>
		</header>
	);
}
