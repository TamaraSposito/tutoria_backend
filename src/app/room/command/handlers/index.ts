import { CreateRoomHandler } from '@app/room/command/handlers/create-room.handler';
import { UpdateRoomHandler } from '@app/room/command/handlers/update-room.handler';

export const CommandHandlers = [CreateRoomHandler, UpdateRoomHandler];
