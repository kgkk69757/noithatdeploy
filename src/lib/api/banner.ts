export type Banner = {
  id: number;
  title: string;
  description: string;
  image: string;
  image_url: string;
  link: string;
  link_name: string;
  position: number | null;
  is_active: boolean;
  status_text: string;
  created_at: string;
  updated_at: string;
  created_at_formatted: string;
  updated_at_formatted: string;
};

export async function fetchBanners(): Promise<Banner[]> {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE}/banners`);
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu banner");
    }
    const json = await res.json();
    return json.data.filter((banner: Banner) => banner.is_active);
  } catch (error) {
    console.error("Error fetching banners:", error);
    // Trả về array rỗng thay vì fallback data
    return [];
  }
}
