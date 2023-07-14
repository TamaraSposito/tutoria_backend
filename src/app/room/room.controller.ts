import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { RoomResponseDto } from '@app/room/dto/room.response.dto';
import { CreateRoomDto } from '@app/room/dto/create-room.dto';
import { UpdateRoomDto } from '@app/room/dto/update-room.dto';
import { CreateRoomCommand, UpdateRoomCommand } from '@app/room/command';
import { GetAllRoomsQuery, GetRoomQuery } from '@app/room/query';
@ApiTags('Rooms')
@Controller('api/room')
@UseGuards(JwtAuthGuard)
export class RoomController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  @ApiOkResponse({
    type: RoomResponseDto,
  })
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<RoomResponseDto> {
    return await this.queryBus.execute(new GetRoomQuery(id));
  }
  @Get()
  @ApiOkResponse({
    type: RoomResponseDto,
    isArray: true,
  })
  async all(
    @Query('take') take: number,
    @Query('skip') skip: number,
  ): Promise<RoomResponseDto[]> {
    return await this.queryBus.execute(new GetAllRoomsQuery(take, skip));
  }
  @Post()
  @ApiOkResponse({
    type: RoomResponseDto,
  })
  async create(@Body() dto: CreateRoomDto): Promise<RoomResponseDto> {
    return await this.commandBus.execute(new CreateRoomCommand(dto));
  }

  @Put(':id')
  @ApiOkResponse({
    type: RoomResponseDto,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRoomDto,
  ): Promise<RoomResponseDto> {
    return await this.commandBus.execute(new UpdateRoomCommand(dto, id));
  }
}
