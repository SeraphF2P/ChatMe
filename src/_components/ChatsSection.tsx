import { useUserContext } from "../hooks/useUserContext";
import { Icon } from "../ui/Icons";
import { ChatBtn } from "./ChatBtn";

export const ChatsSection = () => {
	const { chats } = useUserContext();

	return (
		<section className=" remove-scroll-bar pt-20   overflow-y-scroll h-full divide-neutral-revert/30 divide-y-2">
			{chats && (
				<>
					{chats.length > 0 &&
						chats.map((chat) => {
							return (
								<ChatBtn key={chat.chat} chat={chat.chat} user={chat.user} />
							);
						})}
					{chats.length == 0 && (
						<div className="  p-4 bg-primary text-center space-y-4 capitalize ">
							<Icon.exclamation className="size-20 mx-auto" />
							<p className="text-base">don't have anyone to chat with ?</p>
							<p className="text-base">search for a friend and just say hi!</p>
						</div>
					)}
				</>
			)}
		</section>
	);
};
