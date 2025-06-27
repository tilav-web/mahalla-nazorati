import { privateInstance } from "@/common/api/client-api";
import { ENDPOINTS } from "@/common/api/endpoints";

class ApartmentService {
  async findAll() {
    try {
      const res = await privateInstance.get(ENDPOINTS.APARTMENTS_FIND_ALL);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async insertOne({
    name,
    village,
    area,
  }: {
    name: string;
    village: string;
    area: number;
  }) {
    try {
      const res = await privateInstance.post(ENDPOINTS.APARTMENTS_FIND_ALL, {
        name,
        village,
        area,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const res = await privateInstance.get(
        ENDPOINTS.APARTMENTS_FIND_BY_ID(id)
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByIdAndUpdate({
    id,
    name,
    village,
    area,
  }: {
    id: string;
    name: string;
    village: string;
    area: number;
  }) {
    try {
      const res = await privateInstance.put(
        ENDPOINTS.APARTMENTS_FIND_BY_ID(id),
        { name, village, area }
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByIdAndDelete(id: string) {
    try {
      const res = await privateInstance.delete(
        ENDPOINTS.APARTMENTS_FIND_BY_ID(id)
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getVillages() {
    try {
      const res = await privateInstance.get(ENDPOINTS.VILLAGES_FIND_ALL);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const apartmentService = new ApartmentService();
