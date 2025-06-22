export type ServiceCard = {
  id: number;
  thu_tu: number;
  baiviet: {
    id: number;
    tieudebaiviet: string;
    slug: string;
    img_url: string;
    img_alt: string;
    meta_title: string;
    meta_description: string;
    noidung_excerpt: string;
    url: string;
    created_at: string;
  };
};

export async function fetchServiceCards(): Promise<ServiceCard[]> {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE}/service-cards`);
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu service cards");
    }
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching service cards:", error);
    return [];
  }
}
