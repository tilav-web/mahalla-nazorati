import React, { useEffect, useState } from "react";
import { serviceService } from "@/services/serivce.service";
import type { IService } from "@/interfaces/service.interface";

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await serviceService.list();
        setServices(data.results);
      } catch {
        setError("Xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <div>Yuklanmoqda...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Xizmatlar ro'yxati</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nomi</th>
            <th>Kategoriya</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.title}</td>
              <td>{service.service.category.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesPage;
