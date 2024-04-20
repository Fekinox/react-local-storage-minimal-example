import { createContext, useEffect, useState } from "react";
import { login, logout } from "../api/auth";

export const AuthContext = createContext(null)

export default function AuthContextComponent({ children }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  function refreshFromLocalStorage() {
    console.log('Refreshing from local storage...')
    if (!localStorage.getItem('loggedIn')) {
      setLoggedIn(false)
    }
    setLoggedIn(localStorage.getItem('loggedIn'))

    if (!localStorage.getItem('user')) {
      setUser(null)
    }
    setUser(localStorage.getItem('user'))
  }

  useEffect(refreshFromLocalStorage, [])
  
  async function signIn(name) {
    await login(name)
    refreshFromLocalStorage()
  }

  async function signOut(name) {
    await logout(name)
    refreshFromLocalStorage()
  }

  return (
    <AuthContext.Provider value={{ loggedIn, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
