import { useDebouncedValue, useInputState } from "@mantine/hooks";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { useAuthContext } from "../hooks/useAuthContext";
import { toChatId } from "../lib/helper";
import { supabase } from "../server/supabase";
import { Icon } from "../ui/Icons";
import { Input } from "../ui/Input";
import { Avatar } from "./Avatar";

export const SearchBar = () => {
	const { user } = useAuthContext();
	const [isOpen, setisOpen] = useState(false);
	const [name, setName] = useInputState("");
	const [debouncedName] = useDebouncedValue(name, 500);
	const [_, setsearchParams] = useSearchParams();
	const fetcher = async (val: string) => {
		console.log(val);
		return await supabase
			.from("users")
			.select(`id , username , image`)
			.limit(5)
			.like("username", `%${val}%`)
			.neq("username", user?.username);
	};
	const { data, isLoading } = useSWR(debouncedName, fetcher, {
		keepPreviousData: true,
	});
	console.log(data);
	const results = data?.data ?? [];
	return (
		<>
			<div className=" relative w-full max-w-[320px] ">
				<Input
					type="text"
					placeholder="search"
					onChange={async (e) => {
						if (e.target.value !== "") {
							setName(e);
							setisOpen(true);
						} else {
							setisOpen(false);
						}
					}}
					className="border-b-2 w-full  border-neutral-revert "
				/>
				<div className="absolute right-0 top-0  pointer-events-none -z-10 flex justify-center items-center h-full aspect-square">
					<Icon.search className="   size-6 fill-neutral-revert" />
				</div>
			</div>
			{isOpen && (
				<section className=" flex absolute top-20  justify-center w-full h-40 bg-slate-800   items-center overflow-x-scroll">
					{!isLoading && user && results.length > 0 && (
						<ul className=" flex gap-4  items-center px-4       ">
							{results?.map((chatPartner) => {
								return (
									<li key={chatPartner.id} className="  text-center">
										<button
											onPointerDown={() => {
												setsearchParams(
													new URLSearchParams({
														chatId: toChatId(chatPartner.id, user.id),
													})
												);
												setisOpen(false);
											}}
										>
											<Avatar
												name={chatPartner.username}
												src={chatPartner.image}
												className="rounded-full size-16 bg-amber-400"
											/>
											<span>{chatPartner.username}</span>
										</button>
									</li>
								);
							})}
						</ul>
					)}
					{isLoading && (
						<div className=" flex gap-4  items-center px-4 ">loading....</div>
					)}
					{!isLoading && results.length === 0 && (
						<div className=" flex gap-4  items-center px-4 ">no user found</div>
					)}
				</section>
			)}
		</>
	);
};
