import {
  AppShell,
  Burger,
  Container,
  Header,
  MediaQuery,
  Navbar,
  useMantineTheme,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SideBar } from "../components/Sidebar";
import { routeNames } from "../routes/routeNames";
import { Header as MyHeader } from "../components/Header";
import { UserContext } from "../contexts/UserContext";

// const now = Date.now();
const GeneralLayout = () => {
  const theme = useMantineTheme();
  const { user, status } = useContext(UserContext);
  const [opened, setOpened] = useState(false);

  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    setAllowed(checkedAllowed());
  }, [user?.toString()]);

  const checkedAllowed = () => {
    return user.token;
  };

  return allowed ? (
    <AppShell
      styles={{
        main: {
          background: "rgb(0,0,0,0.05)",
        },
      }}
      navbarOffsetBreakpoint="md"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="md"
          hidden={!opened}
          width={{ sm: 250, lg: 300 }}
        >
          <SideBar opened={opened} setOpened={setOpened} />
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <MyHeader />
          </div>
        </Header>
      }
    >
      <Container
        bg="white"
        m="auto"
        p="md"
        size={"xl"}
        mih={"77vh"}
        style={{ borderRadius: "10px" }}
      >
        {status === "loading" ? <div>Loading...</div> : allowed && <Outlet />}
      </Container>
    </AppShell>
  ) : (
    <Navigate to={routeNames.general.login} />
  );
};
export default GeneralLayout;
