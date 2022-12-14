import axios from "axios";

export interface IReminderSaveProps {
  startDate: string;
  endDate: string;
  count: number;
  time: string;
  medicamentId: number;
  username: string;
}

const instance = axios.create({
  baseURL: "http://localhost:4000/api/remainders",
});

export const apiGetReminders = (username: string) => {
  return instance.get(`/byUser/${username}`);
};

export const saveReminder = (body: IReminderSaveProps) => {
  return instance.post("/saveRemainder", body);
};

export const deleteReminder = (id: number) => {
  return instance.delete(`/deleteRemainder/${id}`);
};
