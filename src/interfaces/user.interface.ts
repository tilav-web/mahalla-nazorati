import type { Roles } from "@/private/private-route";
import type { IVillage } from "./location/village.interface";

export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  jshshir: number;
  birthday: string; // ISO date string
  gender: "male" | "female";
  address: string;
  phone: string;
  nation: number;
  photo: string;
  position: string;
  rank: string;
  role: Roles;
  village: IVillage;
  work_addres: string;
}
