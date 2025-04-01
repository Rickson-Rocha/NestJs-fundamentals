import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { AuthenticatedRequestModel } from 'src/modules/auth/models/authenticatedRequestModel';
import { CreateTaskUseCase } from 'src/modules/task/usecases/create.task.use.case';
import { CreateTaskDto } from './dtos/create.task.dto';
import { TaskViewModel } from './viewModel/task.view.model';
import { EditTaskUseCase } from 'src/modules/task/usecases/edit.task.use.case';
import { EditTaskDto } from './dtos/edit.task.dto';
import { DeleteTaskUseCase } from 'src/modules/task/usecases/delete.task.use.case';
import { GetTaskTaskUseCase } from 'src/modules/task/usecases/get.task.use.case';
import { GetManyTaskUseCase } from 'src/modules/task/usecases/get.many.task.use.case';

@Controller('tasks')
export class TaskController {
    constructor(
        private createTaskUseCase: CreateTaskUseCase,
        private editTaskUseCase: EditTaskUseCase,
        private deleteTaskUseCase: DeleteTaskUseCase,
        private getTaskUseCase: GetTaskTaskUseCase,
        private getManyUsecase: GetManyTaskUseCase) { }
    @Post()
    async create(@Request() request: AuthenticatedRequestModel, @Body() data: CreateTaskDto) {
        const { title, description } = data

        const task = await this.createTaskUseCase.execute({
            title,
            userId: request.user.id,
            description
        })
        return TaskViewModel.toHttpResponse(task);
    }

    @Put(':id')
    async edit(@Request() request: AuthenticatedRequestModel, @Param('id') taskId: string, @Body() data: EditTaskDto) {
        const { title, description } = data
        await this.editTaskUseCase.execute({
            taskId,
            title,
            userId: request.user.id,
            description
        })
    }

    @Delete(':id')
    async delete(@Request() request: AuthenticatedRequestModel, @Param('id') taskId: string) {
        await this.deleteTaskUseCase.execute({
            taskId,
            userId: request.user.id,
        })

    }

    @Get(':id')
    async get(@Request() request: AuthenticatedRequestModel, @Param('id') taskId: string) {
        const task = await this.getTaskUseCase.execute({
            taskId,
            userId: request.user.id,
        })
        return TaskViewModel.toHttpResponse(task);
    }

    @Get()
    async getMany(@Request() request: AuthenticatedRequestModel, @Query('page') page: string, @Query('perPage') perPage: string) {
        const task = await this.getManyUsecase.execute({
            userId: request.user.id,
            page,
            perPage
        })
        return task.map(TaskViewModel.toHttpResponse)
    }
}
