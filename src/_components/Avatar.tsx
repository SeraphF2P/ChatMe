"use client";

import { ComponentPropsWithoutRef } from "react";
import { cn } from "../lib/cva";

type AvatarProps = {
	name: string;
	src: string | undefined;
	alt?: string;
};

export const Avatar = ({
	name,
	className,
	...props
}: AvatarProps & ComponentPropsWithoutRef<"div">) => {
	const firstLetter = name[0];
	const bgColor = "asdfghjklqwerty".includes(firstLetter)
		? "deeppink"
		: "darkred";
	return (
		<div
			className={cn(
				" size-20 flex items-center justify-center rounded-full  text-6xl text-neutral-revert capitalize",
				className
			)}
			style={{
				backgroundColor: bgColor,
			}}
		>
			{props.src ? <img {...props} alt={`${name} profile image`} /> : name[0]}
		</div>
	);
};
