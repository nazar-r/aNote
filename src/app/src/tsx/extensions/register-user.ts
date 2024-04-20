export const registerUser = async (email: string, password: string) => {
  const res = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Sign up failed");

  console.log("SERVER RESPONSE:", data);
  console.log("ACCESS TOKEN:", data.accessToken);

  return data;
};