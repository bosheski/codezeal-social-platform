export { Company } from "./company";

export type User = {
  _id: string;
  email: string;
  password: string;
  name?: string;
  googleId?: string;
  appleId?: string;
  isAdmin?: boolean;
};

export type SafeUser = Omit<User, "password" | "isAdmin">;
