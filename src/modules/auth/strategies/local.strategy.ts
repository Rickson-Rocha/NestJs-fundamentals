
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUserUseCase } from '../usecases/validate.user.use.case';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private validateUser: ValidateUserUseCase) {
        super({
            'usernameField': 'email'
        });
    }

    async validate(email: string, password: string) {
        return await this.validateUser.execute({ email, password })
    }
}
