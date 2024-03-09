import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { getChaters } from "../lib/helper";
import { Tables } from "../server/database.types";
import { supabase } from "../server/supabase";
import { Btn } from "../ui/Btn";
import { Avatar } from "./Avatar";
type ChatBtnProps = {
	chatId: string;
};

export const ChatBtn = ({ chatId }: ChatBtnProps) => {
	const [_, setsearchParams] = useSearchParams();
	const { user } = useAuthContext();
	const [partner, setPartner] = useState<Tables<"users">>();
	useEffect(() => {
		const fetcher = async () => {
			const [u1, u2] = getChaters(chatId);
			const partnerId = u1 === user?.id ? u2 : u1;
			const partner = await supabase
				.from("users")
				.select("*")
				.eq("id", partnerId);
			setPartner(partner.data ? partner.data[0] : undefined);
		};
		fetcher();
	}, [chatId]);

	const lastMessage = "lastMessage";
	return (
		<Btn
			onClick={() => setsearchParams(new URLSearchParams({ chatId }))}
			className="  flex  text-neutral-revert justify-start gap-4 px-4 hover:bg-neutral-hover h-20 bg-neutral w-full"
		>
			{partner && (
				<Avatar
					name={partner.username}
					src={partner?.image || undefined}
					className="size-12 text-3xl"
				/>
			)}
			<div>
				<p className=" capitalize truncate text-left text-lg">
					{partner?.username}
				</p>
				<p className=" capitalize truncate text-left text-sm text-neutral-revert/80">
					{lastMessage}
				</p>
			</div>
		</Btn>
	);
};
