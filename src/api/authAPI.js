import { BASE_URL } from "./baseURL";

export async function login(email, password) {
  const getTokens = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  const data = await getTokens.json();
  return data;
}
