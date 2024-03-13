import { mutate } from "swr";
import { useUserContext } from "../hooks/useUserContext";
import { getChaters } from "../lib/helper";
import { supabase } from "../server/supabase";
import { Btn } from "../ui/Btn";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";

type NewChatRoomProps = {
	chatId: string;
};

export const NewChatRoom = ({ chatId }: NewChatRoomProps) => {
	const { user } = useUserContext();
	const [u1, u2] = getChaters(chatId);
	const partnerId = u1 === user?.id ? u2 : u1;
	const creatChat = async (
		_: string,
		{
			arg: { partnerId, userId },
		}: {
			arg: {
				userId: string;
				partnerId: string;
			};
		}
	) => {
		const res = await Promise.allSettled([
			supabase.from("Chat").insert({ id: chatId }),
			supabase.from("_chats").insert({ chat: chatId, user: userId }),
			supabase.from("_chats").insert({ chat: chatId, user: partnerId }),
		]);
		if (res.every((req) => req.status === "fulfilled")) {
			mutate("chats");
		}
	};
	const { trigger, isMutating } = useSWRMutation("create-chat", creatChat);
	return (
		<>
			<img
				className=" hidden w-full -z-10 md:block absolute inset-0 object-cover h-full mix-blend-luminosity  opacity-20"
				src="/doodle-2.webp"
				alt="backfround"
			/>
			<h2>hello</h2>
			<p className="text-lg">it is the first time you open this chat</p>
			<p className="text-lg">wanna start a conversation ?</p>
			<Btn
				disabled={isMutating}
				onClick={async () => {
					await trigger({ partnerId, userId: user.id }).catch((err) => {
						toast.error(err.message);
					});
				}}
				className=" disabled:animate-pulse"
			>
				say hi
			</Btn>
		</>
	);
};
