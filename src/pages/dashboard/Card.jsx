import { Container, Flex, Stack, Text } from "@mantine/core";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../routes/routeNames";
import { Box } from "tabler-icons-react";

const Card = ({ data }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Flex align={"center"} justify={"space-between"} className={classes.card}>
      <Stack>
        <Text fz={20} fw={600} align="center">
          {data?.label}
        </Text>
        <Text fz={24} fw={500}>
          {data?.value}
        </Text>
      </Stack>

      {data.icon}
    </Flex>
  );
};
export default Card;
