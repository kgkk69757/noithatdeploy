export interface Service {
  id: number;
  title: string;
  icon_image_url: string;
  icon_alt: string;
  description: string;
  fanpage_url: string;
  phone_number: string;
  aos_delay: number;
  sort_order: number;
}

export interface ApiResponse {
  success: boolean;
  data: Service[];
}

export async function fetchServices(): Promise<Service[]> {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/services');
    const result: ApiResponse = await response.json();
    
    if (result.success) {
      return result.data.sort((a, b) => a.sort_order - b.sort_order);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}