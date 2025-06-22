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

export type StatsCard = {
  id: number;
  title: string;
  number: string;
  description: string;
  color: string;
  thu_tu: number;
  trang_thai: boolean;
};

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

export async function fetchStatsCards(): Promise<StatsCard[]> {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE}/stats-cards`);
    if (!res.ok) {
      throw new Error("Lỗi khi fetch stats cards");
    }
    const json = await res.json();
    return json.success
      ? json.data
          .filter((card: StatsCard) => card.trang_thai)
          .sort((a: StatsCard, b: StatsCard) => a.thu_tu - b.thu_tu)
      : [];
  } catch (error) {
    console.error("Error fetching stats cards:", error);
    return [];
  }
}
