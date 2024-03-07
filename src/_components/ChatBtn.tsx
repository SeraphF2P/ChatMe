import { useSearchParams } from "react-router-dom";
import { Avatar } from "./Avatar";
import { Btn } from "../ui/Btn";
type ChatBtnProps = {
	chatId: string;
};

export const ChatBtn = ({ chatId }: ChatBtnProps) => {
	const [_, setsearchParams] = useSearchParams();
	const username = "username";
	const lastMessage = "lastMessage";
	return (
		<Btn
			onClick={() => setsearchParams(new URLSearchParams({ chatId }))}
			className="  flex  text-neutral-revert justify-start gap-4 px-4 hover:bg-neutral-hover h-20 bg-neutral w-full"
		>
			<Avatar username={username} className="size-12 text-3xl" />
			<div>
				<p className=" capitalize truncate text-left text-lg">{username}</p>
				<p className=" capitalize truncate text-left text-sm text-neutral-revert/80">
					{lastMessage}
				</p>
			</div>
		</Btn>
	);
};
