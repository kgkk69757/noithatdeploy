export interface DanhMucCamNang {
  id: number;
  tendanhmucbaiviet: string;
  slug: string;
  url: string;
}

export interface TrangCamNang {
  id: number;
  tieude: string;
  mota: string;
  anh_url: string;
  danhmuc: DanhMucCamNang;
  created_at: string;
  updated_at: string;
}
