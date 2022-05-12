import { DealType } from "../enums/deal-type.enum";
import { Location } from "./location.model";
import { Photo } from "./photo.model";
import { Urgency } from "./urgency.model";
import { User } from "./user.model";

export class Deal {
	id: number;
	type: DealType
	value: number;
	description: string;
	tradeFor: string;
	location: Location;
	urgency: Urgency;
	photos: Photo[];
	owner: User;
}