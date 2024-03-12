import { useContext } from "react";
import { ChatType, User, UserContext } from "../contexts/UserProvider";

type useUserContextType = {
  user: User;
  chats: ChatType[] | undefined;
}
export function useUserContext(): useUserContextType;
export function useUserContext() {
  if (UserContext == null) {
    throw new Error("useUserContext can only be used inside userContext")
  }
  return useContext(UserContext);
}