import { Button, Heading, Pane } from "evergreen-ui";
import logo from "../../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";

interface IProps {
  type?: "search" | "reminders";
}

const Header = ({ type }: IProps) => {
  const navigate = useNavigate();

  const onRemindersClickHandle = () => {
    navigate("/reminders");
  };

  const onMedicamentsClickHandle = () => {
    navigate("/medicaments");
  };

  return (
    <Pane border marginBottom={16}>
      <Pane
        className="container"
        display="flex"
        paddingY={16}
        alignItems="center"
        justifyContent="space-between"
      >
        <Pane display="flex" flexDirection="column">
          <Pane display="flex" alignItems="center">
            <img src={logo} alt="Logo" width={60} />

            <Heading is="h1" size={900} marginLeft={8}>
              Моя аптека
            </Heading>
          </Pane>

          <Link to="/help">О системе</Link>
        </Pane>

        {type === "search" && (
          <Button appearance="primary" onClick={onRemindersClickHandle}>
            Мои напоминания
          </Button>
        )}

        {type === "reminders" && (
          <Button appearance="primary" onClick={onMedicamentsClickHandle}>
            Поиск лекарств
          </Button>
        )}
      </Pane>
    </Pane>
  );
};

export default Header;
