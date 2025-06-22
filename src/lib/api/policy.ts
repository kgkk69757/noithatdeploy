export type PolicyLink = {
  id: number;
  title: string;
  loai: string;
  id_nguon: number;
  detail: {
    id: number;
    tieu_de: string;
    slug: string;
    url: string;
  };
};

export type PolicyCategory = {
  id: number;
  ten_danh_muc: string;
  slug: string;
  thu_tu: number;
  links: PolicyLink[];
};

export async function fetchPolicies(): Promise<PolicyCategory[]> {
  try {
    const res = await fetch(
      `${import.meta.env.PUBLIC_API_BASE}/chinh-sach/full-structure`
    );
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu chính sách");
    }
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching policies:", error);
    return [];
  }
}
