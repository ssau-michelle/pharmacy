import axios from "axios";
import { IAvailability, IMedicament, IMedicamentSearchResult } from "../types";

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

export const getAllAvailabilities = (id: string) => {
  return instance.get<IAvailability[]>(
    `/api/medicaments/getAllMedicamentAvailabilities/${id}`
  );
};

export const getAllMedicaments = () => {
  return instance.get<IMedicament[]>(`/api/medicaments/all`);
};
