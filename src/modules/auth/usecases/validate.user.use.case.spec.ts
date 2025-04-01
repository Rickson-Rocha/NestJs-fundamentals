

import { UserRepositoryInMemory } from 'src/modules/user/repositories/user.repository.in.memory';
import { ValidateUserUseCase } from './validate.user.use.case';
import { hash } from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';
import { makeUser } from 'src/modules/user/factories/user.factory';

let validateUserUseCase: ValidateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Validate User', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
    });

    it('Should be able to return user when credentials are correct', async () => {
        const userPasswordWithoutEncryption = '123123';

        const user = makeUser({
            password: await hash(userPasswordWithoutEncryption, 10),
        });

        userRepositoryInMemory.users = [user];

        const result = await validateUserUseCase.execute({
            email: user.getEmail(),
            password: userPasswordWithoutEncryption,
        });

        expect(result).toEqual(user);
    });

    it('Should be able to throw error when credentials incorrect', async () => {
        const userPasswordWithoutEncryption = '123123';

        const user = makeUser({
            password: await hash(userPasswordWithoutEncryption, 10),
        });

        userRepositoryInMemory.users = [user];

        expect(async () => {
            await validateUserUseCase.execute({
                email: 'incorrect@gmail.com',
                password: userPasswordWithoutEncryption,
            });
        }).rejects.toThrow(UnauthorizedException);

        expect(async () => {
            await validateUserUseCase.execute({
                email: user.getEmail(),
                password: 'incorrect password',
            });
        }).rejects.toThrow(UnauthorizedException);
    });
});
