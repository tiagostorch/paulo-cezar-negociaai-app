import { BidStatusDescription } from "../enums/bid-status.enum";
import { Bid } from "../models/bid.model";
import { Photo } from "../models/photo.model";

export class DealBidListViewModel {
	id: number;
	description: string;
	tradeFor: string;
	photo: Photo;
	value: number;
	bidValue: number;
	bidStatus: string;
	bid: Bid;
	
	constructor(model: Bid) {
		this.bid = model;
		this.id = model.deal?.id;
		this.description = model.deal?.description;
		this.tradeFor = model.deal?.tradeFor;
		this.value = model.deal?.value;
		this.bidValue = model.value;
		this.bidStatus = BidStatusDescription[model.status];
		
		if (model.deal?.photos && model.deal?.photos.length > 0) {
			this.photo = model.deal?.photos[0];
		}
	}
}