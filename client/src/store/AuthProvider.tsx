'use client';

import { createContext, useContext, useRef } from 'react'
import { useStore, create } from 'zustand'


const createStore = (user: any) =>
 create<{ user: any; setUser: any }>((set) => ({
  user,
  setUser: (user) => set({ user }),
 }))


const AuthContext = createContext(null)
export const useUser = (selector) => {
 if (!AuthContext) {
  throw new Error('Missing AuthContext')
 }
 const store = useContext(AuthContext)
 if (!store) {
  throw new Error('Missing StoreProvider')
 }
 return useStore(store, selector)
}
const AuthProvider = ({ user, children }: any) => {
 const storeRef = useRef()
 if (!storeRef.current) {
  storeRef.current = createStore(user);
 }
 return (
  <AuthContext.Provider value={storeRef.current}>
   {children}
  </AuthContext.Provider>
 )
}

export default AuthProvider;