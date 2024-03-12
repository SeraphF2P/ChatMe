import { useRef } from "react";
import { Btn, BtnProps } from "../ui/Btn";
import { Icon } from "../ui/Icons";
import { Input } from "../ui/Input";

export const SendMessageBar = ({
	onSend,
}: BtnProps & { onSend: (val: string) => void }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const handleClick = () => {
		const inputTag = inputRef.current;
		if (!inputTag) return;
		const value = inputTag.value;
		onSend(value);
		inputTag.value = "";
	};
	return (
		<div className=" bg-neutral flex p-4 justify-center  w-full items-center">
			<div className="flex w-full gap-4 max-w-[320px]">
				<Input ref={inputRef} type="text" placeholder="message" />
				<Btn onClick={handleClick} className="size-10 p-0">
					<Icon.send className="fill-neutral-revert" />
					<span className="sr-only"> send a message button</span>
				</Btn>
			</div>
		</div>
	);
};
