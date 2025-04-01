import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../repositories/task.repository";

export interface GetManyTaskRequest {
    userId: string;
    page?: string
    perPage?: string
}

@Injectable()
export class GetManyTaskUseCase {
    constructor(private taskRepository: TaskRepository) { }
    async execute(data: GetManyTaskRequest) {
        const DEFAULT_PAGE = 1
        const DEFAULT_PER_PAGE = 20
        const currentPage = Number(data.page) || DEFAULT_PAGE
        const currentPerPage = Number(data.perPage) || DEFAULT_PER_PAGE
        const tasks = await this.taskRepository.findManyByUserId(
            data.userId,
            currentPage,
            currentPerPage
        )
        return tasks
    }
}