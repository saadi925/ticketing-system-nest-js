import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignupDto } from "./dto/auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "@/schema/user.entity";
import * as argon2 from "argon2";
import { EmailVerificationService } from "./email-verification.service";

interface JwtPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly jwtService: JwtService
  ) {}

  async signup(data: SignupDto): Promise<{ success: boolean; email: string }> {
    try {
      const user = await this.userRepository.findOneBy({ email: data.email });

      if (user) {
        throw new UnauthorizedException("Email already exists");
      }

      const hashedPassword = await argon2.hash(data.password);

      const newUser = this.userRepository.create({
        email: data.email,
        password: hashedPassword,
        verified: true,
        role : 'admin',
        name: data.name,
        username : await this.generateUsername(data.name)
      });

      await this.userRepository.save(newUser);

      // const verificationCode = Math.floor(
      //   100000 + Math.random() * 900000
      // ).toString();
      // console.log("verificationCode : ", verificationCode);

      // await this.emailVerificationService.generateVerificationCode(
      //   newUser.id,
      //   verificationCode,
      //   data.email
      // );

      return { success: true, email: data.email };
    } catch (error) {
      throw error;
    }
  }

  private async generateUsername(name: string) {
    const baseUsername = name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    let username = baseUsername;
    let count = 1;

    while (await this.userRepository.findOneBy({ username })) {
      username = `${baseUsername}-${count}`;
      count++;
    }

    return username;
  }

  async signin(email: string, password: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (!user || !(await argon2.verify(user.password, password))) {
        throw new UnauthorizedException("Invalid credentials");
      }

      if (!user.verified) {
        throw new UnauthorizedException("Verify your account first to log in");
      }

      const token = this.generateToken(user);
      return {
        tokens: {
          access_token: token,
          refresh_token: process.env.REFRESH_TOKEN_SECRET,
        },
        message: "Login successful",
      };
    } catch (error) {
      throw error;
    }
  }

  async handleEmailVerification(email: string, code: string) {
    const isVerified = await this.emailVerificationService.verifyEmail(
      email,
      code
    );
    if (!isVerified.success) {
      return {
        success: false,
        message: "invalid code",
      };
    }

    return {
      success: true,
      message: "Email Verified Successfully",
      token: this.generateToken(isVerified.user),
    };
  }

  private generateToken(user: User): string {
    const payload: JwtPayload = { userId: user.id };
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }
}
