export enum DealType {
	SALE = 1,
	TRADE,
	WISH
}

export const DealTypeDescription: { [key in DealType]: string } = {
	[DealType.SALE]: "Venda",
	[DealType.TRADE]: "Troca",
	[DealType.WISH]: "Desejo",
};
