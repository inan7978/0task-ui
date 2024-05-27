import { BASE_URL } from "./baseURL";

export async function _getTasks(token) {
  const response = await fetch(`${BASE_URL}/GET-TASKS`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
}
export async function _createTask(token, description) {
  const response = await fetch(`${BASE_URL}/POST-TASK`, {
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
  const response = await fetch(`${BASE_URL}/DELETE-TASK`, {
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

export async function _editTask(toEdit, newVal, token) {
  const result = await fetch(`${BASE_URL}/PUT-TASK`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ toEdit: toEdit, newVal: newVal }),
  });

  const data = await result.json();
  return data;
}

export async function _completeTask(toComplete, token) {
  const result = await fetch(`${BASE_URL}/PUT-COMPLETE`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ toComplete: toComplete }),
  });

  const data = await result.json();
  return data;
}

export async function _uncompleteTask(toUncomplete, token) {
  const result = await fetch(`${BASE_URL}/PUT-INCOMPLETE`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ toUncomplete: toUncomplete }),
  });

  const data = await result.json();
  return data;
}
