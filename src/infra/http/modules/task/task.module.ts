import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateTaskUseCase } from 'src/modules/task/usecases/create.task.use.case';
import { DeleteTaskUseCase } from 'src/modules/task/usecases/delete.task.use.case';
import { EditTaskUseCase } from 'src/modules/task/usecases/edit.task.use.case';
import { GetManyTaskUseCase } from 'src/modules/task/usecases/get.many.task.use.case';
import { GetTaskTaskUseCase } from 'src/modules/task/usecases/get.task.use.case';

@Module({
  controllers: [TaskController],
  imports: [DatabaseModule],
  providers: [
    CreateTaskUseCase,
    EditTaskUseCase,
    DeleteTaskUseCase,
    GetTaskTaskUseCase,
    GetManyTaskUseCase
  ]
})
export class TaskModule { }
