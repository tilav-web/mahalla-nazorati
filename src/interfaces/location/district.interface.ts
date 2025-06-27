import type { IRegion } from "./region.interface";

export interface IDistrict {
  id: string;
  name: string;
  region: IRegion;
}
