export interface SiteSettings {
  logo: { file_url: string; alt_text: string };
  favicon: { file_url: string; alt_text: string };
  site_name: string;
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const apiURL = `${import.meta.env.PUBLIC_API_BASE}/site-settings`;

  const response = await fetch(apiURL);
  if (!response.ok) {
    throw new Error("Không thể gọi API site settings.");
  }

  const { data } = await response.json();
  const { site_name, logo, favicon } = data;

  return { site_name, logo, favicon };
}