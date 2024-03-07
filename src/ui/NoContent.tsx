import {
	ComponentPropsWithoutRef,
	ElementRef,
	ReactNode,
	forwardRef,
} from "react";
import { Icon } from "./Icons";
import { cn } from "../lib/cva";

interface NoContentProps extends ComponentPropsWithoutRef<"div"> {
	caption?: ReactNode;
}

export const NoContent = forwardRef<ElementRef<"div">, NoContentProps>(
	({ caption = "no content available", className, ...props }, ref) => {
		const Component = typeof caption === "string" ? <p>{caption}</p> : caption;
		return (
			<div
				ref={ref}
				{...props}
				className={cn(
					" m-auto  flex min-h-[160px] p-4 w-full max-w-[240px]  flex-col items-center justify-center gap-2 rounded bg-primary/40  text-center shadow ",
					className
				)}
			>
				<Icon.exclamation className="  size-20" />
				{Component}
			</div>
		);
	}
);
