import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZOD } from "../../../lib/ZOD";
import { createUser, storeUser } from "../../../server/firebase";
import { Btn } from "../../../ui/Btn";
import { Input } from "../../../ui/Input";
import { useNavigate } from "react-router-dom";

type SignUpFormInput = Zod.infer<typeof ZOD.auth.signup>;
export const SignUpForm = ({
	sethasAccount,
}: {
	sethasAccount: (val: boolean) => void;
}) => {
	const nav = useNavigate();
	const {
		handleSubmit,
		register,
		formState: { isLoading },
	} = useForm<SignUpFormInput>({
		resolver: zodResolver(ZOD.auth.signup),
	});
	const submitHandler = async (values: SignUpFormInput) => {
		await createUser(values).then(async (res) => {
			const user = res.user;
			await storeUser({
				userId: user.uid,
				username: values.username,
				email: values.email,
			}).catch((err) => console.error(err));
			nav("/");
		});
		// .catch((err) => {
		// 	console.log(err);
		// });
	};
	return (
		<form
			onSubmit={handleSubmit(submitHandler)}
			className=" flex flex-col space-y-4 py-4"
		>
			<Input
				autoComplete="username"
				type="text"
				placeholder="username"
				{...register("username")}
			/>
			<Input
				autoComplete="email"
				type="email"
				placeholder="email"
				{...register("email")}
			/>
			<Input
				autoComplete="new-password"
				type="password"
				placeholder="password"
				{...register("password")}
			/>
			<Input
				autoComplete="new-password"
				type="password"
				placeholder="confirm password"
				{...register("password_confirmation")}
			/>
			<div className=" space-y-4">
				<Btn
					variant="ghost"
					onPointerDown={() => {
						sethasAccount(true);
					}}
				>
					already have an account ? log in
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
