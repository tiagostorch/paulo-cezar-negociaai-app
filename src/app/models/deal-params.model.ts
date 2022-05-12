import { DealType } from "../enums/deal-type.enum"

export class DealParams {
	type?: DealType;
	valueStart?: number;
	valueEnd?: number;
	term?: string;
	lat?: number;
	lng?: number;
}
