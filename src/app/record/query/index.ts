export class GetRecordQuery {
  constructor(public readonly id: string) {}
}

export class GetAllRecordsQuery {
  constructor(
    public readonly take: number,
    public readonly skip: number,
    public readonly student: string,
  ) {}
}
