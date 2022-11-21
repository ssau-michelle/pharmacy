import Header from "../components/Header";
import { Button, Heading, Pane, TextInputField } from "evergreen-ui";

const RegisterPage = () => {
  return (
    <Pane className="page">
      <Header />

      <Pane
        className="container"
        display="flex"
        flex={1}
        flexDirection="column"
      >
        <Heading size={800}>Регистрация</Heading>

        <Pane
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <form>
            <Pane width={400}>
              <TextInputField name="login" label="Логин" />
              <TextInputField
                name="email"
                type="email"
                label="Электронная почта"
              />
              <TextInputField name="password" type="password" label="Пароль" />
              <TextInputField
                name="passwordRepeated"
                type="password"
                label="Повторите пароль"
              />

              <Button width="100%" type="submit" appearance="primary">
                Зарегистрироваться
              </Button>
            </Pane>
          </form>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default RegisterPage;
