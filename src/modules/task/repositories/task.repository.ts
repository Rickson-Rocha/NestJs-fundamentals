import { TaskEntity } from "../entities/task.entity";

export abstract class TaskRepository {
    abstract create(task: TaskEntity): Promise<void>
    abstract findById(id: string): Promise<TaskEntity | null>
    abstract delete(id: string): Promise<void>
    abstract save(task: TaskEntity): Promise<void>
    abstract findManyByUserId(userId: string, page: number, perPage: number): Promise<TaskEntity[]>
}