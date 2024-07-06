import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class SignupDto {
  
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty({ message: "password is required" })
  @MinLength(8) // Example: Minimum length of 8 characters
  password: string;
}
export class SigninDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsEmail()
  email: string;
  
  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @IsNotEmpty()
  @MinLength(8) // Example: Minimum length of 8 characters
  password: string;
}


