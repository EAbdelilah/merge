"use client";

import { GradientCanvas } from "shadergradient";
import { Gradient } from "shadergradient";

export default function DashboardLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
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
				{/* <Gradient
					control="query"
				// @ts-ignore
					urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%2357caff&color2=%23dbba95&color3=%23d0bce1&embedMode=off&envPreset=city&fov=45&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=-1.4&positionY=0&positionZ=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=plane&uDensity=1.3&uFrequency=5.5&uSpeed=0.4&uStrength=4&uTime=0&wireframe=false"
				/> */}
			</GradientCanvas>
			<div className="page-content">
				<div className="flex justify-center md:mt-32 mt-24">{children}</div>
			</div>
		</div>
	);
}
