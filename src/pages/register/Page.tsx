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
				y: 100,
				opacity: 0,
			}}
			animate={{
				y: 0,
				opacity: 1,
			}}
			exit={{
				y: -100,
				opacity: 0,
			}}
			className=" absolute   flex flex-col rounded-sm px-4   bg-neutral "
		>
			<div className=" absolute -inset-1   rounded-md bg-primary  -z-10 blur"></div>
			<div className=" absolute -inset-1   rounded-md -z-10  overflow-hidden">
				<div className=" absolute inset-10 -left-20 -right-20    animate-[spin_5s_infinite_linear]    bg-rose-500 blur-2xl  -z-10 "></div>
			</div>
			{props.children}
		</m.section>
	);
};
