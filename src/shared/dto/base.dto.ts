import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class BaseDto {
  @Expose()
  @IsUUID()
  @IsOptional()
  public id: string = null;

  constructor(params = {}) {
    Object.keys(params)
      .filter((key) => key in this)
      .map((key) => (this[key] = params[key]));
  }
}
