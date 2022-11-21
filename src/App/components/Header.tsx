import { Button, Heading, Pane } from "evergreen-ui";
import logo from "../../images/logo.svg";

interface IProps {
  type?: "search" | "reminders";
}

const Header = ({ type }: IProps) => {
  return (
    <Pane border marginBottom={16}>
      <Pane
        className="container"
        display="flex"
        paddingY={16}
        alignItems="center"
        justifyContent="space-between"
      >
        <Pane display="flex" alignItems="center">
          <img src={logo} alt="Logo" width={60} />

          <Heading is="h1" size={900} marginLeft={8}>
            Моя аптека
          </Heading>
        </Pane>

        {type === "search" && (
          <Button appearance="primary">Мои напоминания</Button>
        )}

        {type === "reminders" && (
          <Button appearance="primary">Поиск лекарств</Button>
        )}
      </Pane>
    </Pane>
  );
};

export default Header;
