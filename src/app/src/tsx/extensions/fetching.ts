import userRegistration from "./register-user";
import userLogin from "./login-user";
import { checkingEmailSyntax, checkingPassSyntax } from "./syntax-check";

export interface AuthData {
  email: string;
  password: string;
  buttonMode: "register" | "login";
}

export interface AuthErrors {
  emailError: string;
  passwordError: string;
}

const authFetching = async ({ email, password, buttonMode }: AuthData): Promise<{ token?: string; error: AuthErrors }> => {
  const routingButtons = async () => (buttonMode === "register" ? userRegistration(email, password) : userLogin(email, password));
  const emailError = !!email ? "Email is required!" : !checkingEmailSyntax(email) ? "Incorrect Email!" : "";
  const passwordError = !!password ? "Password is required!" : !checkingPassSyntax(password) ? "Paste at least 8 characters as password" : "";
  const checkingErrors = emailError || passwordError;

  return checkingErrors ? { error: { emailError, passwordError } } : await routingButtons();
};

export default authFetching;