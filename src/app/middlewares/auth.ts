import { NextFunction, Request, Response } from 'express';
import { jwtHelpers } from '../../shared/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error('You are not authorized');
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt_access_secret as Secret
      );

      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes((verifiedUser as any).role)) {
        throw new Error('You do not have permission to access this route');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
