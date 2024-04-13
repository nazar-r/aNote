import { loginUser } from "./fetching";
import { checkingEmailSyntax, checkingPassSyntax } from "./syntax-check";

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginError {
  email: string;
  password: string;
}

export const handleSubmit = async ({
  email,
  password,
}: LoginData): Promise<{ token?: string; error?: LoginError }> => {
  const emailError = email && !checkingEmailSyntax(email) ? "Incorrect Email!" : "";
  const passwordError = password && !checkingPassSyntax(password) ? "Paste at least 8 characters as password" : "";

  return emailError || passwordError
    ? { error: { email: emailError, password: passwordError } }
    : await loginUser(email, password)
        .then((token) => ({ token }))
        .catch((err: any) => ({ error: { email: "", password: err.message || "Login failed" } }));
};