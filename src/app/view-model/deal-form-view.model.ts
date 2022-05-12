import { DealType } from "src/app/enums/deal-type.enum";
import { UtilHelper } from "src/app/helpers/utils.helper";
import { Deal } from "../models/deal.model";
import { Location } from "../models/location.model";
import { Photo } from "../models/photo.model";
import { Urgency } from "../models/urgency.model";
import { User } from "../models/user.model";

export class DealFormViewModel {
	id: number;
	type: DealType
	value: number | string;
	description: string;
	tradeFor: string;
	location: Location;
	urgency: Urgency;
	photos: Photo[];
	owner: User;

	constructor(model: Deal = { } as any) {
		Object.assign(this, model);
		if (!this.photos) {
			this.photos = [];
		}
		if (!this.urgency) {
			this.urgency = new Urgency();
		}
	}

	toModel(): Deal {
		const deal: Deal = new Deal();
		deal.id = this.id;
		deal.type = this.type;
		deal.description = this.description;
		deal.tradeFor = this.tradeFor;
		deal.location = this.location;
		deal.urgency = this.urgency;
		deal.photos = this.photos;
		
		deal.owner = new User();
		deal.owner.id = this.owner.id;
		deal.owner.name = this.owner.name;

		if (typeof this.value == "string" && this.value.length > 0) {
			deal.value = UtilHelper.convertMoneyToNumber(this.value);
		} else {
			deal.value = this.value as number || 0;
		}
		return deal;
	}
}