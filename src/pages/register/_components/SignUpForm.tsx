import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ZOD } from "../../../lib/ZOD";
import { signUp, supabase } from "../../../server/supabase";
import { Btn } from "../../../ui/Btn";
import { Input } from "../../../ui/Input";

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
		await signUp(values).then(async (res) => {
			if (res.error?.message)
				return toast.error(res.error?.message ?? "user already exists");
			toast.success("a verification link has been send to your email");
			await supabase
				.from("users")
				.insert([
					{
						id: res.data.user?.id,
						username: values.username,
						email: values.email,
					},
				])
				.select()
				.then(() => {
					nav("/");
				});
		});
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
