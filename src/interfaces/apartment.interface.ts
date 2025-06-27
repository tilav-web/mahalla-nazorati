import type { IVillage } from "./location/village.interface";

export interface IApartment {
  id: number;
  name: string;
  village: IVillage;
  area: number;
}
