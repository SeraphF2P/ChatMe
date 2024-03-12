import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { MessageType } from "../contexts/UserProvider";
import { useUserContext } from "../hooks/useUserContext";
import { getChaters } from "../lib/helper";
import { supabase } from "../server/supabase";
import { Btn } from "../ui/Btn";
import { Icon } from "../ui/Icons";
import { Avatar } from "./Avatar";
import { ChatMessages } from "./ChatMessages";
import { SendMessageBar } from "./SendMessageBar";
export const CurrentChatRoom = () => {
	const { user } = useUserContext();
	const [searchParams, setsearchParams] = useSearchParams();
	const chatId = searchParams.get("chatId") ?? "";

	const [u1, u2] = getChaters(chatId);
	const partnerId = u1 === user?.id ? u2 : u1;
	const getPartner = async () => {
		return (await supabase.from("User").select("*").eq("id", partnerId)).data;
	};
	const {
		data: partnerData,
		mutate: mutatePartner,
		isLoading,
	} = useSWR("partner", getPartner);
	const partner = partnerData ? partnerData[0] : undefined;
	const getMessages = async () => {
		return await supabase
			.from("Message")
			.select("*")
			.eq("chatId", chatId)
			.range(0, 20)
			.order("created_At", { ascending: false });
	};
	const { data: msgData } = useSWRImmutable("chatRoom", getMessages, {
		keepPreviousData: true,
	});
	const oldMessages = msgData?.data ?? [];
	const [newMessages, setnewMessages] = useState<MessageType[]>([]);
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
					setnewMessages((prev) => [payload.new as MessageType, ...prev]);
				}
			)
			.subscribe();
		mutatePartner();

		return () => {
			channel.unsubscribe();
		};
	}, [chatId, mutatePartner]);

	const sendMessage = async (value: string) => {
		await supabase.from("Message").insert({
			chatId,
			userId: user?.id,
			text: value,
		});
	};

	return (
		<>
			{!isLoading && !partner && (
				<>
					<div className="isolate text-center ">
						<h2 className=" text-4xl">ERROR : 404</h2>
						<p className=" text-xl">user not found</p>
					</div>
				</>
			)}
			{!partner ? (
				<PulseLoader color="rgb(var(--neutral-revert))" size={24} />
			) : (
				<>
					<header className="  h-20 border-b-2 border-neutral-revert  bg-neutral flex justify-center w-full items-center     ">
						<div className="flex p-4 justify-between items-center  w-full sm:px-8 md:px-4  gap-4">
							<Btn
								variant="ghost"
								onPointerDown={() =>
									setsearchParams((prev) => {
										prev.delete("chatId");
										return prev;
									})
								}
							>
								<Icon.arrowLeft className="size-6 fill-neutral-revert" />
							</Btn>
							<h2>{partner?.username}</h2>
							<Avatar
								className=" scale-75"
								name={partner?.username}
								src={partner?.image || undefined}
							/>
						</div>
					</header>
					<ChatMessages
						messages={[...newMessages, ...oldMessages]}
						partner={partner}
					/>
					<SendMessageBar onSend={sendMessage} />
				</>
			)}
		</>
	);
};
