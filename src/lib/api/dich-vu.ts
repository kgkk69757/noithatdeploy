// Định nghĩa interface cho dữ liệu trang dịch vụ
export interface TrangDichVu {
  id: number;
  tieude: string;
  mota: string;
  anh_url: string;
  baiviet: {
    id: number;
    danhmucbaiviet_id: number;
    tieudebaiviet: string;
    slug: string;
    img: string;
    img_alt: string;
    noidung: string;
    meta_title: string;
    meta_description: string;
    keyword: string;
    canonical_url: string;
    og_image: string | null;
    thu_tu_hien_thi: number;
    trangthai: boolean;
    created_at: string;
    updated_at: string;
    aloaibaiviet_id: number | null;
  };
}

export async function fetchTrangDichVu(): Promise<TrangDichVu | null> {
  try {
    const response = await fetch(`${import.meta.env.PUBLIC_API_BASE}/trang-dich-vu`, {
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store', // hoặc 'force-cache' nếu bạn muốn cache trên frontend
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return result ?? null;
  } catch (error) {
    console.error('Lỗi khi gọi API trang dịch vụ:', error);
    return null;
  }
}

