import type { ILeave } from "./leave.interface";
import type { IVillage } from "./location/village.interface";
import type { IPersonalStatus } from "./personal-status.interface";

export interface ICitizen {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  birthday: string;
  phone: string;
  gender: string;
  photo: string;
  marital_status: string;
  children_count: number;
  income_level: string;
  employment_status: string;
  house_ownership: string;
  is_at_risk: boolean;
  needs_support: boolean;
  under_supervision: boolean;
  village: IVillage;
  leave: ILeave[];
  personal_status: IPersonalStatus[];
  apartment: string;
}
