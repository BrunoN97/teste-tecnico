import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UniqueEmail } from '../validators/email-unique.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser nulo' })
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado está invalido' })
  @UniqueEmail({ message: 'Já existe o e-mail informado' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres' })
  password: string;
}
