import { useState, useEffect, createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [strapi, setStrapi] = useState(null);

  async function loadSession() {
    const data = await fetch("/api/me", {
      method: "GET",
    }).then((res) => res.json());

    setUser(data);

    setLoading(false);
  }

  async function logOut() {
    const data = await fetch(("/api/logout?time="+(new Date().getTime())), {
      method: "GET",
    }).then((res) => res.json());

    console.log("logout api: "+ data);

    setUser(data);
  }


  async function strapiData() {
    const data = await fetch("/api/strapi", {
      method: "GET",
    }).then((res) => res.json());

    setStrapi(data);
  }

  useEffect(() => {
    strapiData();
    loadSession();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        logOut,
        strapi
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
