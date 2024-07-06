import { User } from "@/schema/user.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";

interface JwtPayload {
  userId: string;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepositry : Repository<User>  
  ) {
    
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }

  async validate(payload: JwtPayload) {
   
    const { userId } = payload;
     const user = await this.userRepositry.findOneBy({id : userId})
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    const now = Date.now() / 1000;
    if (payload.exp && payload.exp < now) {
      throw new UnauthorizedException("Token expired");
    }
  console.log("user logged in", user ? true : false);
  
    return user;
  }
}
