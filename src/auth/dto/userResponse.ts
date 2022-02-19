export class UserResponse {
  readonly id?: number;
  readonly gitId?: string;
  readonly fullName: string;
  readonly avatarUrl: string;
  readonly userName: string;
  readonly token?: string;

  constructor(props: UserResponse) {
    this.userName = props.userName;
    this.avatarUrl = props.avatarUrl;
    this.fullName = props.fullName;
    this.gitId = props.gitId;
    this.token = props.token;
    this.id = props.id;
  }
}
