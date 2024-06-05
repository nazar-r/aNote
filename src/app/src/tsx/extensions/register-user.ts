const userRegistration = async (email: string, password: string) => {
  const res = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  localStorage.setItem("token", data.accessToken);

  console.log("SERVER RESPONSE:", data);
  console.log("ACCESS TOKEN:", data.accessToken);

  return data;
};

export default userRegistration