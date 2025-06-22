// src/lib/phone.ts
export type Phone = {
  id: number;
  number: string;
  name: string;
};

export async function fetchPhones(): Promise<Phone[]> {
  const res = await fetch(`${import.meta.env.PUBLIC_API_BASE}/phones/active`);
  if (!res.ok) {
    throw new Error('Lỗi khi fetch dữ liệu phone');
  }
  const json = await res.json();
  return json.data;
}