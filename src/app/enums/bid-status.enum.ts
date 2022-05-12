export enum BidStatus {
	WAITING = 1,
	ACCEPTED,
	REJECTED
}

export const BidStatusDescription: { [key in BidStatus]: string } = {
	[BidStatus.WAITING]: "Aguardando",
	[BidStatus.ACCEPTED]: "Oferta aceita",
	[BidStatus.REJECTED]: "Oferta rejeitada",
};