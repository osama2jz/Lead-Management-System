import { Flex, Image, Text, Title } from "@mantine/core";
// import logo from "../../assets/logo.svg";
import { Logout } from "tabler-icons-react";
import { useNavigate } from "react-router";
import { routeNames } from "../../routes/routeNames";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const Header = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  return (
    <Flex
      w={"100vw"}
      style={{ color: "black" }}
      justify={"space-between"}
      align={"center"}
    >
      <Image src={null} withPlaceholder width={"100px"} />
      <Title order={3} color="purple">
        Admin Panel
      </Title>
      <Flex
        gap={"sm"}
        align={"center"}
        sx={{
          "&:hover": {
            cursor: "pointer",
            color: "red",
          },
        }}
        onClick={() => {
          localStorage.clear();
          setUser({});
          navigate(routeNames.general.login);
        }}
      >
        <Logout />
        <Text> Logout</Text>
      </Flex>
    </Flex>
  );
};
