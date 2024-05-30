import { Record } from "@/interfaces/record"

export const records: Record[] = [
  {
    user: { _id: "user1", fullName: "John Doe" },
    startingKm: "10000",
    driveEndKm: "10542",
    date: "2024-05-30",
    destination: "New York City",
    startingPoint: "Los Angeles",
  },
  {
    user: { _id: "user2", fullName: "Jane Smith" },
    startingKm: "2500",
    driveEndKm: "3218",
    date: "2024-05-28",
    destination: "Chicago",
    startingPoint: "Miami",
  },
  {
    user: { _id: "user10", fullName: "Brandon Lee" },
    startingKm: "8765",
    driveEndKm: "9342",
    date: "2024-05-25",
    destination: "Seattle",
    startingPoint: "San Francisco",
  },
]