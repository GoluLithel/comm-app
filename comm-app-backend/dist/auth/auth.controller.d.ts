import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    login(dto: LoginDto): Promise<import("../users/user.entity").User>;
    register(dto: CreateUserDto): Promise<import("../users/user.entity").User>;
}
