import { Button, Heading, Pane, Select, TextInputField } from "evergreen-ui";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getMedicament } from "../../api/pharmacies";
import { IMedicament } from "../../types";
import { saveReminder } from "../../api/reminders";

const CreateReminderPage = () => {
  const { medicamentId } = useParams();

  const [medicament, setMedicament] = useState<IMedicament | null>(null);
  const [count, setCount] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (!medicamentId) return;

    getMedicament(medicamentId)
      .then(({ data }) => setMedicament(data))
      .catch((err) => console.error(err));
  }, [medicamentId]);

  const onSubmitHandle = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = localStorage.getItem("username");
    if (!medicamentId || !username || !count || !startDate || !endDate) {
      console.error("Save reminder: Fields missing");
      return;
    }

    const body = {
      medicamentId: +medicamentId,
      count,
      startDate,
      endDate,
      username,
    };
    saveReminder(body)
      .then(() => navigate("/reminders"))
      .catch((err) => console.error(err));
  };

  return (
    <Pane className="page">
      <Header type="reminders" />

      <Pane className="container">
        <Heading size={800} marginBottom={80}>
          Создание напоминания
        </Heading>

        <Pane
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <form onSubmit={onSubmitHandle}>
            <Pane width={600}>
              <TextInputField
                className="reminder-field"
                display="flex"
                justifyContent="space-between"
                name="name"
                label="Название лекарства"
                value={medicament?.name}
              />

              <Pane display="flex" justifyContent="space-between" gap={50}>
                <TextInputField
                  className="dosage-field"
                  display="flex"
                  flex={1}
                  justifyContent="space-between"
                  name="count"
                  type="number"
                  label="Дозировка"
                  value={count}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCount(+e.target.value)
                  }
                />

                <Select defaultValue="таблетки" flex="none" width={200}>
                  <option>таблетки</option>
                </Select>
              </Pane>

              <TextInputField
                className="date-field"
                display="flex"
                justifyContent="space-between"
                name="startDate"
                type="date"
                label="Начало приёма"
                value={startDate}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setStartDate(e.target.value)
                }
              />

              <TextInputField
                className="date-field"
                display="flex"
                justifyContent="space-between"
                name="endDate"
                type="date"
                label="Окончание приёма"
                value={endDate}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEndDate(e.target.value)
                }
              />

              <Pane textAlign="end">
                <Button
                  type="submit"
                  appearance="primary"
                  width={120}
                  disabled={!medicamentId || !count || !startDate || !endDate}
                >
                  Создать
                </Button>
              </Pane>
            </Pane>
          </form>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default CreateReminderPage;
