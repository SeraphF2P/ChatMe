import { Btn } from "../ui/Btn";
import { Icon } from "../ui/Icons";
import { Input } from "../ui/Input";

export const SendMessageBar = () => {
	return (
		<div className="h-12 bg-neutral flex px-4 justify-center gap-4 items-center">
			<div className="flex w-full">
				<Input type="text" placeholder="message" />
				<Btn className="size-10 p-0">
					<Icon.send className="fill-neutral-revert" />
					<span className="sr-only"> send a message button</span>
				</Btn>
			</div>
		</div>
	);
};
