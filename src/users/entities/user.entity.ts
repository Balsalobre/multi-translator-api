export interface IUser {
  gitId?: string;
  fullName: string;
  avatarUrl: string;
  userName: string | null;
  provider: string;
  hashedRefreshToken?: string;
}
