export interface OAuthUser {
  id: string;
  email: string;
  name?: string;
}

export type GoogleUser = OAuthUser;
export type GithubUser = OAuthUser;