import {
  Flex,
  Text,
  Title,
  useMantineTheme
} from "@mantine/core";

const ViewLead = ({ rowData }) => {
  const theme = useMantineTheme();
  return (
    <Flex direction={"column"} w={"100%"}>
      <Flex justify={"space-between"} align={"center"}>
        <Title order={3}>First Name</Title>
        <Text align="justify">{rowData?.firstName}</Text>
      </Flex>
      <Flex justify={"space-between"} align={"center"}>
        <Title order={3}>Last Name</Title>
        <Text align="justify">{rowData?.lastName}</Text>
      </Flex>
      <Flex justify={"space-between"} align={"center"}>
        <Title order={3}>Email</Title>
        <Text align="justify">{rowData?.email}</Text>
      </Flex>
      <Flex justify={"space-between"} align={"center"}>
        <Title order={3}>Phone Number</Title>
        <Text align="justify">{rowData?.phone}</Text>
      </Flex>
    </Flex>
  );
};
export default ViewLead;
