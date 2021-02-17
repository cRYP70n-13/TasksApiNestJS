import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import {TasksStatus} from './task-status.enum';
import {Task} from './task.entity';
import {TaskRepository} from './task.repository';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TaskRepository)
		private taskRepository: TaskRepository,
	) {}
	/**
	getAllTasks(): Task[] {
		return this.tasks;
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

	*/
	async getTaskById(id: number): Promise<Task> {
		const found = await this.taskRepository.findOne(id);

		if (!found) {
			throw new NotFoundException(`Task with the ${id} is Not found`);
		}
		return found;
	}

	async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		return this.taskRepository.createTask(createTaskDto);
	}

	async deleteTaskById(id: number): Promise<void> {
		const result = await this.taskRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(`This is not found`);
		}
	}

	async updateTaskStatus(id: number, status: TasksStatus): Promise<Task> {
		const task = await this.getTaskById(id);
		task.status = status;
		await task.save();
		return task;
	}
}
