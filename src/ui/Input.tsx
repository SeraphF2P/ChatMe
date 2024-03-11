import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { cn } from "../lib/cva";

export const Input = forwardRef<
	ElementRef<"input">,
	ComponentPropsWithoutRef<"input">
>(({ className, ...props }, forwardedRef) => {
	return (
		<input
			ref={forwardedRef}
			{...props}
			className={cn(
				"bg-neutral-revert/10 flex-1   p-2 placeholder:capitalize border-neutral-revert ",
				className
			)}
		/>
	);
});
