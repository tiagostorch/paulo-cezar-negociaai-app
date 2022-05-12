import { Injectable } from "@angular/core";
import { WEBSERVICE } from "../commom/api-constants";
import { StorageKeys } from "../enums/storage-keys.enum";
import { DealParams } from "../models/deal-params.model";
import { Deal } from "../models/deal.model";
import { Delivery } from "../models/delivery.model";
import { DealFormViewModel } from "../view-model/deal-form-view.model";
import { DealItemViewModel } from "../view-model/deal-item-view.model";
import { DealListViewModel } from "../view-model/deal-list-view.model";
import { RequestService } from "./request.service";
import { StorageService } from "./storage.service";

@Injectable({
	providedIn: "root"
})
export class DealService {

	constructor(
		private requestService: RequestService,
		private storageService: StorageService
	) { }

	async getDeals(params?: DealParams): Promise<DealListViewModel[]> {
		console.log(params);
		// Here, I suggest to change this webservice to GET with query params, instead a POST request like the documentation suggest.
		let response: Deal[] = await this.requestService.getData(WEBSERVICE.GET_DEALS, params) || [];
		
		const deals: DealListViewModel[] = [];
		response.forEach(item => {
			deals.push(new DealListViewModel(item));
		});
		return deals;
	}

	async getMyDeals(userId: number): Promise<DealListViewModel[]> {
		// Getting all storage deals
		let response: Deal[] = await this.getStoragedDeals(userId) || [];
		const deals: DealListViewModel[] = [];
		response.forEach(item => {
			deals.push(new DealListViewModel(item));
		});
		return deals;
	}

	/**
	 * Get deal by id
	 * @param id deal id
	 * @param userId is used only for simulation purpose, to recover the deals saved by user
	 * @returns list of deals view model
	 */
	async getDeal(id: number, userId: number): Promise<DealItemViewModel> {
		// Here, I simulate http://api.vibbraneo.com/deal/{id}
		let response: Deal[] = await this.requestService.getData(WEBSERVICE.GET_DEALS) || [];

		// Also, get the storaged deals to gel all
		response = response.concat(await this.getStoragedDeals(userId));
		
		// Find in deal by id in all recovered data
		const deal: Deal = response.find((d) => d.id == id);
		if (deal) {
			return new DealItemViewModel(deal);
		}
		return null;
	}

	async saveDeal(dealForm: DealFormViewModel): Promise<number> {
		// Simulate the generate id to save
		if (!dealForm.id) {
			dealForm.id = new Date().getTime();
		}
		const deal: Deal = dealForm.toModel();
		await this.saveDealToStoraged(deal);
		return deal.id;
	}

	async getDeliveryFee(dealId: number, userId: number): Promise<Delivery> {
		const params: any = {
			id: dealId,
			userId: userId
		};
		const urlRequest: string = this.requestService.buildUrlParams(params, WEBSERVICE.GET_DELIVERY_FEE);
		return await this.requestService.getData(urlRequest);
	}

	/**
	 * Get storaged deals created by user
	 */
	private async getStoragedDeals(userId: number): Promise<Deal[]> {
		try {
			return await this.storageService.get(`${userId}-${StorageKeys.DEALS}`) || [];
		} catch (error) {
			return [];
		}
	}

	/**
	 * Save a deal to storage to simulate a POST service
	 * @param deal created by user
	 */
	private async saveDealToStoraged(deal: Deal): Promise<void> {
		try {
			const deals: Deal[] = await this.getStoragedDeals(deal.owner.id) || [];
			const index: number = deals.findIndex((d) => d.id == deal.id);
			// Check if it's a existing deal, so update instead of add a new one
			if (index > -1) {
				deals[index] = deal;
			} else {
				deals.unshift(deal);
			}
			await this.storageService.set(`${deal.owner.id}-${StorageKeys.DEALS}`, deals);
		} catch (error) {
			console.error(error);
		}
	}
}