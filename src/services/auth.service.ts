import { privateInstance } from "@/common/api/client-api";
import { ENDPOINTS } from "@/common/api/endpoints";

class AuthService {
  async login({ username, password }: { username: string; password: string }) {
    try {
      const res = await privateInstance.post(ENDPOINTS.LOGIN, {
        username,
        password,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findMe() {
    try {
      const res = await privateInstance.get(ENDPOINTS.FIND_ME);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const authService = new AuthService();
