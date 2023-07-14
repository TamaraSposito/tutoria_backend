import { UpdateRecordHandler } from '@app/record/command/handlers/update-record.handler';
import { CreateRecordHandler } from '@app/record/command/handlers/create-record.handler';

export const CommandHandlers = [CreateRecordHandler, UpdateRecordHandler];
