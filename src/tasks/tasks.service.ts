import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TasksStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {
	private tasks: Task[] = [];

	getAllTasks(): Task[] {
		return this.tasks;
	}

	getTaskById(id: string): Task {
		const found = this.tasks.find(task => task.id === id);
		if (!found) {
			throw new NotFoundException(`Task with the ${id} is Not found`);
		}
		return found;
	}

	getTasksWithFilter(filter: GetTasksFilterDto): Task[] {
		const { status, search } = filter;
		let tasks = this.getAllTasks();

		if (status) {
			tasks = tasks.filter(task => task.status === status);
		}

		if (search) {
			tasks = tasks.filter(task => {
				task.title.includes(search) ||
				task.description.includes(search)
			})
		}

		return tasks;
	}

	createTask(createTaskDto: CreateTaskDto): Task {
		const { title, description } = createTaskDto;

		const task: Task = {
			id: uuid(),
			title,
			description,
			status: TasksStatus.OPEN,
		};

		this.tasks.push(task);
		return task;
	}

	deleteTaskById(id: string) {
		const tasks = this.tasks.filter(task => task.id !== id);
		this.tasks = tasks;
		return tasks;
	}

	updateTaskStatus(id: string, status: TasksStatus): Task {
		const task = this.getTaskById(id);
		task.status = status;
		return task;
	}
}
