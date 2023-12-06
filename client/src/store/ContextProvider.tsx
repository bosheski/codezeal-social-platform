'use client';
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({});



export function AuthContextProvider({ user, children }: { user: {}, children: React.ReactNode }) {
 console.log('user from context', user);
 return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useUser() {
 const context = useContext(AuthContext);
 if (context === undefined) {
  throw new Error("useUser must be used within a AuthContextProvider");
 }
 return context;
}