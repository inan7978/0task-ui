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
  console.log("User on front end: ", user);
  const result = await fetch(`${BASE_URL}/user-files`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user: user }),
  });

  const data = await result.json();
  return data;
}

export async function _deleteFile(token, key) {
  console.log("Key to delete: ", key);
  const result = await fetch(`${BASE_URL}/delete-file`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ deleteKey: key }),
  });

  const data = await result.json();
  return data;
}

export async function _downloadFile(token, key) {
  console.log("Requested file: ", key);
  const result = await fetch(`${BASE_URL}/download-file`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ toDownload: key }),
  });

  const data = await result.json();
  return data;
}
