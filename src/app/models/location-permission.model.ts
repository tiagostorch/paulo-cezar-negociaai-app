export class LocationPermission {
	isAuthorized: boolean;
	status?: string

	constructor(isAuthorized?: boolean) {
		this.isAuthorized = isAuthorized;
	}
}
