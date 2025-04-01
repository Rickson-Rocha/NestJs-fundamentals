import { UserEntity, UserParams } from '../entities/user.entity';

//Partial -> usado para deixar todos os atributos 
type Override = Partial<UserParams>;

export const makeUser = (override: Override = {}): UserEntity => {
    return new UserEntity({
        email: override.email ?? 'email@gmail.com',
        name: override.name ?? 'Teste',
        password: override.password ?? '123123',
        createdAt: override.createdAt ?? new Date(),
    });
};
