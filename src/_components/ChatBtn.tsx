import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import { ChatType, MessageType } from "../contexts/UserProvider";
import { supabase } from "../server/supabase";
import { Btn } from "../ui/Btn";
import { Avatar } from "./Avatar";
import { useUserContext } from "../hooks/useUserContext";

export const ChatBtn = ({ chat: chatId, user: partner }: ChatType) => {
	const [searchParams, setsearchParams] = useSearchParams();
	const chatIsOpen = searchParams.get("chatId") === chatId;
	const { data } = useSWRImmutable("lastMessage-" + chatId, async () => {
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
					setlastMsg(payload.new as MessageType);
					if (payload.new?.userId !== user.id) {
						Notification.requestPermission((perm) => {
							if (perm === "granted") {
								let notification: Notification | undefined;
								if (!chatIsOpen && !notification) {
									notification = new Notification(
										`${partner.username} has sent you a message`,
										{
											tag: partner.id,
										}
									);
								} else if (chatIsOpen && notification) {
									notification.close();
								}
							}
						});
					}
				}
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, [chatId, chatIsOpen, partner.id, partner.username, user.id]);
	const lastMessage = lastMsg ?? data?.data;
	return (
		<Btn
			onClick={() => setsearchParams(new URLSearchParams({ chatId }))}
			className="  flex  text-neutral-revert justify-start gap-4 px-4 hover:bg-neutral-hover h-20 bg-neutral w-full"
		>
			{partner && (
				<Avatar
					name={partner.username}
					src={partner?.image}
					className="size-12 text-3xl"
				/>
			)}
			<div>
				<p className=" capitalize truncate text-left text-lg">
					{partner?.username}
				</p>
				<div className="  h-5 flex">
					{lastMessage?.text && (
						<p className=" capitalize truncate text-left text-sm text-neutral-revert/80">
							{`${
								lastMessage?.userId === partner.id ? partner.username : "you"
							} : ${lastMessage?.text}`}
						</p>
					)}
				</div>
			</div>
		</Btn>
	);
};
