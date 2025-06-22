export interface Partner {
  id: number;
  name: string;
  logo_url: string;
  logo_alt: string;
  description?: string | null;
  website_url?: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function fetchPartners(): Promise<Partner[]> {
  const res = await fetch("http://127.0.0.1:8000/api/partners");
  if (!res.ok) throw new Error("Failed to fetch partners");
  const json = await res.json();
  return json.data as Partner[];
}
