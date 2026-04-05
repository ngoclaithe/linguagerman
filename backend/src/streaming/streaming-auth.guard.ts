import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class StreamingAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Check Header first
    let token = this.extractTokenFromHeader(request);

    // If no header, check cookies
    if (!token) {
      token = (request as any).cookies?.access_token;
    }

    // If no cookie, check query param 'token'
    if (!token) {
      token = request.query.token as string;
    }

    if (!token) {
      throw new UnauthorizedException('Missing streaming token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      // Assign payload to request so we can use it in controllers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid streaming token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
