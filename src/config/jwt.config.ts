import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'J20YykDiujHVr9fRJTIQz4/G0eK6Q3nNKu58FR97t0Y=', 
  signOptions: { expiresIn: '1h' },
};
