export interface Car {
    _id?: string;
    licenseNumber: number
    owner: {
      _id: string,
      name: string
    }
    manufacturer: string;
    model: string;
    year: number;
    currentKM: number;
    updatedAt?: number
  }
  