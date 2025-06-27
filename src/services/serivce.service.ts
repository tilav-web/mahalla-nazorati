import { privateInstance } from "@/common/api/client-api";
import { ENDPOINTS } from "@/common/api/endpoints";
import type { IService, IServicePaginatedResponse } from "@/interfaces/service.interface";

class ServiceService {
  async list(params?: Record<string, unknown>): Promise<IServicePaginatedResponse> {
    const res = await privateInstance.get(ENDPOINTS.SERVICES_LIST, { params });
    return res.data;
  }

  async create(data: Partial<IService>): Promise<IService> {
    const res = await privateInstance.post(ENDPOINTS.SERVICES_CREATE, data);
    return res.data;
  }

  async read(id: string): Promise<IService> {
    const res = await privateInstance.get(ENDPOINTS.SERVICES_READ(id));
    return res.data;
  }

  async update(id: string, data: Partial<IService>): Promise<IService> {
    const res = await privateInstance.put(ENDPOINTS.SERVICES_UPDATE(id), data);
    return res.data;
  }

  async partialUpdate(id: string, data: Partial<IService>): Promise<IService> {
    const res = await privateInstance.patch(ENDPOINTS.SERVICES_PARTIAL_UPDATE(id), data);
    return res.data;
  }

  async delete(id: string): Promise<void> {
    await privateInstance.delete(ENDPOINTS.SERVICES_DELETE(id));
  }
}

export const serviceService = new ServiceService();
