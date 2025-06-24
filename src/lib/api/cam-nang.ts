import type { TrangCamNang } from "../../types/cam-nang";

// Lấy thông tin trang cẩm nang
export async function fetchTrangCamNang(): Promise<TrangCamNang> {
  const response = await fetch(`${import.meta.env.PUBLIC_API_BASE}/trangcamnang`);

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await response.json();
  return data.data as TrangCamNang;
}
