import { TaskEntity } from "src/modules/task/entities/task.entity";


export class TaskViewModel {
    static toHttpResponse(task: TaskEntity) {
        return {
            id: task.getId(),
            title: task.getTitle(),
            name: task.getDescription(),
            createdAt: task.getCreatedAt()
        };
    }
}
