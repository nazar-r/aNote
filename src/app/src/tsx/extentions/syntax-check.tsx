const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export const checkingEmailSyntax = (email: string) => emailRegex.test(email);
export const checkingPassSyntax = (password: string) => passwordRegex.test(password);

