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

  const accessToken = localStorage.getItem("@HMP-app/userToken");
  console.log(accessToken)

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "@HMP-app/userToken") {
        fetchUser(e.newValue);
      }
    };
    
    fetchUser(accessToken);

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [accessToken]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};