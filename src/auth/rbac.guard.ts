import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
   
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(requiredRoles);
    
    if (!requiredRoles) {
      return true; // No roles required, allow access
    }
    
    const { user } = context.switchToHttp().getRequest();
  
    if (!user || !user.role || !this.matchRoles(requiredRoles, user.role)) {
      throw new UnauthorizedException('Unauthorized access');
    }

    return true;
  }

  private matchRoles(requiredRoles: string[], userRoles: string[]): boolean {
    return requiredRoles.some(role => userRoles.includes(role));
  }
}
