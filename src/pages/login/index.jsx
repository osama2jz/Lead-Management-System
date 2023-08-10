import { Container, Image } from "@mantine/core";
// import logo from "../../assets/logo.svg";
import InputField from "../../components/InputField";
import PassInput from "../../components/PassInput";
import { useForm } from "@mantine/form";
import Button from "../../components/Button";
import axios from "axios";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useMutation } from "react-query";
import { showNotification } from "@mantine/notifications";
import { routeNames } from "../../routes/routeNames";
import { useNavigate } from "react-router";
import { useStyles } from "./styles";

export const Login = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user?.token) {
      navigate(routeNames.general.dashboard);
    }
  }, [navigate, user]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (val) =>
        /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{0,6}$/i.test(val)
          ? null
          : "Please enter a valid email",
      password: (value) => (value?.length < 1 ? "Please enter password" : null),
    },
  });

  const handleLogin = useMutation(
    (values) => {
      return axios.post(
        `${import.meta.env.VITE_BACKEND_URL + "/auth/login"}`,
        values
      );
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: "Success",
          message: response?.data?.message || "Login Successful",
          color: "green",
        });
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem(
          "ttl",
          new Date().getTime() + 1000 * 60 * 60 * 24 * 30
        );
        setUser({ token: response?.data?.data?.token });
        form.reset();
        navigate(routeNames.general.dashboard);
      },
      onError: (err) => {
        showNotification({
          title: "Error",
          message: err?.response?.data?.message || "Login Failed",
          color: "red",
        });
      },
    }
  );
  return (
    <Container mih="100vh" className={classes.con}>
      <form
        className={classes.form}
        onSubmit={form.onSubmit(
          (values) => handleLogin.mutate(values)
          // navigate(routeNames.general.viewLoads)
        )}
      >
        <Image
          src={null}
          withPlaceholder
          width={"200px"}
          style={{ margin: "auto" }}
        />
        <InputField
          label={"Email"}
          placeholder={"example@email.com"}
          form={form}
          validateName={"email"}
        />
        <PassInput
          label={"Password"}
          placeholder={"******"}
          form={form}
          validateName={"password"}
        />
        <Button
          label={"Login"}
          type={"submit"}
          mt="md"
          loading={handleLogin.isLoading}
        />
      </form>
    </Container>
  );
};
