export { Company } from "./company";

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  bio?: string;
  image?: string;
  googleId?: string;
  appleId?: string;
  isAdmin?: boolean;
};

export type SafeUser = Omit<User, "password" | "isAdmin">;
