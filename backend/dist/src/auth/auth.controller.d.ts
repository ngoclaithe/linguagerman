import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import type { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto, response: Response): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
    }>;
    login(loginDto: LoginDto, response: Response): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
    }>;
    refresh(req: any, response: Response): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    private setAuthCookies;
    getProfile(req: any): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
    } | null>;
}
