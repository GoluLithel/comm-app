import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private readonly users;
    constructor(users: Repository<User>);
    login(dto: LoginDto): Promise<User>;
    register(dto: CreateUserDto): Promise<User>;
}
