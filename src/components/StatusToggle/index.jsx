import { Badge, Loader, Menu } from "@mantine/core";
import axios from "axios";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { UserContext } from "../../contexts/UserContext";
import { showNotification } from "@mantine/notifications";

const getMenuItems = (status, handleStatusChange) => {
  const menuItems = [];

  if (status !== "Not Contacted") {
    menuItems.push(
      <Menu.Item
        color={"red"}
        onClick={() => handleStatusChange.mutate("Not Contacted")}
        key={"Not Contacted"}
      >
        Not Contacted
      </Menu.Item>
    );
  }

  if (status !== "Contacted") {
    menuItems.push(
      <Menu.Item
        color={"green"}
        onClick={() => handleStatusChange.mutate("Contacted")}
        key={"Contacted"}
      >
        Contacted
      </Menu.Item>
    );
  }

  if (status !== "No Response") {
    menuItems.push(
      <Menu.Item
        color={"yellow"}
        onClick={() => handleStatusChange.mutate("No Response")}
        key={"No Response"}
      >
        No Response
      </Menu.Item>
    );
  }

  return menuItems;
};

// eslint-disable-next-line react/prop-types
const StatusToggle = ({ status, id, type, queryName }) => {
  const { user } = useContext(UserContext);
  // const [blocked, setBlocked] = useState(status ? true : false);
  const queryClient = useQueryClient();

  //to change status
  const handleStatusChange = useMutation(
    async (value) => {
      const link = import.meta.env.VITE_BACKEND_URL + `/${type}/${id}`;
      return axios.patch(
        link,
        { contactStatus: value },
        {
          headers: {
            authorization: user.token,
          },
        }
      );
    },
    {
      onSuccess: (res) => {
        console.log("success", res.data);
        queryName && queryClient.invalidateQueries(queryName);
        showNotification({
          title: "Success",
          message: `${type} status changed successfully`,
          color: "green",
        });
      },
      onError: () => {
        showNotification({
          title: "Error",
          message: `Something went wrong`,
          color: "red",
        });
      },
    }
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Contacted":
        return "green";
      case "No Response":
        return "yellow";
      case "Not Contacted":
        return "red";
      default:
        return "gray";
    }
  };

  if (handleStatusChange.isLoading) {
    return <Loader style={{ margin: "auto" }} size="sm" />;
  }

  return (
    <Menu
      trigger="hover"
      openDelay={100}
      closeDelay={400}
      position="bottom"
      style={{
        cursor: "pointer",
      }}
      withinPortal
    >
      <Menu.Target>
        <Badge color={getStatusColor(status)}>{status}</Badge>
      </Menu.Target>
      <Menu.Dropdown>{getMenuItems(status, handleStatusChange)}</Menu.Dropdown>
    </Menu>
  );
};

export default StatusToggle;
