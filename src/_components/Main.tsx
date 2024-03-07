import { ComponentProps } from "react";

export const Main = ({ children, ...props }: ComponentProps<"main">) => {
	return (
		<>
			<main {...props}>{children}</main>
		</>
	);
};
