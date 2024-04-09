export interface notesData {
    content: string;
}

export type AuthToken = {
    token: string
};

export type ErrorResponse = {
    message: string | string[];
    error?: string;
};

export type ButtonConfig = {
    key: string;
    label: string;
    icon: React.ComponentType;
}

