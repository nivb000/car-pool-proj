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
    carLicenseNumber: string
    status: string,
    updatedAt?: number
  }