export const getUsers = async () => {
  const res = await fetch("http://localhost:3000/users");

  if (!res.ok) throw new Error("Failed");

  return res.json();
};