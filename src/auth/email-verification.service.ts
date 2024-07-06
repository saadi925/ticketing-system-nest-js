import { EmailVerification } from "@/schema/email_verification.entity";
import { User } from "@/schema/user.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class EmailVerificationService {
  constructor(
    @InjectRepository(EmailVerification)
    private emailVerifyRepository: Repository<EmailVerification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async generateVerificationCode(
    userId: string,
    verificationCode: string,
    email: string,
  ): Promise<string> {
    await this.emailVerifyRepository.insert({
      userId,
      code: verificationCode,
      email: email,
    });

    return verificationCode;
  }

  async verifyEmail(
    email: string,
    verificationCode: string,
  ): Promise<{
    success: boolean;
    user?: User;
  }> {
    const emailVerification = await this.emailVerifyRepository.findOne({
      where: { email, code: verificationCode },
    });

    if (!emailVerification) {
      return {
        success: false,
      };
    }

    await this.userRepository.update(
      { id: emailVerification.userId },
      { verified: true },
    );

    await this.emailVerifyRepository.delete({
      email,
      code: verificationCode,
    });

    const user = await this.userRepository.findOneBy({id : emailVerification.userId});

    if (!user) {
      throw new NotFoundException(`User with id ${emailVerification.userId} not found`);
    }

    return {
      success: true,
      user,
    };
  }
}
