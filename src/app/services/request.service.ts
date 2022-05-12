import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class RequestService {

	private header: any;
	private token: string;

	constructor(
		private httpClient: HttpClient,
		private platform: Platform
	) { }

	setAuthToken(token: string): void {
		this.token = token;
	}

	async getData(url: string, params?: any): Promise<any> {
		try {
			const resp: any = await this.httpClient.get(url, { headers: this.getRequestOptions(), params: params }).toPromise<any>();
			return this.formatResponse(resp);
		} catch (e) {
			return this.formatError(e);
		}
	}

	async postData(url: string, data?: any): Promise<any> {
		try {
			const resp: any = await this.httpClient.post(url, data || { }, { headers: this.getRequestOptions() }).toPromise<any>();
			return this.formatResponse(resp);
		} catch (e) {
			return this.formatError(e);
		}
	}

	async putData(url: string, data: any): Promise<any> {
		try {
			const resp: any = await this.httpClient.put(url, data, { headers: this.getRequestOptions() }).toPromise<any>();
			return this.formatResponse(resp);
		} catch (e) {
			return this.formatError(e);
		}
	}

	async deleteData(url: string): Promise<any> {
		try {
			const resp: any = await this.httpClient.delete(url, { headers: this.getRequestOptions() }).toPromise<any>();
			return this.formatResponse(resp);
		} catch (e) {
			return this.formatError(e);
		}
	}

	buildUrlParams(params: any, urlRequest: string): string {
		if (!params) return null;
		for (const key in params) {
			if (params[key] != null) {
				urlRequest = urlRequest.replace("{" + key + "}", encodeURIComponent(params[key]));
			}
		}
		return urlRequest;
	}

	/**
	 * Add properties to header.
	 * Example: key = 'Content-Type'; value = 'application/json'
	 */
	addParamsHeader(key: string, value: any): void {
		if (!this.header) {
			this.header = { };
		}
		if (this.header[key]) {
			delete this.header[key];
		}
		this.header[key] = value;
	}

	getRequestOptions(): HttpHeaders {
		this.addTokenToHeader();
		if (this.header) {
			return new HttpHeaders(this.header);
		}
		return null;
	}

	/* Private methods
	================================*/

	private formatResponse(response: any): any {
		let body: any = null;
		try {
			if (this.platform.is('cordova')) {
				if (response.data) {
					body = JSON.parse(response.data);
				} else {
					body = typeof response === 'string' ? JSON.parse(response) : response;
				}
			} else {
				body = response;
			}
		} catch (e) {
			//sem content no response
			console.log(e);
		}
		this.header = null;
		return body;
	}

	private async formatError(error: any): Promise<any> {
		const erroObj: any = { status: 0, message: null };

		if (error && error.status) {
			switch (error.status) {
				case 401:
					erroObj.message = 'Sessão expirada! Efetue seu login novamente.';
					break;
				default:
					erroObj.message = 'Ocorreu um erro na comunicação com o Servidor.';
					break;
			}
			erroObj.status = error.status;
		}
		const body: any = this.formatResponse(error.error || error.data);
		if (body && body.message) {
			erroObj.message = body.message;
		}
		this.header = null;
		return Promise.reject(erroObj);
	}

	private addTokenToHeader(): void {
		if (this.token && this.token.trim().length > 0) {
			this.addParamsHeader('Authorization', this.token.trim());
		}
	}
}
