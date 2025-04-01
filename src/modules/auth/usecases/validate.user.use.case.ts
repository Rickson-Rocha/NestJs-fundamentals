import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UserRepository } from 'src/modules/user/repositories/user.repository';

interface ValidateUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: ValidateUserRequest) {
    const user = await this.userRepository.findByEmail(data.email);
    if (user) {
      const isPasswordMatched = await compare(
        data.password,
        user.getPassword(),
      );
      if (isPasswordMatched) {
        return user;
      }
    }
    throw new UnauthorizedException('Incorrect email or password');
  }
}
