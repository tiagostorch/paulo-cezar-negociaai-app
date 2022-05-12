import { BidStatus } from "../enums/bid-status.enum";
import { UtilHelper } from "../helpers/utils.helper";
import { Bid } from "../models/bid.model";
import { Deal } from "../models/deal.model";
import { User } from "../models/user.model";

export class BidViewModel {
	id: number;
	user: User;
	status: BidStatus;
	value: string;
	description?: string;
	deal?: Deal;

	isValueValid(): boolean {
		const valueNumber: number = UtilHelper.convertMoneyToNumber(this.value);
		if (!valueNumber) {
			return false;
		}
		return true;
	}

	toModel(): Bid {
		const bid: Bid = new Bid();
		bid.id = this.id;
		bid.user = this.user;
		bid.status = this.status;
		bid.value = UtilHelper.convertMoneyToNumber(this.value);
		bid.description = this.value;
		bid.deal = this.deal;
		return bid;
	}
}
