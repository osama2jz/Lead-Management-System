import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { createContext, useState } from "react";
import { useQuery } from "react-query";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({
    token,
  });

  const { status } = useQuery(
    "fetchProfile",
    () => {
      return axios.get(import.meta.env.VITE_BACKEND_URL + "/auth/my-profile", {
        headers: {
          authorization: user.token,
        },
      });
    },
    {
      onSuccess: (res) => {
        setUser((u) => ({ ...u, ...res.data }));
      },
      onError: () => {
        showNotification({
          title: "Error",
          message: "There was an error fetching your profile",
          color: "red",
        });
      },
    }
  );

  const value = { user, setUser, status };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
