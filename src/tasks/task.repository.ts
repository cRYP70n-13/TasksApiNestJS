import {EntityRepository, Repository} from "typeorm";
import {CreateTaskDto} from "./dto/create-task-dto";
import {TasksStatus} from "./task-status.enum";
import {Task} from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
	async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		const { title, description } = createTaskDto;
		const newTask = new Task();

		newTask.title = title;
		newTask.description = description;
		newTask.status = TasksStatus.OPEN;

		await newTask.save();
		return newTask;
	}
}
