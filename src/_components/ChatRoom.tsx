import { AnimatePresence, motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import useScrollLock from "../hooks/useScrollLock";
import { Tables } from "../server/database.types";
import { supabase } from "../server/supabase";
import { Btn } from "../ui/Btn";
import { Icon } from "../ui/Icons";
import { Avatar } from "./Avatar";
import { SendMessageBar } from "./SendMessageBar";
import { getChaters } from "../lib/helper";

export const ChatRoom = () => {
	const { user } = useAuthContext();
	const [partner, setPartner] = useState<Tables<"users">>();
	const [searchParams, setsearchParams] = useSearchParams();
	const chatId = searchParams.get("chatId") || "";

	console.log(user);
	if (!user || !user.chats) throw new Error("unAuthiraize");
	const isNewChat = !user.chats.some((id) => id === chatId);
	const isOpen = Boolean(chatId);
	const creatChat = async () => {
		console.log(user);
		console.log(partner);
		if (!user || !user.chats || !partner || !partner.chats)
			throw new Error("unAuthiraize");

		const res = await Promise.all([
			supabase
				.from("users")
				.update({ chats: [...user.chats, chatId] })
				.eq("id", user.id)
				.select("chats"),
			supabase
				.from("users")
				.update({ chats: [...partner.chats, chatId] })
				.eq("id", partner.id)
				.select("chats"),
		]);
		console.log(res);
	};

	useEffect(() => {
		const [u1, u2] = getChaters(chatId);
		const partnerId = u1 === user?.id ? u2 : u1;
		console.log(partnerId);
		const getPartner = async () => {
			const partner = await supabase
				.from("users")
				.select("*")
				.eq("id", partnerId);
			console.log(partner);
			if (partner.data) {
				setPartner(partner.data[0]);
			}
		};
		getPartner();
	}, [chatId, user?.id]);
	const [messages, setMessages] = useState([
		{
			senderId: user?.id,
			createdAt: Date.now(),
			text: "hi",
		},
		// {
		// 	senderId: partner.id,
		// 	createdAt: Date.now(),
		// 	text: "hi",
		// },
	]);
	useScrollLock(isOpen);

	return (
		<>
			<AnimatePresence mode="popLayout">
				{isNewChat && isOpen && (
					<m.section
						key={chatId}
						initial={{
							x: "100%",
							opacity: 0,
						}}
						animate={{
							x: 0,
							opacity: 1,
						}}
						exit={{
							x: "100%",
							opacity: 0,
						}}
						transition={{
							ease: "easeInOut",
						}}
						className="fixed  gap-4 flex-col bg-black flex justify-center items-center  right-0  w-full flex-1 h-full z-20  will-change-transform  md:relative "
					>
						<img
							className=" hidden w-full -z-10 md:block absolute inset-0 object-cover h-full mix-blend-luminosity  opacity-20"
							src="/doodle-2.webp"
							alt="backfround"
						/>
						<h2>hello</h2>
						<p className="text-lg">it is the first time you open this chat</p>
						<p className="text-lg">wanna start a conversation ?</p>
						<Btn onClick={creatChat}>say hi</Btn>
					</m.section>
				)}
				{!isNewChat && isOpen && (
					<m.section
						key={chatId}
						initial={{
							x: "100%",
							opacity: 0,
						}}
						animate={{
							x: 0,
							opacity: 1,
						}}
						exit={{
							x: "100%",
							opacity: 0,
						}}
						transition={{
							ease: "easeInOut",
						}}
						className=" z-20 flex flex-col will-change-transform fixed right-0 md:relative w-full flex-1 h-full bg-black"
					>
						<header className="  h-20 border-b-2 border-neutral-revert  bg-neutral flex justify-center w-full items-center     ">
							<div className="flex p-4 justify-between items-center  w-full sm:px-8 md:px-4  gap-4">
								<Btn
									variant="ghost"
									onClick={() =>
										setsearchParams((prev) => {
											prev.delete("chatId");
											return prev;
										})
									}
								>
									<Icon.arrowLeft className="size-6 fill-neutral-revert" />
								</Btn>
								<p>{partner?.username}</p>
								<Avatar
									className="size-12"
									name={user.username}
									src={user.image || undefined}
									alt="user avatar"
								/>
							</div>
						</header>
						<main className="  relative remove-scroll-bar flex-1 flex-col-reverse max-h-full overflow-y-scroll flex   py-4  gap-2    ">
							<div className="fixed bg-[url(/doodle-1.webp)] -z-10  mix-blend-luminosity  opacity-15 inset-0  " />
							{partner &&
								messages?.length > 0 &&
								messages.toReversed().map((msg) => {
									return (
										<>
											{msg.senderId === user.id && (
												<UserMsg
													name={user.username}
													image={user.image || undefined}
													msg={msg.text}
												/>
											)}
											{msg.senderId === partner.id && (
												<PartnerMsg
													name={partner.username}
													image={partner.image || undefined}
													msg={msg.text}
												/>
											)}
										</>
									);
								})}
						</main>
						<SendMessageBar
							onSend={(value) =>
								setMessages((prev) => [
									...prev,
									{
										createdAt: Date.now(),
										senderId: "user",
										text: value,
									},
								])
							}
						/>
					</m.section>
				)}
				{/* {!isOpen && (
					<m.div
						key={"chat-room-placeholder"}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="  bg-black hidden md:flex justify-center items-center  right-0 relative w-full flex-1 h-full "
					>
						<img
							className=" hidden w-full md:block absolute inset-0 object-cover h-full mix-blend-luminosity  opacity-20"
							src="/doodle-2.webp"
							alt="backfround"
						/>
						<h2>welcome</h2>
					</m.div>
				)} */}
			</AnimatePresence>
		</>
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
		<div className=" flex self-end items-center gap-2 px-4">
			<div className=" bg-primary h-10 p-2 rounded-full min-w-[40px] flex justify-center items-center   ">
				<span>{msg}</span>
			</div>
			{/* <div className=" relative size-8 overflow-hidden rounded-full">
				<img className="absolute inset-0 bg-red-500 " src={image} alt="" />
			</div> */}
			<Avatar
				className=" relative size-8 overflow-hidden rounded-full"
				name={name}
				src={image}
			/>
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
			{/* <div className=" relative size-8 overflow-hidden rounded-full">
				<img className="absolute inset-0 bg-red-500 " src={image} alt="" />
			</div> */}
			<Avatar
				className=" relative size-8 overflow-hidden rounded-full"
				name={name}
				src={image}
			/>
		</div>
	);
};
