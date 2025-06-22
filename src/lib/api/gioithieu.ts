// Định nghĩa cấu trúc cho đối tượng "data"
interface CompanyInfoData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  extended_description: string;
  video_id: string;
  video_title: string | null; // Có thể là null
  is_active: boolean;
  youtube_url: string;
  youtube_embed_url: string;
  youtube_thumbnail: string;
  embed_code: string;
}

// Định nghĩa cấu trúc cho toàn bộ phản hồi API
interface ApiResponse {
  success: boolean;
  data: CompanyInfoData;
  generated_at: string;
}

export async function fetchCompanyInfo(): Promise<CompanyInfoData | null> {
  try {
    const res = await fetch(
      `${import.meta.env.PUBLIC_API_BASE}/company-info`
    );
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu company info");
    }
    const json: ApiResponse = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching company info:", error);
    return null;
  }
}