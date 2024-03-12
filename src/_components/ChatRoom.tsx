import { useSearchParams } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { CurrentChatRoom } from "./CurrentChatRoom";
import { NewChatRoom } from "./NewChatRoom";

export const ChatRoom = () => {
	const { chats } = useUserContext();
	const [searchParams] = useSearchParams();
	const chatId = searchParams.get("chatId") ?? "";
	const isNewChat =
		chatId !== "" && !chats?.some((chat) => chat.chat === chatId);
	return (
		<>{isNewChat ? <NewChatRoom chatId={chatId} /> : <CurrentChatRoom />}</>
	);
};
