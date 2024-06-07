import { Injectable, Provider } from '@nestjs/common';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtil {
  private jwtService = (): JwtService => {
    const options: JwtModuleOptions = {
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: {
        issuer: 'test',
        algorithm: 'HS256',
      },
    };
    return new JwtService(options);
  };

  public verify = (token: string) => {
    try {
      const decoded = this.jwtService().verify(token);
      return {
        ok: true,
        seq: decoded.seq,
        name: decoded.name,
        token: token,
        iat: decoded.iat,
        exp: decoded.exp,
      };
    } catch (error) {
      return {
        ok: false,
        token: token,
        message: error.message,
      };
    }
  };
}

export const JwtProvider: Provider = {
  provide: JwtUtil,
  useFactory: () => new JwtUtil(),
};
