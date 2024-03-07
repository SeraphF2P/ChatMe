import { useContext } from "react";
import { AuthContext } from "../contexts/AuthanticationProvider";

export function useAuthContext() {
  return useContext(AuthContext)
}