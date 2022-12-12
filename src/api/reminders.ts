import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/remainders",
});

export const getReminders = (username: string) => {
  return instance.get(`/byUser/${username}`);
};
