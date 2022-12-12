import Header from "../components/Header";
import { Alert, Button, Heading, Pane, TextInputField } from "evergreen-ui";
import { ChangeEvent, FormEvent, useState } from "react";
import { registerUser } from "../../api/user";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmitHandle = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (passwordRepeated !== password) {
      setError("Пароли не совпадают");
      return;
    }

    const body = {
      username,
      email,
      password,
    };
    registerUser(body)
      .then(() => navigate("/medicaments"))
      .catch((err) => console.error(err));
  };

  return (
    <Pane className="page">
      <Header />

      <Pane
        className="container"
        display="flex"
        flex={1}
        flexDirection="column"
      >
        <Heading size={800} marginBottom={80}>
          Регистрация
        </Heading>

        <Pane flex={1} display="flex" justifyContent="center">
          <form onSubmit={onSubmitHandle}>
            <Pane width={400}>
              <TextInputField
                name="login"
                label="Логин"
                required
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
              />

              <TextInputField
                name="email"
                type="email"
                label="Электронная почта"
                required
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />

              <TextInputField
                name="password"
                type="password"
                label="Пароль"
                required
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />

              <TextInputField
                name="passwordRepeated"
                type="password"
                label="Повторите пароль"
                required
                value={passwordRepeated}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPasswordRepeated(e.target.value)
                }
              />

              <Button
                width="100%"
                type="submit"
                appearance="primary"
                marginBottom={20}
                disabled={!username || !email || !password || !passwordRepeated}
              >
                Зарегистрироваться
              </Button>

              {error && <Alert intent="danger" title={error}></Alert>}
            </Pane>
          </form>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default RegisterPage;
