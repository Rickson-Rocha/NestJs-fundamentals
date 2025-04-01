import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { ValidateUserUseCase } from 'src/modules/auth/usecases/validate.user.use.case';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { SigninDtoValidateMiddleware } from './middleware/signin.dto.validate.middleware';
import { SignInUseCase } from 'src/modules/auth/usecases/sign.in.use.case';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';

@Module({
  imports: [DatabaseModule, UserModule, JwtModule.register({
    secret: 'c65c135d6fe82d282690955187fe07bc',
    signOptions: { expiresIn: '30d' }
  })],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, ValidateUserUseCase, SignInUseCase]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SigninDtoValidateMiddleware).forRoutes("/signIn")
  }
}
