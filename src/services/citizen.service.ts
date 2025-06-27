import { privateInstance, privateInstanceFile } from "@/common/api/client-api";
import { ENDPOINTS } from "@/common/api/endpoints";

class CitizenService {
  async findAll() {
    try {
      const res = await privateInstance.get(ENDPOINTS.CITIZENS_FIND_ALL);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async findById(id: string) {
    try {
      const res = await privateInstance.get(ENDPOINTS.CITIZENS_FIND_BY_ID(id));
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async insertOne({
    first_name,
    last_name,
    middle_name,
    birthday,
    phone,
    gender,
    photo,
    marital_status,
    children_count,
    income_level,
    employment_status,
    house_ownership,
    is_at_risk,
    needs_support,
    under_supervision,
    village,
  }: {
    first_name: string;
    last_name: string;
    middle_name: string;
    birthday: string;
    phone: string;
    gender: "male" | "female";
    photo: File;
    marital_status: "oilali" | "uyalnmagan" | "beva" | "ajrashgan";
    children_count: number;
    income_level: "past" | "o'rta" | "yuqori";
    employment_status: "ishsiz" | "ishlaydigan" | "pensioner" | "talaba";
    house_ownership: "o'zida" | "ijarada" | "uysiz";
    is_at_risk: boolean;
    needs_support: boolean;
    under_supervision: boolean;
    village: string;
  }) {
    try {
      const res = await privateInstanceFile.post(ENDPOINTS.CITIZENS_FIND_ALL, {
        first_name,
        last_name,
        middle_name,
        birthday,
        phone,
        gender,
        photo,
        marital_status,
        children_count,
        income_level,
        employment_status,
        house_ownership,
        is_at_risk,
        needs_support,
        under_supervision,
        village,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByIdAndUpdate({
    first_name,
    id,
    last_name,
    middle_name,
    birthday,
    phone,
    gender,
    photo,
    marital_status,
    children_count,
    income_level,
    employment_status,
    house_ownership,
    is_at_risk,
    needs_support,
    under_supervision,
    village,
  }: {
    id: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    birthday?: string;
    phone?: string;
    gender?: "male" | "female";
    photo?: File;
    marital_status?: "oilali" | "uyalnmagan" | "beva" | "ajrashgan";
    children_count?: number;
    income_level?: "past" | "o'rta" | "yuqori";
    employment_status?: "ishsiz" | "ishlaydigan" | "pensioner" | "talaba";
    house_ownership?: "o'zida" | "ijarada" | "uysiz";
    is_at_risk?: boolean;
    needs_support?: boolean;
    under_supervision?: boolean;
    village?: string;
  }) {
    const res = await privateInstanceFile.put(
      ENDPOINTS.CITIZENS_FIND_BY_ID(id),
      {
        first_name,
        last_name,
        middle_name,
        birthday,
        phone,
        gender,
        photo,
        marital_status,
        children_count,
        income_level,
        employment_status,
        house_ownership,
        is_at_risk,
        needs_support,
        under_supervision,
        village,
      }
    );
    return res.data;
  }

  async findByIdAndDelete(id: string) {
    try {
      const res = await privateInstance.delete(
        ENDPOINTS.CITIZENS_FIND_BY_ID(id)
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const citizenService = new CitizenService();
