import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUser } from "../app/actions";

export async function useProtectedRoute() {
 const { user } = await getUser();
 const router = useRouter();
 useEffect(() => {
  if (!user) {
   router.push("/login");
  }
 }, [user]);
}