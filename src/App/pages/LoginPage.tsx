import { Alert, Button, Heading, Pane, Text, TextInput } from "evergreen-ui";
import logo from "../../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { authUser } from "../../api/user";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmitHandle = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const body = {
      username,
      password,
    };
    authUser(body)
      .then(() => navigate("/medicaments"))
      .catch((err) => {
        setError(err.response.data.message);
        console.error(err);
      });
  };

  return (
    <Pane
      display="flex"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <form onSubmit={onSubmitHandle}>
        <Pane display="flex" flexDirection="column" gap={20}>
          <Pane textAlign="center">
            <img src={logo} alt="Logo" />

            <Heading is="h1" size={900}>
              Моя аптека
            </Heading>
          </Pane>

          <Pane display="flex" flexDirection="column" gap={8}>
            <TextInput
              name="login"
              placeholder="Логин"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />

            <TextInput
              name="password"
              placeholder="Пароль"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </Pane>

          <Pane
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={8}
          >
            <Button
              type="submit"
              appearance="primary"
              width="100%"
              disabled={!username || !password}
            >
              Войти
            </Button>

            <Link to="/register">
              <Text>Зарегистироваться</Text>
            </Link>

            {error && <Alert intent="danger" title={error}></Alert>}
          </Pane>
        </Pane>
      </form>
    </Pane>
  );
};

export default LoginPage;
