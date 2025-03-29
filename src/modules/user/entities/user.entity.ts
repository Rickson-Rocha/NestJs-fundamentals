import { randomUUID } from "crypto";

interface UserParams {
    name: string;
    password: string;
    createdAt?: Date;
}
export class UserEntity {
    private id: string;
    private name: string;
    private password: string;
    private createdAt: Date;

    constructor(params: UserParams, id?: string) {
        this.id = id || randomUUID();
        this.name = params.name;
        this.password = params.password;
        this.createdAt = params.createdAt ?? new Date();
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }


}
