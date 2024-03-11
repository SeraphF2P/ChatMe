import { useSearchParams } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { CurrentChatRoom } from "./CurrentChatRoom";
import { NewChatRoom } from "./NewChatRoom";

export const ChatRoom = () => {
	const { user, chats } = useUserContext();
	const [searchParams] = useSearchParams();
	const chatId = searchParams.get("chatId") ?? "";
	if (!user) throw new Error("unAuthiraize");
	const isNewChat = !chats?.some((chat) => chat.chat === chatId);
	return (
		<>
			{isNewChat ? (
				<NewChatRoom chatId={chatId} />
			) : (
				<CurrentChatRoom key={chatId} />
			)}
		</>
	);
};
