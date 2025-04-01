
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from './user.repository';

export class UserRepositoryInMemory implements UserRepository {
    public users: UserEntity[] = [];

    async create(user: UserEntity): Promise<void> {
        this.users.push(user);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = this.users.find((user) => user.getEmail() === email);

        if (!user) return null;

        return user;
    }
}