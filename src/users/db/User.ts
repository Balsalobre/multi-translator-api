import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  constructor(
    private readonly _name: string,
    private readonly _login: string,
    private readonly _avatar_url: string
  ) {
    super();
  }

  public get name(): string {
    return this._name;
  }

  public get login(): string {
    return this._login;
  }

  public get avatar_url(): string {
    return this._avatar_url;
  }
}
