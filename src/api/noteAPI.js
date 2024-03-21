import { BASE_URL } from "./baseURL";

export async function _getNotes(token) {
  const result = await fetch(`${BASE_URL}/get-notes`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
}

export async function _newNote(token) {
  const result = await fetch(`${BASE_URL}/new-note`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ description: "new note..." }),
  });

  const data = await result.json();
  return data;
}
