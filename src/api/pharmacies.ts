import axios from "axios";

export interface ISearchProps {
  name?: string;
  category?: string;
  activeSubstance?: string;
  manufacturerName?: string;
  country?: string;
  releaseForm?: string;
}

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

export const searchMedicaments = (query: ISearchProps) => {
  return instance.post("/api/medicaments/search", query);
};
