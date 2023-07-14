export class GetStudentQuery {
  constructor(public readonly id: string) {}
}

export class GetAllStudentsQuery {
  constructor(public readonly take: number, public readonly skip: number) {}
}
