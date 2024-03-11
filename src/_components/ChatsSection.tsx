"use client";

import { useUserContext } from "../hooks/useUserContext";
import { ChatBtn } from "./ChatBtn";

export const ChatsSection = () => {
	const { chats } = useUserContext();

	return (
		<div className=" remove-scroll-bar pt-20   overflow-y-scroll h-full divide-neutral-revert divide-y-2">
			{chats &&
				chats.length > 0 &&
				chats?.map((chat) => {
					return <ChatBtn key={chat.chat} chat={chat.chat} user={chat.user} />;
				})}
		</div>
	);
};
