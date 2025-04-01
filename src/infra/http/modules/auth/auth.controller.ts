import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequestModel } from './models/auth.request.model';
import { SignInUseCase } from 'src/modules/auth/usecases/sign.in.use.case';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { Public } from './decorators/is.public';

@Controller('')
export class AuthController {
    constructor(private signinUseCase: SignInUseCase) { }
    @Post('signIn')
    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async signIn(@Request() request: AuthRequestModel) {
        const acess_token = await this.signinUseCase.execute({ user: request.user })
        return { acess_token }
    }

    @Get("test")
    async test() {
        return 'teste'
    }
}
