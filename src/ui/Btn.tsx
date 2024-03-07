import type { ComponentPropsWithRef } from "react";
import { forwardRef } from "react";
import { cn, variants, type variantsType } from "../lib/cva";

export interface BtnProps
	extends ComponentPropsWithRef<"button">,
		variantsType {}

export const Btn = forwardRef<HTMLButtonElement, BtnProps>(
	(
		{
			className,
			variant,
			shape,
			children,
			deActivated,
			type = "button",
			...props
		},
		ref
	) => {
		return (
			<button
				ref={ref}
				type={type}
				{...props}
				className={cn(variants({ variant, shape, deActivated }), className)}
			>
				{children}
			</button>
		);
	}
);
