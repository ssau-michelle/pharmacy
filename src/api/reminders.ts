import axios from "axios";
import { IReminder } from "../types";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/remainders",
});

export const getReminders = (username: string) => {
  return instance.get(`/byUser/${username}`);
};

export const saveReminder = (body: IReminder) => {
  return instance.post("/saveRemainder", body);
};
