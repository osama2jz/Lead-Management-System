import { Loader, SimpleGrid, Title, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import Card from "./Card";
import { Car, Flag } from "tabler-icons-react";

export const Dashboard = () => {
  const { user } = useContext(UserContext);
  const theme = useMantineTheme();
  const [data, setData] = useState([
    {
      label: "Total Leads",
      value: 0,
      icon: <Flag size={40} strokeWidth={1} />,
    },
    {
      label: "Total Leads",
      value: 0,
      icon: <Flag size={40} strokeWidth={1} />,
    },
    {
      label: "Total Leads",
      value: 0,
      icon: <Flag size={40} strokeWidth={1} />,
    },
    {
      label: "Total Leads",
      value: 0,
      icon: <Flag size={40} strokeWidth={1} />,
    },
  ]);

  const { status } = useQuery(
    "fetchDashboard",
    () => {
      return axios.get(backendUrl + "/api/v1/dashboard", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        setData(data);
      },
    }
  );
  return (
    <>
      <Title align="center" mb="lg" color="gray">
        Dashboard
      </Title>
      {/* {status === "loading" ? ( */}
      {false ? (
        <Loader style={{ width: "100%", margin: "auto" }} />
      ) : (
        <SimpleGrid
          spacing={"xl"}
          verticalSpacing={"xl"}
          cols={4}
          breakpoints={[{ maxWidth: "md", cols: 2, spacing: "md" }]}
        >
          {data.map((obj, ind) => (
            <Card key={ind} data={obj} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
