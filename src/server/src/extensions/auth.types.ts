import { VerifyCallback } from 'passport-google-oauth20';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

// export type GoogleUser = AuthUser;
// export type GithubUser = AuthUser;