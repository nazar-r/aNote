const userLogin = async (email: string, password: string) => {
  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Перевіряємо, чи запит успішний
    if (!res.ok) {
      // Сервер повернув помилку (401, 400, 500 і т.д.)
      const errorData = await res.json(); // отримуємо текст помилки
      throw new Error(errorData.message || "Помилка авторизації");
    }

    const data = await res.json();

    localStorage.setItem("token", data.accessToken);

    console.log("SERVER RESPONSE:", data);
    console.log("ACCESS TOKEN:", data.accessToken);

    return data;
  } catch (err: any) {
    // Тут перехоплюємо помилки запиту
    console.error("Login error:", err.message);
    alert(err.message); // або показати під формою
  }
};

export default userLogin;