import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SigninDto } from '../dtos/signin.dto';
import { validate } from 'class-validator';

@Injectable()
export class SigninDtoValidateMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const sigInBody = new SigninDto();
    sigInBody.email = body.email;
    sigInBody.password = body.password;

    const validations = await validate(sigInBody);

    if (validations.length) {
      throw new BadRequestException(validations);
    }
    next();
  }
}
