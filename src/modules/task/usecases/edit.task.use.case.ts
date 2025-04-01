import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { TaskRepository } from "../repositories/task.repository";

interface EditTaskRequest {
    title: string
    description?: string
    taskId: string
    userId: string
}

export class EditTaskUseCase {
    constructor(private taskRepository: TaskRepository) { }

    async execute(data: EditTaskRequest) {
        const task = await this.taskRepository.findById(data.taskId);

        if (!task) {
            throw new NotFoundException();
        }

        if (task.getUserId() !== data.userId) {
            throw new UnauthorizedException();
        }

        task.setTitle(data.title)
        task.setDescription(data.description ?? null)
        await this.taskRepository.save(task)
        return task
    }
}