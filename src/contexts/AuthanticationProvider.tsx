import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { supabase } from "../server/supabase";

export const AuthContext = createContext<{
	session: Session | null;
}>({
	session: null,
});

export const AuthanticationProvider = ({ children }: PropsWithChildren) => {
	const [session, setSession] = useState<Session | null>(null);
	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === "SIGNED_OUT") {
				setSession(null);
			} else if (session) {
				setSession(session);
			}
		});
		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
	);
};
