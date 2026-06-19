import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async login(dto: LoginDto): Promise<User> {
    const user = await this.users
      .createQueryBuilder('u')
      .where('LOWER(u.email) = LOWER(:email)', { email: dto.email })
      .getOne();
    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
  }

  async register(dto: CreateUserDto): Promise<User> {
    // Permissive register: if email already exists, just return that user.
    // Matches the original frontend flow's "duplicate email → reuse existing".
    const existing = await this.users.findOne({ where: { email: dto.email } });
    if (existing) return existing;
    const user = this.users.create(dto);
    return this.users.save(user);
  }
}
