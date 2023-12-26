'use client';
import React, { ReactNode, createContext, useContext } from "react";

const AuthContext = createContext<UserState | null>(null);

type UserState = {
 email: string;
 id: string;
 name: string;
 bio?: string;
 image: string;
}

export function AuthContextProvider({ user, children }: {
 user: UserState | null;
 children: ReactNode
}) {

 console.log('user from context', user);
 return <AuthContext.Provider value={user}>
  {children}
 </AuthContext.Provider>
}

export function useUser() {
 const context = useContext(AuthContext);
 if (context === undefined) {
  throw new Error("useUser must be used within a AuthContextProvider");
 }
 return context;
}