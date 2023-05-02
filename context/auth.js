import { useRouter } from "next/router"
import { useState, useEffect, createContext } from "react"

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function loadSession() {
    await fetch("/api/me", {
      method: "GET",
    })
    .then((res) => res.json())
    .then(res => setUser(res))
    .catch(err => setUser(null))

    setLoading(false)
  }

  async function logOut() {
    const data = await fetch(("/api/logout?t="+(new Date().getTime())), {
      method: "GET",
    }).then((res) => res.json())

    setUser(data)
  }

  useEffect(() => {
    loadSession()
  }, [])

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        logOut,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
