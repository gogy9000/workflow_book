import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    try {
      const user = await this.validateUser(dto);
      return this.generateToken(user);
    } catch (e) {
      throw e;
    }
  }

  async register(dto: CreateUserDto) {
    const candidate = await this.userService.getByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.create({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken({ email, id, roles }: User) {
    const payload = { email, id, roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (passwordEquals) {
      return user;
    } else {
      throw new UnauthorizedException({ message: 'пользователь не найден' });
    }
  }
}
