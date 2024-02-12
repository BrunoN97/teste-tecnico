import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from '../repository/user.repository';
import { EmailUniqueValidator } from './validators/email-unique.validator';
import { HashPasswordPipe } from 'src/pipe/hash-password.pipe';
import { TodoRepository } from '../repository/todo.repository';
import { TodoEntity } from '../todo/entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TodoEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    EmailUniqueValidator,
    HashPasswordPipe,
    TodoRepository,
  ],
  exports: [UserService],
})
export class UserModule {}
