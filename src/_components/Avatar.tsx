"use client";

import { ComponentPropsWithoutRef } from "react";
import { cn } from "../lib/cva";

type AvatarProps = {
	name: string;
	src: string | null;
	alt?: string;
};

export const Avatar = ({
	name,
	className,
	src,
	...props
}: AvatarProps & ComponentPropsWithoutRef<"div">) => {
	const firstLetter = name ? name[0] : "uk";
	const bgColor = "asdfghjklqwerty".includes(firstLetter)
		? "deeppink"
		: "darkred";
	return (
		<div
			className={cn(
				" relative flex items-center justify-center size-20   rounded-full  text-6xl text-neutral-revert capitalize",
				className
			)}
			style={{
				backgroundColor: bgColor,
			}}
		>
			{src ? (
				<img {...props} src={src} alt={`${name} profile image`} />
			) : (
				firstLetter
			)}
		</div>
	);
};
