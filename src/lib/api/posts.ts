export type Post = {
  id: number;
  tieudebaiviet: string;
  slug: string;
  img_url: string;
  img_alt: string;
  meta_title: string;
  meta_description: string;
  noidung: string;
  thu_tu_hien_thi: number;
  keyword?: string;
  canonical_url?: string;
  og_image_url?: string | null;
  danhmuc: {
    id: number;
    tendanhmucbaiviet: string;
    slug: string;
    thu_tu: number;
  };
  thes: Array<{
    id: number;
    tenthe: string;
    slug: string;
  }>;
  anhbaiviets?: Array<any>;
  created_at: string;
  created_at_full: string;
  updated_at: string;
};

export type PostCategory = {
  id: number;
  tendanhmucbaiviet: string;
  slug: string;
  thu_tu: number;
  baiviets_count: number;
  created_at: string;
  updated_at: string;
};

export type ApiResponse = {
  success: boolean;
  data: Post[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
};

export type CategoryDetail = {
  danhmuc: {
    id: number;
    tendanhmucbaiviet: string;
    slug: string;
  };
  baiviets: Post[];
};

// Dữ liệu mẫu cho categories
// const sampleCategories: PostCategory[] = [
//   {
//     id: 1,
//     tendanhmucbaiviet: "Phòng khách",
//     slug: "phong-khach",
//     baiviets_count: 15,
//   },
//   { id: 2, tendanhmucbaiviet: "Dịch vụ", slug: "dich-vu", baiviets_count: 12 },
//   { id: 3, tendanhmucbaiviet: "Nhà bếp", slug: "nha-bep", baiviets_count: 8 },
//   {
//     id: 4,
//     tendanhmucbaiviet: "Phòng ngủ",
//     slug: "phong-ngu",
//     baiviets_count: 6,
//   },
// ];

export async function fetchPosts(limit?: number): Promise<Post[]> {
  try {
    const url = limit
      ? `${import.meta.env.PUBLIC_API_BASE}/baiviets?per_page=${limit}`
      : `${import.meta.env.PUBLIC_API_BASE}/baiviets`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu bài viết");
    }
    const json: ApiResponse = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function fetchFeaturedPosts(): Promise<Post[]> {
  try {
    // Sử dụng endpoint baiviets với filter nổi bật (nếu có)
    const res = await fetch(
      `${import.meta.env.PUBLIC_API_BASE}/baiviets?featured=true&per_page=5`
    );
    if (!res.ok) {
      throw new Error("Lỗi khi fetch bài viết nổi bật");
    }
    const json: ApiResponse = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    // Fallback: lấy 3 bài viết đầu tiên
    const posts = await fetchPosts(3);
    return posts;
  }
}

export async function fetchPostsByCategory(
  categoryId: number
): Promise<Post[]> {
  try {
    const res = await fetch(
      `${import.meta.env.PUBLIC_API_BASE}/baiviets?danhmuc_id=${categoryId}`
    );
    if (!res.ok) {
      throw new Error("Lỗi khi fetch bài viết theo danh mục");
    }
    const json: ApiResponse = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
}

export async function fetchPostCategories(): Promise<PostCategory[]> {
  try {
    const res = await fetch(
      `${import.meta.env.PUBLIC_API_BASE}/danhmuc-baiviets`
    );
    if (!res.ok) {
      throw new Error("Lỗi khi fetch danh mục bài viết");
    }
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching post categories:", error);
    return [];
  }
}

// Function cho chi tiết bài viết - sử dụng API riêng
export async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${import.meta.env.PUBLIC_API_BASE}/baiviets/${slug}`
    );
    if (!res.ok) {
      throw new Error("Lỗi khi fetch chi tiết bài viết");
    }
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching post detail:", error);
    return null;
  }
}

// Function mới cho chi tiết danh mục theo slug
export async function fetchCategoryDetail(
  slug: string
): Promise<CategoryDetail | null> {
  try {
    const res = await fetch(
      `${import.meta.env.PUBLIC_API_BASE}/danhmuc-baiviets/${slug}`
    );
    if (!res.ok) {
      throw new Error("Lỗi khi fetch chi tiết danh mục");
    }
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching category detail:", error);
    return null;
  }
}

