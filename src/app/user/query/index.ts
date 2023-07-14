export class GetUserQuery {
  constructor(public readonly id: string) {}
}

export class GetAllUsersQuery {
  constructor(public readonly take: number, public readonly skip: number) {}
}

export class GetMeUserQuery {}
