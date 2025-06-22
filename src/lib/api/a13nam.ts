export type ExperienceSection = {
  id: number;
  experience_number: string;
  experience_title: string;
  experience_description: string;
  video_thumbnail_url: string;
  video_thumbnail_alt: string | null;
  youtube_video_id: string;
  youtube_video_url: string;
  section_active: boolean;
  has_video: boolean;
  has_custom_thumbnail: boolean;
  updated_at: string;
  created_at: string;
};

export type HorizontalCard = {
  id: number;
  thu_tu: number;
  trang_thai: boolean;
  baiviet: {
    id: number;
    tieudebaiviet: string;
    slug: string;
    img_url: string;
    img_alt: string;
    meta_description: string;
    link: string;
  };
};

export async function fetchExperienceSection(): Promise<ExperienceSection | null> {
  try {
    const res = await fetch(
      `${import.meta.env.PUBLIC_API_BASE}/experience-section`
    );
    if (!res.ok) {
      throw new Error("Lỗi khi fetch experience section");
    }
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching experience section:", error);
    return null;
  }
}

export async function fetchHorizontalCards(): Promise<HorizontalCard[]> {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE}/horizontal-cards`);
    if (!res.ok) {  
      throw new Error("Lỗi khi fetch dữ liệu horizontal cards");
    }
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching horizontal cards:", error);
    return [];
  }
}