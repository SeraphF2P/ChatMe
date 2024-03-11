"use client";

import { Fragment } from "react/jsx-runtime";
import { MessageType, User } from "../contexts/UserProvider";
import { useUserContext } from "../hooks/useUserContext";
import { Avatar } from "./Avatar";

type ChatMessagesProps = {
	messages: MessageType[];
	partner: User;
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
								<UserMsg
									name={user.username}
									image={user.image || undefined}
									msg={msg.text}
								/>
							)}
							{msg.userId === partner.id && (
								<PartnerMsg
									name={partner.username}
									image={partner.image || undefined}
									msg={msg.text}
								/>
							)}
						</Fragment>
					);
				})}
		</main>
	);
};
const UserMsg = ({
	msg,
	image,
	name,
}: {
	msg: string;
	image?: string;
	name: string;
}) => {
	return (
		<div className=" flex self-end items-center justify-center gap-2 px-4">
			<div className=" bg-primary h-10 p-2 rounded-full min-w-[40px] flex justify-center items-center   ">
				<span>{msg}</span>
			</div>
			<Avatar className="  size-8 text-2xl " name={name} src={image} />
		</div>
	);
};
const PartnerMsg = ({
	msg,
	image,
	name,
}: {
	msg: string;
	image?: string;
	name: string;
}) => {
	return (
		<div className=" flex self-start flex-row-reverse items-center gap-2 px-4">
			<div className=" bg-neutral h-10 p-2 rounded-full min-w-[40px] flex justify-center items-center   ">
				<span>{msg}</span>
			</div>

			<Avatar className=" size-8 text-2xl " name={name} src={image} />
		</div>
	);
};
