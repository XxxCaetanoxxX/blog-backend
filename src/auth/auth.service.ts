import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { HashingService } from 'src/common/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService
  ) { }
  async login(loginDto: LoginDto) {

    const user = await this.userService.findByEmail(loginDto.email);

    const error = new UnauthorizedException('Usuário ou senha inválidos');

    if (!user) {
      throw error
    }

    const isPasswordvalid = await this.hashingService.compare(loginDto.password, user.password);

    if (!isPasswordvalid) {
      throw error
    }

    const jwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email
    }

    const accesstoken = await this.jwtService.signAsync(jwtPayload);

    user.forceLogOut = false;
    await this.userService.save(user);

    return { accesstoken };
  }
}
