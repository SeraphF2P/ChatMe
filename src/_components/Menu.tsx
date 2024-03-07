"use client";
import { useClickOutside } from "@mantine/hooks";
import { AnimatePresence, motion as m } from "framer-motion";
import { useState } from "react";
import useScrollLock from "../hooks/useScrollLock";
import { Btn } from "../ui/Btn";
import { Icon } from "../ui/Icons";
import { useAuthContext } from "../hooks/useAuthContext";
export const Menu = () => {
	const [isOpen, setisOpen] = useState(false);
	const ContentRef = useClickOutside(() => {
		setisOpen(false);
	});
	useScrollLock(isOpen);
	const { currentUser } = useAuthContext();
	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<>
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
							className=" absolute   left-0 top-0  z-20 h-screen  w-full  -translate-x-full  bg-primary/80 backdrop-blur-md  opacity-0 shadow"
						>
							<div className="  flex w-full flex-col items-center justify-center py-16   ">
								{currentUser &&
									(currentUser.photoURL ? (
										<img />
									) : (
										<div className=" size-24 flex items-center justify-center rounded-full bg-primary text-6xl capitalize">
											{currentUser.email && currentUser.email[0]}
										</div>
									))}
							</div>

							<ul className=" flex  flex-col items-center p-4 ">
								<li className=" text-xl capitalize">
									<a href="/">wishlist</a>
								</li>
								<li className=" text-xl capitalize">
									<a href="/">placeholder</a>
								</li>
								<li className=" text-xl capitalize">
									<a href="/">placeholder</a>
								</li>
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
