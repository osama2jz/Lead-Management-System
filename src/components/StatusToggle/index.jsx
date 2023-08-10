import { Badge, Loader, Menu } from "@mantine/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import { showNotification } from "@mantine/notifications";

const StatusToggle = ({ status, id, type, queryName }) => {
  const { user } = useContext(UserContext);
  const [blocked, setBlocked] = useState(status ? true : false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setBlocked(status);
  }, [status]);
  //to change status
  const handleStatusChange = useMutation(
    async () => {
      const link = backendUrl + `/api/v1/${type}/${id}`;
      return axios.patch(
        link,
        { blocked: !blocked },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
    },
    {
      onSuccess: (res) => {
        queryName && queryClient.invalidateQueries(queryName);
        setBlocked(blocked ? "unBlocked" : "Block");
        showNotification({
          title: "Success",
          message: `${type} status changed successfully`,
          color: "green",
        });
      },
      onError: (res) => {
        showNotification({
          title: "Error",
          message: `Something went wrong`,
          color: "red",
        });
      },
    }
  );

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
      styles={{ dropdown: { zIndex: 999 } }}
    >
      <Menu.Target>
        <Badge color={blocked ? "red" : "green"}>Not Contacted</Badge>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item color="green" onClick={() => handleStatusChange.mutate()}>
          Contacted
        </Menu.Item>
        <Menu.Item color="green" onClick={() => handleStatusChange.mutate()}>
          Not Contacted
        </Menu.Item>
        <Menu.Item color="green" onClick={() => handleStatusChange.mutate()}>
          No Response
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default StatusToggle;
