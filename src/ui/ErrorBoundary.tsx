import { ErrorBoundary as EB, ErrorBoundaryProps } from "react-error-boundary";
import { NoContent } from "./NoContent";

export const ErrorBoundary = ({
	children,
}: Omit<ErrorBoundaryProps, "fallback">) => {
	return (
		<EB
			fallback={
				<main
					className={` w-full h-screen  flex items-center justify-center  `}
				>
					<NoContent
						caption={
							<p className=" text-rose-800 capitalize font-semibold">
								something went wrong try again later
							</p>
						}
					/>
				</main>
			}
		>
			{children}
		</EB>
	);
};
