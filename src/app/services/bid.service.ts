import { Injectable } from "@angular/core";
import { WEBSERVICE } from "../commom/api-constants";
import { StorageKeys } from "../enums/storage-keys.enum";
import { Bid } from "../models/bid.model";
import { BidViewModel } from "../view-model/bid-view.model";
import { DealBidListViewModel } from "../view-model/deal-bid-list-view.model";
import { RequestService } from "./request.service";
import { StorageService } from "./storage.service";

@Injectable({
	providedIn: "root"
})
export class BidService {

	constructor(
		private requestService: RequestService,
		private storageService: StorageService
	) { }

	async getDealBids(dealId: number): Promise<Bid[]> {
		const params: any = {
			id: dealId
		};
		const urlRequest: string = this.requestService.buildUrlParams(params, WEBSERVICE.GET_DEAL_BIDS);
		return await this.requestService.getData(urlRequest);
	}

	async getMyBids(userId: number): Promise<DealBidListViewModel[]> {
		// Getting all storage bids
		let response: Bid[] = await this.getStoragedBids(userId) || [];
		const dealBids: DealBidListViewModel[] = [];
		response.forEach(item => {
			dealBids.push(new DealBidListViewModel(item));
		});
		return dealBids;
	}

	async saveBid(bid: BidViewModel): Promise<void> {
		if (!bid.id) {
			bid.id = new Date().getTime();
		}
		const model: Bid = bid.toModel();
		await this.saveBidToStoraged(model);
	}

	/**
	 * Get storaged deals created by user
	 */
	 private async getStoragedBids(userId: number): Promise<Bid[]> {
		try {
			return await this.storageService.get(`${userId}-${StorageKeys.BIDS}`) || [];
		} catch (error) {
			return [];
		}
	}

	/**
	 * Save a bid to storage to simulate a POST service
	 * @param bid created by user
	 */
	private async saveBidToStoraged(bid: Bid): Promise<void> {
		try {
			const bids: Bid[] = await this.getStoragedBids(bid.user.id) || [];
			const index: number = bids.findIndex((b) => b.id == bid.id);
			// Check if it's a existing deal, so update instead of add a new one
			if (index > -1) {
				bids[index] = bid;
			} else {
				bids.unshift(bid);
			}
			await this.storageService.set(`${bid.user.id}-${StorageKeys.BIDS}`, bids);
		} catch (error) {
			console.error(error);
		}
	}
}