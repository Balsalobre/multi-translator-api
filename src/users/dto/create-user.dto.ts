export class CreateUserDto {
  id?: number;
  gitId: string;
  fullName: string;
  avatarUrl: string;
  userName: string;
  provider: string;
  token?: string;
}
