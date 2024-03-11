import { createClient } from "@supabase/supabase-js";
import { TablesInsert } from "./database.types";

export const supabase = createClient(
  import.meta.env.VITE_PROJECT_URL,
  import.meta.env.VITE_ANON_KEY
);

export const signUp = async ({ email, password }: { email: string, password: string }) => {

  return await supabase.auth.signUp({ email, password, phone: "-", })
}

export const logIn = async ({ email, password }: { email: string, password: string }) => {
  return await supabase.auth.signInWithPassword({ email, password })
}
export const signout = async () => {
  return await supabase.auth.signOut()
}
export const createUser = async (params: TablesInsert<"User">) => await supabase.from("users").insert({
  username: params.username,
  email: params.email,
});
