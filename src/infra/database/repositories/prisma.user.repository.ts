import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prisma: PrismaService) { }
    async create(user: UserEntity): Promise<void> {
        console.log(`Verificando valores de user no método create do prisma:`);
        console.log(`id: ${user.getId()}`);
        console.log(`password: ${user.getPassword()}`);
        console.log(`createdAt: ${user.getCreatedAt()}`);
        console.log(`name: ${user.getName()}`);
        console.log(`email: ${user.getEmail()}`);
        await this.prisma.user.create({
            data: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                createdAt: user.getCreatedAt(),
            },
        });

    }
}
