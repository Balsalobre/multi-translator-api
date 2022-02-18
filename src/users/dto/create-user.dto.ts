export class CreateUserDto {
  id?: number;
  gitId: number;
  fullName: string;
  avatarUrl: string;
  userName: string;
  token?: string;
}
