import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';
import { JwtUtil } from 'src/utils/jwtUtil';

export const AuthGuard = () => {
  @Injectable()
  class Auth implements CanActivate {
    private static readonly logger = new Logger(Auth.name);
    constructor(readonly jwtUtil: JwtUtil) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      try {
        const request = context.switchToHttp().getRequest();
        const authrization = request.headers.authorization || null;

        if (!authrization) {
          throw new UnauthorizedException('Token 필요');
        }
        const [schema, accessToken] = authrization.split('');
        if (schema.toLowerCase() !== 'bearer')
          throw new NotImplementedException('Not Support Token Format');
        const payload = this.jwtUtil.verify(accessToken);
        if (!payload.ok) throw new UnauthorizedException('Token Invalid');
        if (payload.exp * 1000 < Date.now()) {
          throw new UnauthorizedException('Token Expired');
        }
        request['data'] = payload;
        return true;
      } catch (error) {
        Auth.logger.error(error);
        if (error.message === ' 존재하지 않는 사용자') {
          throw new UnauthorizedException();
        }
        throw error;
      }
    }
  }
  const guard = mixin(Auth);
  return guard;
};
