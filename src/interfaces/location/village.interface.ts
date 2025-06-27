import type { IDistrict } from "./district.interface";

export interface IVillage {
  id: string;
  name: string;
  region?: string;
  district: IDistrict;
}
