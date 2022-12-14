import {
  AddIcon,
  Heading,
  IconButton,
  Pane,
  Paragraph,
  Spinner,
  Table,
  TrashIcon,
} from "evergreen-ui";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { apiGetReminders, deleteReminder } from "../../api/reminders";
import { IReminder } from "../../types";
import { useNavigate } from "react-router-dom";

interface IRemindersListProps {
  reminders: IReminder[] | null;
  onReminderDelete: (id: number) => void;
}

const RemindersList = ({
  reminders,
  onReminderDelete,
}: IRemindersListProps) => {
  if (!reminders)
    return (
      <Pane flex={1} display="flex" justifyContent="center" alignItems="center">
        <Spinner />
      </Pane>
    );

  if (!reminders.length)
    return (
      <Paragraph textAlign="center" size={500} marginTop={80}>
        Напоминаний не найдено
      </Paragraph>
    );

  return (
    <Table>
      <Table.Head paddingRight={0}>
        <Table.TextHeaderCell>Название</Table.TextHeaderCell>
        <Table.TextHeaderCell>Дозировка</Table.TextHeaderCell>
        <Table.TextHeaderCell>Время приёма</Table.TextHeaderCell>
        <Table.TextHeaderCell>Начало курса</Table.TextHeaderCell>
        <Table.TextHeaderCell>Окончание курса</Table.TextHeaderCell>
        <Table.TextHeaderCell></Table.TextHeaderCell>
      </Table.Head>

      <Table.Body>
        {reminders.map((r, index) => {
          const timeWithoutSecs = r.time?.slice(0, 5);

          return (
            <Table.Row key={index}>
              <Table.TextCell>{r.medicament.name}</Table.TextCell>
              <Table.TextCell isNumber>{r.count}</Table.TextCell>
              <Table.TextCell>{timeWithoutSecs}</Table.TextCell>
              <Table.TextCell>{r.startDate}</Table.TextCell>
              <Table.TextCell>{r.endDate}</Table.TextCell>

              <Table.Cell justifyContent="flex-end">
                <IconButton
                  onClick={() => onReminderDelete(r.id)}
                  icon={TrashIcon}
                  intent="danger"
                />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

const RemindersPage = () => {
  const [reminders, setReminders] = useState<IReminder[] | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    getReminders();
  }, []);

  const getReminders = () => {
    const username = localStorage.getItem("username");

    if (!username) {
      console.error("No username found");
      return;
    }

    apiGetReminders(username)
      .then(({ data }) => setReminders(data))
      .catch((err) => console.error(err));
  };

  const onReminderDelete = (id: number) => {
    deleteReminder(id)
      .then(() => getReminders())
      .catch((err) => console.error(err));
  };

  const onReminderAdd = () => {
    navigate("/reminders/create");
  };

  return (
    <Pane className="page">
      <Header type="reminders" />

      <Pane
        className="container"
        display="flex"
        flex={1}
        flexDirection="column"
      >
        <Pane display="flex">
          <Heading size={800} marginBottom={30} marginRight={16}>
            Мои напоминания
          </Heading>

          <IconButton
            icon={AddIcon}
            size="large"
            borderRadius="50%"
            onClick={onReminderAdd}
          />
        </Pane>

        <RemindersList
          reminders={reminders}
          onReminderDelete={onReminderDelete}
        />
      </Pane>
    </Pane>
  );
};

export default RemindersPage;
