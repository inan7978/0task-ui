import { BASE_URL } from "./baseURL";

export async function _uploadFile(token, formData) {
  const response = await fetch(`${BASE_URL}/add-file`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();
  return data;
}
