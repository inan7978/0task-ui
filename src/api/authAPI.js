import { BASE_URL } from "./baseURL";

export async function _login(email, password) {
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

export async function _register(email, pass) {
  const register = await fetch(`${BASE_URL}/register-new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, pass: pass }),
  });

  const data = await register.json();
  return data;
}

export async function _clearTokens(token, refreshToken) {
  const result = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
      accessToken: token,
    }),
  });

  const data = await result.json();
  return data;
}
