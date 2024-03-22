import { BASE_URL } from "./baseURL";

export async function _createTask(token, description) {
  const response = await fetch(`${BASE_URL}/new-task`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      description: description,
    }),
  });

  const data = await response.json();

  return data;
}

export async function _deleteTask(token, toDelete) {
  const response = await fetch(`${BASE_URL}/delete-task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ toDelete: toDelete }),
  });

  const data = await response.json();

  return data;
}
