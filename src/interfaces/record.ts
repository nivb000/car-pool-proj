export interface Record {
    _id?: string;
    user: {
      _id: string;
      fullName: string;
    };
    startingKm: string;
    driveEndKm: string;
    date: string;
    destination: string;
    startingPoint: string;
  }  