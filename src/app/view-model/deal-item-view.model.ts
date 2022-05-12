import * as moment from 'moment';
import { UrgencyType, UrgencyTypeDescription } from "src/app/enums/urgency-type.enum";
import { DealTypeDescription } from "../enums/deal-type.enum";
import { Bid } from "../models/bid.model";
import { Deal } from "../models/deal.model";
import { Delivery } from "../models/delivery.model";
import { Location } from '../models/location.model';
import { Photo } from "../models/photo.model";
import { User } from "../models/user.model";

export class DealItemViewModel {
	id: number;
	description: string;
	tradeFor: string;
	photos: Photo[];
	value: number;
	owner: User;
	location: Location;
	delivery: Delivery;
	hasBids: boolean;
	model: Deal;

	typeDescription: string;
	urgencyDescription: string;
	urgencyDate: string;
	urgencyIcon: string;
	urgencyIconColor: string;

	constructor(model: Deal) {
		this.model = model;
		this.id = model.id;
		this.description = model.description;
		this.location = model.location;
		this.tradeFor = model.tradeFor;
		this.value = model.value;
		this.photos = model.photos;
		this.owner = model.owner;

		this.typeDescription = DealTypeDescription[model.type];
		this.urgencyDescription = UrgencyTypeDescription[model.urgency.type];

		if (model.urgency.type == UrgencyType.DATE && model.urgency.limitDate) {
			this.urgencyDate = moment(model.urgency.limitDate).format("DD/MM/YYYY");
		}
		this.prepareUrgencyIcon(model.urgency.type);
	}

	bidsButtonDescription(bids: Bid[]): string {
		if (this.hasBids) {
			const bidsLabel: string = bids.length == 1 ? "oferta" : "ofertas";
			return `Você possui ${bids.length} ${bidsLabel}!`;
		} else {
			return "Nenhuma oferta recebida";
		}
	}

	bidsButtonColor(): string {
		return this.hasBids ? "success" : "light";
	}

	private prepareUrgencyIcon(type: UrgencyType): void {
		switch (type) {
			case UrgencyType.HIGH:
				this.urgencyIcon = "caret-up-outline";
				this.urgencyIconColor = "danger";
				break;

			case UrgencyType.MEDIUM:
				this.urgencyIcon = "caret-up-outline";
				this.urgencyIconColor = "warning";
				break;

			case UrgencyType.LOW:
				this.urgencyIcon = "caret-down-outline";
				this.urgencyIconColor = "success";
				break;

			case UrgencyType.DATE:
				this.urgencyIcon = "calendar-outline";
				this.urgencyIconColor = "gray";
				break;
		}
	}
}