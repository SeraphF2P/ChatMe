import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import { ChatType, MessageType } from "../contexts/UserProvider";
import { useUserContext } from "../hooks/useUserContext";
import { supabase } from "../server/supabase";
import { Btn } from "../ui/Btn";
import { Avatar } from "./Avatar";
import { Icon } from "../ui/Icons";

export const ChatBtn = ({ chat: chatId, user: partner }: ChatType) => {
	const [searchParams, setsearchParams] = useSearchParams();
	const { data } = useSWRImmutable("lastMessage" + "-" + chatId, async () => {
		return await supabase
			.from("Message")
			.select("*")
			.order("created_At", { ascending: false })
			.limit(1)
			.eq("chatId", chatId)
			.single();
	});
	const [lastMsg, setlastMsg] = useState<MessageType>();
	const { user } = useUserContext();
	const [hasNewMessage, sethasNewMessage] = useState(false);
	useEffect(() => {
		const channel = supabase
			.channel("chatRoom-" + chatId)
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: `Message`,
					filter: `chatId=eq.${chatId}`,
				},
				(payload) => {
					const newMessage = payload.new as MessageType;
					setlastMsg(newMessage);
				}
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, [chatId]);
	const lastMessage = lastMsg ?? data?.data;

	useEffect(() => {
		const chatIsOpen = searchParams.get("chatId") === chatId;
		if (lastMsg && lastMsg?.userId !== user.id) {
			if (!chatIsOpen) {
				sethasNewMessage(true);
			}
			Notification.requestPermission().then((perm) => {
				if (perm === "granted") {
					let notification: Notification | undefined;
					if (!chatIsOpen && !notification) {
						console.log("notify");
						notification = new Notification(`message received`, {
							tag: lastMsg.id,
							body: `${partner.username} has sent you a message`,
						});
					} else if (chatIsOpen && notification) {
						notification.close();
					}
				}
			});
		}
	}, [chatId, lastMsg, partner.username, searchParams, user.id]);
	return (
		<Btn
			onClick={() => {
				setsearchParams(new URLSearchParams({ chatId }));
				sethasNewMessage(false);
			}}
			className="  flex  text-neutral-revert justify-start gap-4 px-4 hover:bg-neutral-hover h-20 bg-neutral w-full"
		>
			{partner && (
				<Avatar
					name={partner.username}
					src={partner?.image}
					className="size-12 text-3xl aspect-square"
				/>
			)}
			<div className=" w-full">
				<p className=" capitalize truncate text-left text-lg">
					{partner?.username}
				</p>
				<div className="  h-5 flex   ">
					{lastMessage?.text && (
						<p className="  truncate max-w-[24ch]  text-left text-sm text-neutral-revert/80">
							{`${
								lastMessage?.userId === partner.id ? partner.username : "you"
							} : ${lastMessage?.text}`}
						</p>
					)}
				</div>
			</div>
			{hasNewMessage && (
				<span>
					<Icon.exclamation className=" size-6 fill-alert" />
				</span>
			)}
		</Btn>
	);
};
