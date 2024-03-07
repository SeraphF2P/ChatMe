import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../server/firebase";

export const AuthContext = createContext<{ currentUser: User | null }>({
	currentUser: null,
});

export const AuthanticationProvider = ({ children }: PropsWithChildren) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});

		return () => {
			unsub();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
};
