export interface IManufacturer {
  id: number;
  name: string;
  country: string;
}

export interface IMedicament {
  id: number;
  name: string;
  activeSubstance: string;
  category: {
    name: string;
  };
  manufacturer: IManufacturer;
  releaseForm: {
    id: number;
    name: number;
  };
}

export interface IMedicamentSearchResult {
  medicament: IMedicament;
  minPrice: number;
  pharmacyCount: number;
}

export interface IAvailability {
  id: number;
  price: number;
  medicamentCount: {
    id: number;
    count: string;
  };
  medicamentDosage: string;
  pharmacyAddress: {
    id: string;
    address: string;
    pharmacy: {
      id: number;
      name: string;
      site: string;
    };
  };
}
