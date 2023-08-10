import { Container, Group, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import Button from "../../components/Button";
import PassInput from "../../components/PassInput";
import { UserContext } from "../../contexts/UserContext";
import { routeNames } from "../../routes/routeNames";

export const Settings = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPass: "",
    },

    validate: {
      oldPassword: (value) =>
        value?.length > 0 ? null : "Please enter old password",
      newPassword: (value) =>
        value?.length > 0 ? null : "Please enter new password",
      confirmPass: (value, values) =>
        value?.length > 0
          ? value === values.newPassword
            ? null
            : "Passwords do not match"
          : "Please enter confirm password",
    },
  });

  const handleChangePassword = useMutation(
    (values) => {
      return axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/change-password",
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
        {
          headers: {
            authorization: user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: "Success",
          message: response?.data?.message || "Password Changed Successfully",
          color: "green",
        });
        form.reset();
      },
      onError: (error) => {
        showNotification({
          title: "Error",
          message: error?.response?.data?.message || "Something went wrong",
          color: "red",
        });
      },
    }
  );
  return (
    <Container fluid>
      <Title align="center" mb="lg" color="gray">
        Settings
      </Title>
      <form
        onSubmit={form.onSubmit((values) =>
          handleChangePassword.mutate(values)
        )}
      >
        <PassInput
          label={"Old Password"}
          placeholder={"Enter Old Password"}
          form={form}
          withAsterisk
          validateName={"oldPassword"}
        />
        <PassInput
          label={"New Password"}
          placeholder={"Enter New Password"}
          form={form}
          withAsterisk
          validateName={"newPassword"}
        />
        <PassInput
          label={"Confirm Password"}
          placeholder={"Enter Confirm Password"}
          form={form}
          withAsterisk
          validateName={"confirmPass"}
        />

        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.landing)}
          />
          <Button
            label={"Save Settings"}
            type={"submit"}
            loading={handleChangePassword.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
