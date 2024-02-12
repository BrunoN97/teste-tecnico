import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ValidateNested()
  @Type(() => UserEntity)
  loginId: UserEntity;

  @IsString()
  @IsNotEmpty({ message: 'Titulo não pode ser vazio' })
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Status não pode ser vazio' })
  @IsOptional()
  status: string;
}
