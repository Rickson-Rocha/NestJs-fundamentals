import { randomUUID } from "crypto";

export interface TaskParams {
    title: string;
    description?: string;
    userId: string;
    createdAt: Date;
}
export class TaskEntity {
    private id: string
    private title: string
    private description: string
    private userId: string
    private createdAt: Date

    constructor(params: TaskParams, id?: string) {
        this.id = id || randomUUID();
        this.title = params.title;
        this.description = params.description ?? null
        this.userId = params.userId
        this.createdAt = params.createdAt ?? new Date();
    }
    public getId(): string {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getDescription(): string | null {
        return this.description;
    }

    public setDescription(description: string | null): void {
        this.description = description;
    }

    public getUserId(): string {
        return this.userId;
    }
    public getCreatedAt(): Date {
        return this.createdAt;
    }

}