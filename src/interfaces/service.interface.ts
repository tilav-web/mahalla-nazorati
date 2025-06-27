export interface IServiceCategory {
  id: number;
  title: string;
  name: string;
}

export interface IServiceDetail {
  category: IServiceCategory;
  description: string[];
  created_at: string;
  images: string[];
}

export interface IService {
  id: number;
  title: string;
  service: IServiceDetail;
  category_id: number;
  image_files: string[];
}

export interface IServicePaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IService[];
} 