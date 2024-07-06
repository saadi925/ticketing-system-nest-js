import { Controller, Post, Body, Put, Res, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SigninDto, SignupDto } from "./dto/auth.dto";
import { Response } from "express";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";

@ApiTags('auth')
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post("signup")
  @ApiOperation({ summary: 'User signup' })
  @ApiResponse({ status: 201, description: 'User successfully signed up.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiBody({ type: SignupDto })
  async signup(@Body() signupDto: SignupDto, @Res() res: Response) {
    const result = await this.authService.signup(signupDto);
    return res.status(HttpStatus.CREATED).send(result);
  }

  @Post("signin")
  @ApiOperation({ summary: 'User signin' })
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @ApiBody({ type: SigninDto })
  async signin(@Body() signinDto: SigninDto, @Res({passthrough : true}) res: Response) {
    const resObj = await this.authService.signin(signinDto.email, signinDto.password);

    // Set the tokens as HTTP-only cookies
    res.cookie('access_token', resObj.tokens.access_token, { httpOnly: true, sameSite : true });
    res.cookie('refresh_token', resObj.tokens.refresh_token, { httpOnly: true , sameSite : true});

    return res.status(HttpStatus.OK).send(resObj.message);
  }

  @Put("email-verification")
  @ApiOperation({ summary: 'Email verification' })
  @ApiResponse({ status: 200, description: 'Email verified successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid verification code.' })
  @ApiBody({ schema: { type: 'object', properties: { email: { type: 'string' }, code: { type: 'string' } } } })
  async verifyEmail(@Body() verificationData: any, @Res() res: Response) {
    const { email, code } = verificationData;
    const resObj = await this.authService.handleEmailVerification(email, code);

    // Optionally set the token if email verification returns a token
    if (resObj.token) {
      res.cookie('access_token', resObj.token, { httpOnly: true });
    }

    return res.status(HttpStatus.OK).send(resObj.message);
  }
}














  // @Get('logout')
  // logout(@Req() req : FastifyRequestExpress, @Res() res: FastifyReplyExpress) {
  //   const refreshToken = req.cookies['refresh_token'];
  //   res.clearCookie('access_token');
  //   res.clearCookie('refresh_token');
  //   this.tokenService.revokeGoogleToken(refreshToken);
  //   res.redirect('http://localhost:3000/');
  // }







  // @Get('google')
  // @UseGuards(GoogleOauthGuard)
  // googleLogin(@Req() _req ) {}

  // @Get('callback/google')
  // @UseGuards(GoogleOauthGuard)
  // async googleAuthCallback(@Req() req : FastifyRequestExpress, @Res() res :FastifyReplyExpress) {
  //   try {
       
  //     const token = await this.authService.oAuthLogin(req.user);
  //     res.cookie('auth_token', token.jwt, {
  //       httpOnly: true,
  //       secure: true, // set to true if using https
  //       sameSite: 'strict', // helps mitigate CSRF
  //       path: '/',
  //       maxAge: 3600000 // set cookie expiry as needed
  //     });
  //     if (token) {
  //   return res.redirect(301 ,`http://localhost:3000/auth/auth-check` )    
  // }      
  //   } catch (err) {
  //     res.status(500).send({ success: false, message: err.message });
  //   }
  // }
  
