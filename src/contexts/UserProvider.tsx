import { PropsWithChildren, createContext, useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import { useAuthContext } from "../hooks/useAuthContext";
import { Loading } from "../pages/Loading";
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

	const { data, isValidating } = useSWRImmutable<{
		data: User[] | null;
	}>(session && "user", getUser, {
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
	const { data: chats, mutate: mutateChats } = useSWRImmutable(
		user && "chats",
		getChats
	);
	useEffect(() => {
		if (!user) return;
		const channel = supabase
			.channel(user.id + "-" + "chats")
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: `_chats`,
					filter: `user=eq.${user?.id}`,
				},
				() => {
					mutateChats();
					Notification.requestPermission().then((perm) => {
						if (perm === "granted") {
							let notification: Notification | undefined;
							if (!notification) {
								console.log("notify");
								notification = new Notification(`message received`, {
									tag: "new chat mate!",
									body: `someone want to chat with you`,
								});
							} else if (notification) {
								notification.close();
							}
						}
					});
				}
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, [mutateChats, user]);
	return (
		<UserContext.Provider value={{ user, chats }}>
			{isValidating && !user ? <Loading /> : children}
		</UserContext.Provider>
	);
};
