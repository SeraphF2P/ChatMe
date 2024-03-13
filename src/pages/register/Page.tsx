import { AnimatePresence, motion as m } from "framer-motion";
import { ComponentProps, useState } from "react";
import { LoginForm } from "./_components/LoginForm";
import { SignUpForm } from "./_components/SignUpForm";

export default function Register() {
	const [hasAccount, sethasAccount] = useState(false);
	return (
		<AnimatePresence>
			{hasAccount ? (
				<Card key="login form">
					<h2 className=" text-2xl mt-4">welcome back</h2>
					<LoginForm sethasAccount={sethasAccount} />
				</Card>
			) : (
				<Card key="sign up form">
					<h2 className=" text-2xl mt-4">welcome to chatme</h2>
					<SignUpForm sethasAccount={sethasAccount} />
				</Card>
			)}
		</AnimatePresence>
	);
}
const Card = (props: ComponentProps<"section">) => {
	return (
		<m.section
			initial={{
				scale: 0.8,
				opacity: 0,
			}}
			animate={{
				scale: 1,
				opacity: 1,
			}}
			exit={{
				scale: 0.8,
				opacity: 0,
			}}
			transition={{ ease: "circInOut" }}
			className=" absolute  isolate  flex flex-col rounded-sm px-4    "
		>
			<div className="  absolute -inset-1   rounded-md bg-primary  -z-20 blur"></div>
			<div className=" absolute -inset-1   rounded-md -z-20  overflow-hidden">
				<div className=" absolute inset-10 -left-20 -right-20    animate-[spin_5s_infinite_linear]    bg-rose-500 blur-2xl  -z-10 "></div>
			</div>
			<div className="  absolute inset-0   rounded-sm bg-neutral  -z-10 "></div>
			{props.children}
		</m.section>
	);
};
