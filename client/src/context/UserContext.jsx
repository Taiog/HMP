import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async (accessToken) => {
    if (!accessToken) return;

    try {
      const response = await axios.get("http://localhost:3001/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "@HMP-app/userToken") {
        fetchUser(e.newValue);
      }
    };

    const accessToken = localStorage.getItem("@HMP-app/userToken");
    fetchUser(accessToken);

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};