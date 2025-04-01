import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TaskRepository } from '../repositories/task.repository';

interface DeleteTaskRequest {
    taskId: string;
    userId: string;
}
export class CreateTaskUseCase {
    constructor(private taskRepository: TaskRepository) { }
    async execute(data: DeleteTaskRequest) {
        const task = await this.taskRepository.findById(data.taskId)
        if (!task) throw new NotFoundException()
        if (task.getUserId() != data.taskId) throw new UnauthorizedException()
        await this.taskRepository.delete(data.taskId)
    }
}
