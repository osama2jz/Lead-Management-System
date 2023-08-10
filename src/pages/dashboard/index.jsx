import { Loader, SimpleGrid, Title } from "@mantine/core";
import axios from "axios";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import Card from "./Card";

export const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([{}, {}, {}, {}]);

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
          verticalSpacing={"xl"}
          breakpoints={[{ minWidth: "sm", cols: 2 }]}
        >
          {data.map((obj, ind) => (
            <Card key={ind} data={obj} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
