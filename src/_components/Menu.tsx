"use client";
import { useClickOutside } from "@mantine/hooks";
import { AnimatePresence, motion as m } from "framer-motion";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useScrollLock from "../hooks/useScrollLock";
import { useUserContext } from "../hooks/useUserContext";
import { signout } from "../server/supabase";
import { Btn } from "../ui/Btn";
import { Icon } from "../ui/Icons";
import { Avatar } from "./Avatar";
export const Menu = () => {
	const [isOpen, setisOpen] = useState(false);
	const ContentRef = useClickOutside(() => {
		setisOpen(false);
	});
	useScrollLock(isOpen);
	const { session } = useAuthContext();
	const { user } = useUserContext();

	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<>
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
							className=" absolute  inset-0 h-screen md:hidden z-20   bg-white/10  backdrop-blur-md"
						/>
						<m.section
							ref={ContentRef}
							initial={{
								x: "-100%",
								opacity: 0,
							}}
							animate={{
								x: 0,
								opacity: 1,
							}}
							exit={{
								x: "-100%",
								opacity: 0,
							}}
							transition={{
								ease: "easeInOut",
							}}
							className=" pt-[10%] absolute   left-0 top-0  z-20 h-screen   right-10 md:right-0  -translate-x-full  bg-primary/70 backdrop-blur-sm   opacity-0 shadow"
						>
							<div className="   w-full  p-8 flex gap-4 justify-center items-center flex-col    ">
								<Avatar
									className=" size-24 text-6xl"
									name={user.username}
									src={user.image}
								/>
								<p className=" text-lg">@{user.username}</p>
							</div>

							<ul className=" flex  flex-col items-center gap-4 p-4 ">
								<li>{user.email}</li>

								{session && (
									<>
										<li className="  capitalize">
											{session?.user.email_confirmed_at ? (
												<p className=" font-semibold  text-success">verified</p>
											) : (
												<p className=" font-semibold  text-alert">uverified</p>
											)}
										</li>
										<li className="  capitalize">
											<Btn
												className=" h-10  rounded-full [--variant:223,22,22]"
												onPointerDown={() => signout()}
											>
												sign out
											</Btn>
										</li>
									</>
								)}
							</ul>
						</m.section>
					</>
				)}
			</AnimatePresence>
			<Btn onClick={() => setisOpen(true)} variant="none" className={`p-0`}>
				<Icon.burgerMenu className="size-8 fill-neutral-revert" />
				<span className=" sr-only">Menu</span>
			</Btn>
		</>
	);
};
