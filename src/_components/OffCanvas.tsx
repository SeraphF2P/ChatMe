import { AnimatePresence, motion as m } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import useScrollLock from "../hooks/useScrollLock";
import { ChatRoom } from "./ChatRoom";
import { useEffect } from "react";
import { mutate } from "swr";

export const OffCanves = () => {
	const [searchParams] = useSearchParams();
	const chatId = searchParams.get("chatId") || "";
	const isOpen = Boolean(chatId);
	useScrollLock(isOpen);
	useEffect(() => {
		mutate("chatRoom");
	}, [chatId]);
	return (
		<>
			<AnimatePresence mode="wait">
				{isOpen && (
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
						className="fixed  gap-4 flex-col bg-black flex justify-center items-center top-0  right-0  w-full flex-1 h-full z-20  will-change-transform  md:relative "
					>
						<ChatRoom key={chatId} />
					</m.section>
				)}
				{!isOpen && (
					<m.div
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
						exit={{
							opacity: 0,
						}}
						key={"placeholder"}
						className="  bg-black hidden md:flex justify-center items-center  right-0 md:relative w-full flex-1 h-full "
					>
						<img
							className=" hidden w-full md:block absolute inset-0 object-cover h-full mix-blend-luminosity  opacity-20"
							src="/doodle-2.webp"
							alt="backfround"
						/>
						<h2>welcome</h2>
					</m.div>
				)}
			</AnimatePresence>
		</>
	);
};
