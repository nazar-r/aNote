export type AuthData = {
    email: string;
    password: string;
    buttonMode: "register" | "login";
};

export type AuthErrors = {
    emailError: string;
    passwordError: string;
}

export type AuthToken = {
    token: string
};

export type SeverErrors = {
    serverError: string
}
export type ErrorResponse = {
    message: string;
    error: string;
};

export type ButtonConfig = {
    label: string;
    fetching: Function;
    callingBy: Function;
}