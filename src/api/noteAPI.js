import { BASE_URL } from "./baseURL";

export async function _getNotes(token) {
  const result = await fetch(`${BASE_URL}/GET-NOTES`, {
    method: "GET",
    headers: {
      "Content-type": "application/json", // is this part really needed?
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
}

export async function _newNote(token) {
  const result = await fetch(`${BASE_URL}/POST-NOTE`, {
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

export async function _saveChanges(token, newNote, _id) {
  const result = await fetch(`${BASE_URL}/PUT-NOTE`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      noteId: _id,
      newValue: newNote,
    }),
  });

  const data = await result.json();
  return data;
}

export async function _deleteNote(token, _id) {
  const result = await fetch(`${BASE_URL}/DELETE-NOTE`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ toDelete: _id }),
  });

  const data = await result.json();
  return data;
}
