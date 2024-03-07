"use client";

import { ComponentPropsWithoutRef } from "react";
import { cn } from "../lib/cva";

type AvatarProps = {
	username: string;
	src?: string;
	alt?: string;
};

export const Avatar = ({
	username,
	className,
	...props
}: AvatarProps & ComponentPropsWithoutRef<"div">) => {
	return (
		<div
			className={cn(
				" size-20 flex items-center justify-center rounded-full bg-primary text-6xl text-neutral-revert capitalize",
				className
			)}
		>
			{props.src ? <img {...props} alt="user avatart" /> : username[0]}
		</div>
	);
};
