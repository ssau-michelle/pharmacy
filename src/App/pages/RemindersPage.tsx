import { Heading, Pane, Paragraph, Spinner } from "evergreen-ui";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getReminders } from "../../api/reminders";
import { IReminder } from "../../types";

const RemindersList = ({ reminders }: { reminders: IReminder[] | null }) => {
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

  return <div>Rems</div>;
};

const RemindersPage = () => {
  const [reminders, setReminders] = useState<IReminder[] | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      console.error("No username found");
      return;
    }

    getReminders(username)
      .then(({ data }) => setReminders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Pane className="page">
      <Header type="reminders" />

      <Pane
        className="container"
        display="flex"
        flex={1}
        flexDirection="column"
      >
        <Heading size={800} marginBottom={16}>
          Мои напоминания
        </Heading>

        <RemindersList reminders={reminders} />
      </Pane>
    </Pane>
  );
};

export default RemindersPage;
