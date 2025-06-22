interface CamNang {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

const fetchAPI = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const getDanhSachCamNang = async (): Promise<CamNang[]> => {
  return await fetchAPI("/cam-nang");
};

export const getCamNangChiTiet = async (id: string): Promise<CamNang> => {
  return await fetchAPI(`/cam-nang/${id}`);
};

export const taoCamNang = async (
  data: Omit<CamNang, "id" | "createdAt" | "updatedAt">
): Promise<CamNang> => {
  return await fetchAPI("/cam-nang", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const capNhatCamNang = async (
  id: string,
  data: Partial<CamNang>
): Promise<CamNang> => {
  return await fetchAPI(`/cam-nang/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const xoaCamNang = async (id: string): Promise<void> => {
  await fetchAPI(`/cam-nang/${id}`, {
    method: "DELETE",
  });
};
