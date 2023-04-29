import { useState, useEffect, createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadSession() {
    const data = await fetch("/api/me", {
      method: "GET",
    }).then((res) => res.json());

    setUser(data);

    setLoading(false);
  }

  async function logOut() {
    const data = await fetch("/api/logout", {
      method: "GET",
    }).then((res) => res.json());

    console.log("logout api: "+ data);

    setUser(data);
  }

  useEffect(() => {
    loadSession();
  }, []);

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
  );
};
