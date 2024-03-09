import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { supabase } from "../server/supabase";
import { Session } from "@supabase/supabase-js";
import { Tables } from "../server/database.types";

type User = Tables<"users">;
export const AuthContext = createContext<{
	session: Session | null;
	user: User | null;
}>({
	session: null,
	user: null,
});

export const AuthanticationProvider = ({ children }: PropsWithChildren) => {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === "SIGNED_OUT") {
				setSession(null);
			} else if (session) {
				const user = await supabase
					.from("users")
					.select("*")
					.eq("id", session.user.id);
				if (user.data == null) throw new Error("User not found");
				setSession(session);
				setUser(user.data[0]);
			}
		});
		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ session, user }}>
			{children}
		</AuthContext.Provider>
	);
};
