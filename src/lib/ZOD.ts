import { z } from "zod";

const email = z.string().email().min(5, "email must be at least 5 charcters").max(30, "email can't exceed 30 charcters");
const username = z.string().min(3, "username must be at least 3 charcters").max(30, "username can't exceed 30 charcters");
export const ZOD = {
  auth: {
    signup: z.object({
      username,
      email,
      password: z.string()
        .min(8, "password must be between 8~20 charcters")
        .max(20, "password must be between 8~20 charcters")
      // .regex(/(?=.*[a-z])/g, "a small letter required")
      // .regex(/(?=.*\d)/g, "a number is required")
      // .regex(/(?=.*[A-Z])/g, "an uppercase letter is required")
      ,
      password_confirmation: z.string()
        .min(8, "password must be between 8~20 charcters")
        .max(20, "password must be between 8~20 charcters")
      // .regex(/(?=.*[a-z])/g, "a small letter is required")
      // .regex(/(?=.*\d)/g, "a number is required")
      // .regex(/(?=.*[A-Z])/g, "an uppercase letter is required")
      ,
    }).refine((data) => data.password === data.password_confirmation, {
      message: "Passwords don't match",
      path: ["password_confirmation"],
    }),
    login: z.object({
      email,
      password: z.string()
        .min(8, "password must be between 8~20 charcters")
        .max(20, "password must be between 8~20 charcters")
      // .regex(/(?=.*[a-z])/g, "a small letter required")
      // .regex(/(?=.*\d)/g, "a number is required")
      // .regex(/(?=.*[A-Z])/g, "an uppercase letter is required")
      ,
    })
  },

}