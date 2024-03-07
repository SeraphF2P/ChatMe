import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion as m } from "framer-motion";
import useScrollLock from "../hooks/useScrollLock";
import { Icon } from "../ui/Icons";
import { Btn } from "../ui/Btn";
import { Avatar } from "./Avatar";
import { SendMessageBar } from "./SendMessageBar";
export const ChatRoom = () => {
	const [searchParams, setsearchParams] = useSearchParams();
	const chatId = searchParams.get("chatId");
	const isOpen = Boolean(chatId);
	useScrollLock(isOpen);
	const username = "username";
	const userimage = "/logo.png";
	return (
		<>
			<AnimatePresence mode="popLayout">
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
								<p>{username}</p>

								<Avatar
									className="size-12"
									username={username}
									src={userimage}
									alt="user avatar"
								/>
							</div>
						</header>
						<main className=" flex-1  bg-[url(/doodle-1.webp)] mix-blend-luminosity  opacity-15  relative  "></main>
						<SendMessageBar />
					</m.section>
				)}
				{!isOpen && (
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
				)}
			</AnimatePresence>
		</>
	);
};
