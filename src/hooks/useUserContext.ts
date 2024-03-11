import { useContext } from "react";
import { UserContext } from "../contexts/UserProvider";

export function useUserContext() {
  return useContext(UserContext)
}