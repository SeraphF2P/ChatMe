import { PulseLoader } from "react-spinners";

export const Loading = () => {
	return (
		<div className="isolate  fixed h-screen w-full  grid bg-neutral ">
			<div className=" flex flex-col justify-center items-center gap-6 m-auto">
				<h2 className=" text-4xl font-semibold">ChatMe</h2>
				<PulseLoader color="rgb(var(--neutral-revert))" size={24} />
			</div>
		</div>
	);
};
