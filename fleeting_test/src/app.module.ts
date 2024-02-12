import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/db.config.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    AuthenticationModule,
    TodoModule,
  ],
})
export class AppModule {}
