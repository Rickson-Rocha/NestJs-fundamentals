import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}
@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(data: CreateUserRequest) {
    const encryptPassword = await bcrypt.hash(data.password, 10);

    const user = new UserEntity({
      name: data.name,
      email: data.email,
      password: encryptPassword,
    });
    await this.userRepository.create(user);
    return user;
  }
}
