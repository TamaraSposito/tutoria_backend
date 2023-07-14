import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe, Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserResponseDto } from '@app/user/dto/user.response.dto';
import {GetAllUsersQuery, GetMeUserQuery, GetUserQuery} from '@app/user/query';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import {CreateUserCommand, UpdatePasswordCommand, UpdateUserCommand} from '@app/user/command';
import { UpdateUserDto } from '@app/user/dto/update-user.dto';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import {UpdatePasswordUserDto} from "@app/user/dto/update-password.dto";

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('api/user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  @ApiOkResponse({
    type: UserResponseDto,
  })
  @ApiResponse({ type: UserResponseDto })
  async get(@Param('id', ParseUUIDPipe) id: string) {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @Get('me/info')
  @ApiOkResponse({
    type: UserResponseDto,
  })
  @ApiResponse({ type: UserResponseDto })
  async me() {
    return this.queryBus.execute(new GetMeUserQuery());
  }

  @Get()
  @ApiOkResponse({
    type: UserResponseDto,
    isArray: true,
  })
  @ApiResponse({ type: UserResponseDto })
  async all(@Query('take') take: number, @Query('skip') skip: number) {
    return this.queryBus.execute(new GetAllUsersQuery(take, skip));
  }
  @Post()
  @ApiOkResponse({
    type: UserResponseDto,
  })
  @ApiResponse({ type: UserResponseDto })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.commandBus.execute(new CreateUserCommand(dto));
  }

  @Patch(':id')
  @ApiOkResponse({
    type: UserResponseDto,
  })
  @ApiResponse({ type: UserResponseDto })
  async pass(
      @Body() dto: UpdatePasswordUserDto,
  ): Promise<UserResponseDto> {
    return this.commandBus.execute(new UpdatePasswordCommand(dto));
  }

  @Put(':id')
  @ApiOkResponse({
    type: UserResponseDto,
  })
  @ApiResponse({ type: UserResponseDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.commandBus.execute(new UpdateUserCommand(dto, id));
  }
}
