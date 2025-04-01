import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prisma: PrismaService) { }
    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) return null;

        return new UserEntity(user);
    }
    async create(user: UserEntity): Promise<void> {

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
