import userRegistration from "./register-user";
import userLogin from "./login-user";
import * as types from "./types";
import { checkingEmailSyntax, checkingPassSyntax } from "./syntax-check";

const authFetching = async ({ email, password, buttonMode }: types.AuthData): Promise<{ token?: string; error: types.AuthErrors }> => {
  const routingButtons = async () =>
    buttonMode === "register"
      ? userRegistration(email, password)
      : userLogin(email, password);

  const emailError =
    email.length === 0
      ? "Email is required!"
      : !checkingEmailSyntax(email)
        ? "Incorrect email!"
        : "";

  const passwordError =
    password.length === 0
      ? "Password is required!"
      : !checkingPassSyntax(password)
        ? "Paste at least 8 characters as password!"
        : "";

  const checkingErrors = emailError || passwordError;

  return checkingErrors
    ? { error: { emailError, passwordError } }
    : await routingButtons();
};

export default authFetching;