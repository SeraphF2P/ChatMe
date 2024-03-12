import { PropsWithChildren, createContext } from "react";
import useSWR from "swr";
import { useAuthContext } from "../hooks/useAuthContext";
import { Tables } from "../server/database.types";
import { supabase } from "../server/supabase";

export type User = Tables<"User">;
export type ChatType = Omit<Tables<"_chats">, "user"> & { user: User };
export type MessageType = Tables<"Message">;

export const UserContext = createContext({});

export const UserProvider = ({ children }: PropsWithChildren) => {
	const { session } = useAuthContext();
	const getUser = async () => {
		return await supabase.from("User").select("*").eq("id", session?.user.id);
	};

	const { data } = useSWR<{ data: User[] | null }>(session && "user", getUser, {
		onError: (err) => {
			console.error(err);
		},
	});
	const user = data?.data ? data?.data[0] : null;

	const getChats = async () => {
		const chats = await supabase
			.from("_chats")
			.select("chat")
			.eq("user", user?.id);
		if (!chats.data) return;
		const chatIds = chats.data.map((chat) => chat.chat);
		const promises = await Promise.all(
			chatIds.map(async (id) => {
				return await supabase
					.from("_chats")
					.select("* , user (*)")
					.neq("user", user?.id)
					.eq("chat", id);
			})
		);
		return promises.flatMap((res) => res.data) as ChatType[] | undefined;
	};
	const { data: chats } = useSWR(user && "chats", getChats);
	return (
		<UserContext.Provider value={{ user, chats }}>
			{children}
		</UserContext.Provider>
	);
};
