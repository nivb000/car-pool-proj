export interface Record {
    _id?: string;
    driver: {
      _id: string;
      fullName: string;
    };
    startingKm: number;
    driveEndKm: number;
    date: Date;
    destinationPoint: string;
    startingPoint: string;
    car: number
  }