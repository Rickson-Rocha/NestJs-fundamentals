import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';

interface CreateTaskRequest {
    title: string;
    description?: string;
    userId: string;
}
@Injectable()
export class CreateTaskUseCase {
    constructor(private taskRepository: TaskRepository) { }
    async execute(data: CreateTaskRequest) {
        const task = new TaskEntity({
            title: data.title,
            userId: data.userId,
            description: data.description,
        });
        await this.taskRepository.create(task)
        return task
    }
}
