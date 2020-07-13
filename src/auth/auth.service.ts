import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await this.validateHash(password, user.password))) return user;

    return null;
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user)
      throw new HttpException(
        'Não autorizado. Verifique suas credenciais.',
        HttpStatus.UNAUTHORIZED,
      );

    const userAuthenticated = {
      key: user._id,
      name: `${user.firstName} ${user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      type: user.type,
    };

    return this.generateAccess(userAuthenticated);
  }

  generateAccess(userAuthenticated) {
    return {
      access_token: this.jwtService.sign(userAuthenticated),
      user: userAuthenticated,
    };
  }

  async validateHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
