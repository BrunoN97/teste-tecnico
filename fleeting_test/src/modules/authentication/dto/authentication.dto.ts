import { IsEmail, MinLength } from 'class-validator';

export class AutenticationDto {
  @IsEmail(undefined, { message: 'O e-mail informado está invalido' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres' })
  password: string;
}
