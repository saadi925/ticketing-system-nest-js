import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { EmailService } from "./email-send.service";
import { JwtService } from "@nestjs/jwt";

import { EmailVerificationService } from "./email-verification.service";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "@/auth/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@/schema/user.entity";
import { EmailVerification } from "@/schema/email_verification.entity";

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User, EmailVerification])
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy,
    EmailService,
    // ,GoogleStrategy,
    JwtService, 
    EmailVerificationService,
  ],
  exports: [AuthService, EmailVerificationService],
})
export class AuthModule {}
