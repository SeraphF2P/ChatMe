"use client";

import { useForm } from "react-hook-form";
import { Btn } from "../../../ui/Btn";
import { Input } from "../../../ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "../../../server/firebase";
import { ZOD } from "../../../lib/ZOD";
import { useNavigate } from "react-router-dom";

type LoginFormInput = Zod.infer<typeof ZOD.auth.login>;

export const LoginForm = ({
	sethasAccount,
}: {
	sethasAccount: (val: boolean) => void;
}) => {
	const nav = useNavigate();
	const {
		handleSubmit,
		register,
		formState: { isLoading },
	} = useForm<LoginFormInput>({
		resolver: zodResolver(ZOD.auth.login),
	});
	const submitHandler = async (values: LoginFormInput) => {
		await createUser(values)
			.then(() => {
				nav("/");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<form
			onSubmit={handleSubmit(submitHandler)}
			className=" flex flex-col space-y-4 py-4"
		>
			<Input
				{...register("email")}
				autoComplete="email"
				type="email"
				placeholder="email"
				name="email"
			/>
			<Input
				{...register("password")}
				autoComplete="current-password"
				type="password"
				placeholder="password"
				name="password"
			/>
			<div className=" space-y-4">
				<Btn
					variant="ghost"
					onPointerDown={() => {
						sethasAccount(false);
					}}
				>
					don't have an account ? sign up
				</Btn>
				<Btn
					disabled={isLoading}
					type="submit"
					className="w-full disabled:animate-pulse "
				>
					submit
				</Btn>
			</div>
		</form>
	);
};
