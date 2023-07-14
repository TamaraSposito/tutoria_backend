import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@app/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@app/auth/auth.module';
import { ConfigDatabase } from '@shared/database/config';
import { AuthMiddleware } from '@shared/middleware/auth.middleware';
import { RoomModule } from '@app/room/room.module';
import { StudentModule } from '@app/student/student.module';
import { RecordModule } from '@app/record/record.module';
import { RequestContextModule } from 'nestjs-request-context';
@Module({
  imports: [
    RequestContextModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ConfigDatabase()),
    UserModule,
    AuthModule,
    RoomModule,
    StudentModule,
    RecordModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
