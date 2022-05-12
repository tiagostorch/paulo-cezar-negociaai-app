import { BidStatus } from "../enums/bid-status.enum";
import { Deal } from "./deal.model";
import { User } from "./user.model";

export class Bid {
	id: number;
	user: User;
	status: BidStatus;
	value: number;
	description?: string;
	deal?: Deal;
}
