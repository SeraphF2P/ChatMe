"use client";
import { useClickOutside } from "@mantine/hooks";
import { AnimatePresence, motion as m } from "framer-motion";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useScrollLock from "../hooks/useScrollLock";
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
	const { user } = useAuthContext();

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
							className=" absolute   left-0 top-0  z-20 h-screen   right-10 md:right-0  -translate-x-full  bg-primary   opacity-0 shadow"
						>
							<div className="  flex w-full flex-col items-center justify-center py-16   ">
								{user && (
									<Avatar name={user.username} src={user.image || undefined} />
								)}
							</div>

							<ul className=" flex  flex-col items-center p-4 ">
								<li className=" text-xl capitalize">
									<a href="/">wishlist</a>
								</li>
								<li className=" text-xl capitalize">
									<a href="/">placeholder</a>
								</li>
								{user && (
									<li className=" text-xl capitalize">
										<button onPointerDown={() => signout()}>sign out</button>
									</li>
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
