export declare class UpdateUserDto {
    name?: string;
    email?: string;
    bio?: string;
    avatar?: string;
    slug?: string;
    role?: string;
    password?: string;
}
export declare class UserResponseDto {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: Date;
}
