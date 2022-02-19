export class CreateUserDto {
  id?: number;
  gitId: string;
  fullName: string;
  avatarUrl: string;
  userName: string;
  token?: string;
}
