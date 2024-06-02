import * as types from "./types";

const fetchingGithub = async (authToken: types.AuthToken) => {
  const res = await fetch("http://localhost:3000/auth/github", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: authToken }),
  });

  const data = await res.json();
  return data;
};

export default fetchingGithub;