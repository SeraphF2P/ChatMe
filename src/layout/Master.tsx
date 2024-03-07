import { Outlet } from "react-router-dom";

export default function Master() {
	return (
		<main className="  flex justify-center  remove-scroll-bar items-center w-full h-screen overflow-y-scroll relative">
			<img
				className="  absolute w-full inset-0 object-cover h-full mix-blend-luminosity  opacity-15"
				src="/pattern.webp"
				alt="backfround"
			/>
			<Outlet />
		</main>
	);
}
