"use client";

import { Fragment } from "react/jsx-runtime";
import { MessageType, User } from "../contexts/UserProvider";
import { useUserContext } from "../hooks/useUserContext";
import { getTimeWithAMPM } from "../lib/helper";

type ChatMessagesProps = {
	messages: MessageType[];
	partner: User | null;
};

export const ChatMessages = ({ messages, partner }: ChatMessagesProps) => {
	const { user } = useUserContext();
	return (
		<main className="  relative remove-scroll-bar w-full flex-1 flex-col-reverse max-h-full overflow-y-scroll flex   py-4  gap-2    ">
			<div className="fixed bg-[url(/doodle-1.webp)] -z-10  mix-blend-luminosity  opacity-15 inset-0  " />
			{messages?.length > 0 &&
				messages.map((msg) => {
					return (
						<Fragment key={msg.id}>
							{msg.userId === user?.id && (
								<UserMsg created_At={msg.created_At} msg={msg.text} />
							)}
							{msg.userId === partner?.id && (
								<PartnerMsg created_At={msg.created_At} msg={msg.text} />
							)}
						</Fragment>
					);
				})}
		</main>
	);
};
const UserMsg = ({ msg, created_At }: { msg: string; created_At: string }) => {
	const timeString = getTimeWithAMPM(created_At);
	return (
		<div className=" bg-primary flex-wrap mx-6 p-2 px-4 rounded-3xl rounded-br-sm min-w-[40px] flex justify-end items-center     self-end ">
			<p>{msg}</p>
			<p className=" whitespace-nowrap  px-2 ">{timeString}</p>
		</div>
	);
};
const PartnerMsg = ({
	msg,
	created_At,
}: {
	msg: string;
	created_At: string;
}) => {
	const timeString = getTimeWithAMPM(created_At);
	return (
		<div className="bg-neutral flex-wrap mx-6 p-2 px-4 rounded-3xl rounded-bl-sm min-w-[40px] flex justify-end items-center    self-start ">
			<p>{msg}</p>
			<p className=" whitespace-nowrap  px-2 ">{timeString}</p>
		</div>
	);
};
