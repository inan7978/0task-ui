import { BASE_URL } from "./baseURL";

export async function _uploadFile(token, formData) {
  const result = await fetch(`${BASE_URL}/add-file`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await result.json();
  return data;
}

export async function _getFiles(token, user) {
  const result = await fetch(`${BASE_URL}/user-files`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
}
