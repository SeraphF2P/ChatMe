import { useState } from "react";
import { ErrorBoundary as EB, ErrorBoundaryProps } from "react-error-boundary";
import { Icon } from "./Icons";

export const ErrorBoundary = ({
	children,
}: Omit<ErrorBoundaryProps, "fallback">) => {
	const [error, seterror] = useState<Error>();
	return (
		<EB
			onError={(err) => seterror(err)}
			fallback={
				<main className=" h-svh bg-black fixed w-full inset-0">
					<div className="  p-4 bg-primary text-center space-y-4 capitalize ">
						<Icon.exclamation className="size-20 mx-auto" />
						<p className="text-lg">{error?.message}</p>
					</div>
				</main>
			}
		>
			{children}
		</EB>
	);
};
