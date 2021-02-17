import { BadRequestException, PipeTransform } from "@nestjs/common";
import {TasksStatus} from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
	readonly allowedStatus = [
		TasksStatus.OPEN,
		TasksStatus.IN_PROGRESS,
		TasksStatus.DONE
	];

	transform(value: any) {
		value = value.toUpperCase();

		if (!this.isStatusValid(value)) {
			throw new BadRequestException(`"${value}" is an invalid status`);
		}

		return value;
	}

	private isStatusValid(status: any) {
		const indx = this.allowedStatus.indexOf(status);
		return indx !== -1;
	}
}
