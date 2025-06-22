export type ServiceGridItem = {
  id: number;
  vi_tri: string;
  trang_thai: boolean;
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
  };
};

export type BannerTitleSection = {
  id: number;
  banner_url: string;
  banner_alt: string;
  title: string;
  has_banner: boolean;
  has_title: boolean;
  updated_at: string;
  created_at: string;
};

export type BannerTitleSectionA = {
  id: number;
  banner_url: string;
  banner_alt: string;
  title: string;
  mota: string;
  has_banner: boolean;
  has_title: boolean;
  has_mota: boolean;
  updated_at: string;
  created_at: string;
};

export async function fetchServiceGrid(): Promise<ServiceGridItem[]> {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE}/service-grid`);
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu service grid");
    }
    const json = await res.json();
    return json.success
      ? json.data.filter((item: ServiceGridItem) => item.trang_thai)
      : [];
  } catch (error) {
    console.error("Error fetching service grid:", error);
    return [];
  }
}

export async function fetchBannerTitleSection(): Promise<BannerTitleSection | null> {
  try {
    const res = await fetch(
      `${import.meta.env.PUBLIC_API_BASE}/banner-title-section`
    );
    if (!res.ok) {
      throw new Error("Lỗi khi fetch banner title section");
    }
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching banner title section:", error);
    return null;
  }
}

export async function fetchBannerTitleSectionA(): Promise<BannerTitleSectionA | null> {
  try {
    const res = await fetch(
      `${import.meta.env.PUBLIC_API_BASE}/banner-title-section-a`
    );
    if (!res.ok) {
      throw new Error("Lỗi khi fetch banner title section A");
    }
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching banner title section A:", error);
    return null;
  }
}
