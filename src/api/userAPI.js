import { BASE_URL } from "./baseURL";

export async function _loadInfo(token) {
  const result = await fetch(`${BASE_URL}/GET-INFO-USER`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
}

export async function _updateUser(token, newInfo) {
  const result = await fetch(`${BASE_URL}/PUT-USER`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newInfo),
  });

  const data = await result.json();
  return data;
}
