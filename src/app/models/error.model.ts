export class ErrorApp {
	status: number | string;
	message: string;

	constructor(status: number | string, message?: string) {
		this.status = status;
		this.message = message;
	}
}
