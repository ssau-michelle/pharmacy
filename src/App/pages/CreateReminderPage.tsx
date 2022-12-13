import {
  Button,
  Combobox,
  Heading,
  Pane,
  Select,
  Spinner,
  TextInputField,
} from "evergreen-ui";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getAllMedicaments, getMedicament } from "../../api/pharmacies";
import { IMedicament } from "../../types";
import { saveReminder } from "../../api/reminders";

interface IMedicamentItem {
  id: string;
  label: string;
}

const CreateReminderPage = () => {
  const { medicamentId } = useParams();

  const [medicamentFromParam, setMedicamentFromParam] =
    useState<IMedicament | null>(null);
  const [medicamentItem, setMedicamentItem] = useState<IMedicamentItem | null>(
    null
  );
  const [medicamentItems, setMedicamentItems] = useState<
    IMedicamentItem[] | null
  >(null);
  const [count, setCount] = useState<number | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    getAllMedicaments()
      .then(({ data }) => {
        const items = data.map((m) => ({ id: m.id.toString(), label: m.name }));
        setMedicamentItems(items);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!medicamentId) return;

    getMedicament(medicamentId)
      .then(({ data }) => setMedicamentFromParam(data))
      .catch((err) => console.error(err));
  }, [medicamentId]);

  const onSubmitHandle = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = localStorage.getItem("username");
    if (
      !medicamentItem ||
      !username ||
      !count ||
      !time ||
      !startDate ||
      !endDate
    ) {
      console.error("Save reminder: Fields missing");
      return;
    }

    const body = {
      medicamentId: +medicamentItem.id,
      count,
      time,
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
              {medicamentItems &&
              (medicamentId ? medicamentFromParam : true) ? (
                <Combobox
                  openOnFocus
                  className="full-field"
                  initialSelectedItem={{
                    label: medicamentFromParam?.name,
                    id: medicamentFromParam?.id,
                  }}
                  items={medicamentItems}
                  itemToString={(item) => (item ? item.label : "")}
                  value={medicamentItem}
                  onChange={(selected) => setMedicamentItem(selected)}
                  marginBottom={24}
                />
              ) : (
                <Spinner size={24} />
              )}

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
                className="date-time-field"
                display="flex"
                justifyContent="space-between"
                name="time"
                type="time"
                label="Время приёма"
                value={time}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTime(e.target.value)
                }
              />

              <TextInputField
                className="date-time-field"
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
                className="date-time-field"
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
                  disabled={
                    !medicamentItem || !count || !time || !startDate || !endDate
                  }
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
