export type FooterInfo = {
  logo: string;
  logo_alt: string;
  text: string;
  footer_title: string;
};

export async function fetchFooterInfo(): Promise<FooterInfo | null> {
  try {
    const res = await fetch(
      `${import.meta.env.PUBLIC_API_BASE}/footergioithieu`
    );
    if (!res.ok) {
      throw new Error("Lỗi khi fetch dữ liệu footer");
    }
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching footer info:", error);
    return null;
  }
}
