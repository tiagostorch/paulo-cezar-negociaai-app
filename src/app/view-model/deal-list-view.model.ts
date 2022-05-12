import { Deal } from "../models/deal.model";
import { Photo } from "../models/photo.model";

export class DealListViewModel {
	id: number;
	description: string;
	tradeFor: string;
	photo: Photo;
	value: number;
	
	constructor(model: Deal) {
		this.id = model.id;
		this.description = model.description;
		this.tradeFor = model.tradeFor;
		this.value = model.value;
		
		if (model.photos && model.photos.length > 0) {
			this.photo = model.photos[0];
		}
	}
}