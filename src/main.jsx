import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Notifications } from "@mantine/notifications";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      cacheTime: 30000,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        theme={{
          colors: {
            primary: [
              "#F8F0FC",
              "#F3D9FA",
              "#EEBEFA",
              "#E599F7",
              "#DA77F2",
              "#CC5DE8",
              "#BE4BDB",
              "#AE3EC9",
              "#9C36B5",
              "#862E9C",
            ],
          },
          primaryColor: "primary",
          globalStyles: () => ({
            ".mantine-Modal-title": {
              margin: "auto",
              fontWeight: "bold",
              color: "rgb(0,0,0,0.5)",
            },
          }),
        }}
      >
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <Notifications position="top-center" />
            <App />
          </UserProvider>
        </QueryClientProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
