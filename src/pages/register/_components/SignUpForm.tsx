import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ZOD } from "../../../lib/ZOD";
import { signUp, supabase } from "../../../server/supabase";
import { Btn } from "../../../ui/Btn";
import { Input } from "../../../ui/Input";
import { PulseLoader } from "react-spinners";
type SignUpFormInput = Zod.infer<typeof ZOD.auth.signup>;
export const SignUpForm = ({
	sethasAccount,
}: {
	sethasAccount: (val: boolean) => void;
}) => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormInput>({
		resolver: zodResolver(ZOD.auth.signup),
	});
	const submitHandler = async (values: SignUpFormInput) => {
		await signUp(values).then(async (res) => {
			if (res.error?.message) {
				return toast.error(res.error?.message);
			}
			await supabase
				.from("User")
				.insert([
					{
						id: res.data.user?.id,
						username: values.username,
						email: values.email,
					},
				])
				.select()
				.then(() => {
					reset();
					toast.success("a verification link has been send to your email");
				});
		});
	};

	return (
		<form
			onSubmit={handleSubmit(submitHandler)}
			className=" flex flex-col  text-neutral-revert space-y-4 py-4"
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
					className="p-1 text-base my-1"
				>
					already have an account ? log in
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
