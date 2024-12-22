import { Dayjs } from "dayjs"

export interface Record {
    _id?: string;
    driver: {
      _id: string;
      name: string;
    };
    startKm: number;
    driveEndKm: number;
    startDate: Dayjs  | null;
    endDate: Dayjs  | null;
    destinationPoint: string;
    startingPoint: string;
    car: {
      ownerId: string;
      licenseNumber: number;
    };
    status: string,
    updatedAt?: number
  }