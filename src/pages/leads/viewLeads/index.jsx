import { Container, Grid, Title } from "@mantine/core";
import axios from "axios";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import SelectMenu from "../../../components/SelectMenu";
import { useStyles } from "../styles";
import { Columns, filterbyStatus } from "./TableHeaders";
import DataGrid from "../../../components/Table";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import { UserContext } from "../../../contexts/UserContext";

const ViewLeads = () => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [blockedFilter, setBlockedFilter] = useState(null);

  const { status, isFetching } = useQuery(
    "fetchLeads",
    () => {
      return axios.get(import.meta.env.VITE_BACKEND_URL + "/leads", {
        headers: {
          authorization: user.token,
        },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.leads.map((item, index) => {
          return { ...item, serialNo: index + 1 };
        });
        setTableData(data);
      },
    }
  );
  const filteredItems = tableData.filter((item) => {
    if (blockedFilter === null)
      return item?.firstName?.toLowerCase().includes(search.toLowerCase());
    else
      return (
        item?.title?.toLowerCase().includes(search.toLowerCase()) &&
        item?.blocked === blockedFilter
      );
  });
  const handleClearFilters = () => {
    setSearch("");
    setBlockedFilter(null);
  };
  return (
    <Container size="xl" p="sm">
      <Title align="center" mb="lg" color="gray">
        Leads
      </Title>
      <Container size="xl" pb={"md"} bg={"white"} className={classes.table}>
        <Grid p="xs">
          <Grid.Col md="6" lg="3">
            <InputField
              placeholder={"Search Record"}
              leftIcon="search"
              value={search}
              onChange={(v) => setSearch(v.target.value)}
            />
          </Grid.Col>
          <Grid.Col sm="6" md={"6"} lg="4" style={{ textAlign: "end" }}>
            <SelectMenu
              placeholder={"Search By website"}
              data={[]}
              searchable
            />
          </Grid.Col>
          <Grid.Col sm="6" md="6" lg="3">
            <SelectMenu
              placeholder={"Filter by Status"}
              data={filterbyStatus}
              value={blockedFilter}
              onChange={setBlockedFilter}
            />
          </Grid.Col>

          <Grid.Col sm="6" md="3" lg={"2"} style={{ textAlign: "end" }}>
            <Button
              label={"Clear Filters"}
              variant="outline"
              onClick={handleClearFilters}
            />
          </Grid.Col>
        </Grid>
        <DataGrid
          columns={Columns}
          data={filteredItems}
          progressPending={status === "loading" || isFetching}
          type="product"
        />
      </Container>
    </Container>
  );
};

export default ViewLeads;
