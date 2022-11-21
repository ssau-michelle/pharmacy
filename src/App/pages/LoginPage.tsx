import { Button, Heading, Pane, TextInput } from "evergreen-ui";
import logo from "../../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/search");
  };

  return (
    <Pane
      display="flex"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <form onSubmit={onSubmit}>
        <Pane display="flex" flexDirection="column" gap={20}>
          <Pane textAlign="center">
            <img src={logo} alt="Logo" />

            <Heading is="h1" size={900}>
              Моя аптека
            </Heading>
          </Pane>

          <Pane display="flex" flexDirection="column" gap={8}>
            <TextInput name="login" placeholder="Логин" />
            <TextInput name="password" placeholder="Пароль" />
          </Pane>

          <Pane
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={8}
          >
            <Button type="submit" appearance="primary" width="100%">
              Войти
            </Button>

            <Link to="/register">Зарегистироваться</Link>
          </Pane>
        </Pane>
      </form>
    </Pane>
  );
};

export default LoginPage;
