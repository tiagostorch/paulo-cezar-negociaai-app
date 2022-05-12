import { Injectable } from '@angular/core';
import { WEBSERVICE } from '../commom/api-constants';
import { StorageKeys } from '../enums/storage-keys.enum';
import { ErrorApp } from '../models/error.model';
import { User } from '../models/user.model';
import { RequestService } from './request.service';
import { StorageService } from './storage.service';


@Injectable({
	providedIn: 'root'
})
export class UserService {

	user: User;

	constructor(
		private requestService: RequestService,
		private storageService: StorageService
	) { }

	async loadUser(): Promise<any> {
		try {
			if (!this.user) {
				this.user = await this.storageService.get(StorageKeys.USER);
				if (this.user) {
					this.requestService.setAuthToken(await this.storageService.get(StorageKeys.TOKEN));
				}
			}
		} catch (error) {
			console.error(error);
		}
		return this.user;
	}

	async saveUser(user: any): Promise<void> {
		this.user = user;
		await this.storageService.set(StorageKeys.USER, this.user);
	}

	removeUser(): void {
		this.storageService.clearAll();
		this.requestService.setAuthToken(null);
		this.user = null;
	}

	async setAuthToken(token: string): Promise<void> {
		this.requestService.setAuthToken(token);
		await this.storageService.set(StorageKeys.TOKEN, token);
	}

	async login(login: string, password: string): Promise<User> {
		// Simulating login
		if (login == "pcsantana" && password == "vibbra2022") {
			// Because the mock data, we used GET here. When switch to real webservice, change it to POST
			const response = await this.requestService.getData(WEBSERVICE.LOGIN);
			await this.setAuthToken(response.token);
			await this.saveUser(response.user);
			return this.user;
		} else {
			throw new ErrorApp(401, "Usuário ou senha inválidos");
		}
	}
}
