import type {
	DialogContentProps,
	DialogTriggerProps,
} from "@radix-ui/react-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import { ElementRef, forwardRef, type RefAttributes } from "react";
import { Btn, BtnProps } from "./Btn";
import { cn } from "../lib/cva";

export const Modale = (props: JSX.IntrinsicAttributes & Dialog.DialogProps) => (
	<Dialog.Root {...props}>{props.children}</Dialog.Root>
);
const Button = (props: BtnProps & DialogTriggerProps) => (
	<Dialog.Trigger asChild>
		<Btn {...props} />
	</Dialog.Trigger>
);
const Close = ({ children, ...props }: BtnProps) => (
	<Dialog.Close asChild>
		<Btn {...props}>{children}</Btn>
	</Dialog.Close>
);

const Overlayer = forwardRef<
	ElementRef<"div">,
	Dialog.DialogOverlayProps & RefAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	return (
		<Dialog.Overlay
			{...props}
			ref={ref}
			className={cn(
				" fixed inset-0  isolate  z-50 flex items-center justify-center bg-gray-700/30 pb-10 opacity-0 backdrop-blur-sm data-[state=closed]:animate-fadeout data-[state=open]:animate-fadein",
				className
			)}
		/>
	);
});
const Content = forwardRef<
	ElementRef<"div">,
	DialogContentProps & RefAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	return (
		<Dialog.Content
			{...props}
			ref={ref}
			className={cn(
				" data-[state=closed]:animate-fadeout data-[state=open]:animate-fadein ",
				className
			)}
		/>
	);
});
Modale.Close = Close;
Modale.Title = Dialog.Title;
Modale.Description = Dialog.Description;
Modale.Portal = Dialog.Portal;
Modale.Content = Content;
Modale.overlayer = Overlayer;
Modale.Btn = Button;
