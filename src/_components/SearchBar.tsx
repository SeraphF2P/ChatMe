import {
	useClickOutside,
	useDebouncedValue,
	useInputState,
} from "@mantine/hooks";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { useUserContext } from "../hooks/useUserContext";
import { toChatId } from "../lib/helper";
import { supabase } from "../server/supabase";
import { Icon } from "../ui/Icons";
import { Input } from "../ui/Input";
import { Avatar } from "./Avatar";
import { PulseLoader } from "react-spinners";

export const SearchBar = () => {
	const { user } = useUserContext();
	const [isOpen, setisOpen] = useState(false);
	const [name, setName] = useInputState("");
	const [debouncedName] = useDebouncedValue(name, 500);
	const [_, setsearchParams] = useSearchParams();
	const fetcher = async (name: string) => {
		return await supabase
			.from("User")
			.select(`id , username , image`)
			.limit(5)
			.ilike("username", `%${name}%`)
			.neq("username", user?.username);
	};
	const { data, isValidating } = useSWR(debouncedName, fetcher, {
		keepPreviousData: true,
		refreshInterval: 0,
		revalidateIfStale: false,
	});
	const results = data?.data ?? [];
	const searchResultRef = useClickOutside(() => setisOpen(false));
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
				<section
					ref={searchResultRef}
					className="  scrollbar-thin scrollbar-track-white/10  scrollbar-thumb-primary flex absolute top-20  justify-center w-full h-40 bg-slate-800   items-center overflow-x-scroll"
				>
					{!isValidating && results.length > 0 && (
						<ul className=" flex gap-4  items-center px-4       ">
							{results?.map((chatPartner) => {
								return (
									<li key={chatPartner.id} className="  text-center">
										<button
											onPointerDown={() => {
												setsearchParams(
													new URLSearchParams({
														chatId: toChatId(chatPartner.id, user?.id),
													})
												);
												setisOpen(false);
											}}
										>
											<Avatar
												name={chatPartner.username}
												src={chatPartner.image}
											/>
											<span>{chatPartner.username}</span>
										</button>
									</li>
								);
							})}
						</ul>
					)}
					{isValidating && <PulseLoader color="rgb(var(--neutral-revert))" />}
					{!isValidating && results.length === 0 && (
						<div className=" flex gap-4  items-center px-4 ">no user found</div>
					)}
				</section>
			)}
		</>
	);
};
