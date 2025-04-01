import { Request } from 'express';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class AuthRequestModel extends Request {
  user: UserEntity;
}
