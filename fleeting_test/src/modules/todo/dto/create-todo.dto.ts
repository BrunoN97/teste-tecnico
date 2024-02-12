import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class CreateTodoDto {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  @Type(() => UserEntity)
  loginId: UserEntity;

  @IsString()
  @IsNotEmpty({ message: 'Titulo não pode ser vazio' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia ' })
  @MaxLength(1000, {
    message: 'Descrição não pode ter mais que 1000 caracteres',
  })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Titulo não pode ser vazio' })
  status: string;
}
