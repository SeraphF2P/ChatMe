"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { ZOD } from "../../../lib/ZOD";
import { logIn } from "../../../server/supabase";
import { Btn } from "../../../ui/Btn";
import { Input } from "../../../ui/Input";

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
		formState: { isSubmitting, errors },
	} = useForm<LoginFormInput>({
		resolver: zodResolver(ZOD.auth.login),
	});
	const submitHandler = async (values: LoginFormInput) => {
		await logIn(values)
			.then((res) => {
				if (res.error == null) {
					toast.success("Successfully logged in");
					nav("/");
				} else {
					toast.error(res.error.message);
				}
			})
			.catch((err) => {
				toast.error(err.message);
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
					className="p-1 text-base my-1"
				>
					don't have an account ? sign up
				</Btn>
				<Btn
					disabled={isSubmitting}
					type="submit"
					onClick={() => {
						if (errors) {
							const errMsgs = Object.entries(errors).map(
								(err) => err[1].message
							);
							toast.error(errMsgs[0]);
						}
					}}
					className="w-full h-10 disabled:animate-pulse "
				>
					{isSubmitting ? (
						<PulseLoader color="rgb(var(--neutral-revert))" />
					) : (
						"submit"
					)}
				</Btn>
			</div>
		</form>
	);
};
