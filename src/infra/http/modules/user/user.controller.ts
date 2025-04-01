import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/usecases/create.user.use.case';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserViewModel } from './viewModel/user.view.model';

@Controller('users')
export class UserController {
  constructor(private createUserUserCase: CreateUserUseCase) {}
  @Post()
  async create(@Body() data: CreateUserDto) {
    const { name, email, password } = data;
    const user = await this.createUserUserCase.execute({
      name,
      email,
      password,
    });

    return UserViewModel.toHttpResponse(user);
  }
}
