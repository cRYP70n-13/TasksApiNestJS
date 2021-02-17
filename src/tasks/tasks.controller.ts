import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Task, TasksStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}

	/**
	* @param {FilterDto} FilterDto for the tasks
	* @returns {Task[]} The tasks array stored in our memory
	*/
	@Get()
	getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
		if (Object.keys(filterDto).length) {
			return this.tasksService.getTasksWithFilter(filterDto);
		} else {
			return this.tasksService.getAllTasks();
		}
	}

	/**
	* @param {Id} The task id
	* @returns {Task} The task that have the exact ID
	*/
	@Get('/:id')
	getTaskById(@Param('id') id: string): Task {
		return this.tasksService.getTaskById(id);
	}

	/**
	* @param {*}
	* @returns {Task} The created task
	*/
	@Post()
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto: CreateTaskDto): Task {
		return this.tasksService.createTask(createTaskDto);
	}

	/**
	* @param {:id/status}
	* @returns {Task} The updated task
	*/
	@Patch('/:id/status')
	upadteTask(
		@Param('id') id: string,
		@Body('status', TaskStatusValidationPipe) status: TasksStatus
	): Task {
		return this.tasksService.updateTaskStatus(id, status);
	}

	/**
	* @param {:id/status}
	* @returns {Task} The deleted task
	*/
	@Delete('/:id')
	deleteTaskById(@Param('id') id: string): any {
		return this.tasksService.deleteTaskById(id);
	}
}
