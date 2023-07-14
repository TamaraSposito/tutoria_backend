export class GetRoomQuery {
  constructor(public readonly id: string) {}
}

export class GetAllRoomsQuery {
  constructor(public readonly take: number, public readonly skip: number) {}
}
