import axios from "axios";
import { IMedicament, IMedicamentSearchResult } from "../types";

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
  return instance.post<IMedicamentSearchResult[]>(
    "/api/medicaments/search",
    query
  );
};

export const getMedicament = (id: string) => {
  return instance.get<IMedicament>(`/api/medicaments/byId/${id}`);
};
