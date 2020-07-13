import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email Inválido' })
  email: string;

  @IsNotEmpty({ message: 'Senha inválida' })
  password: string;
}
