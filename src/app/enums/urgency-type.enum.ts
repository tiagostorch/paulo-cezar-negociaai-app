export enum UrgencyType {
	LOW = 1,
	MEDIUM,
	HIGH,
	DATE
}

export const UrgencyTypeDescription: { [key in UrgencyType]: string } = {
	[UrgencyType.LOW]: "Baixa",
	[UrgencyType.MEDIUM]: "Média",
	[UrgencyType.HIGH]: "Alta",
	[UrgencyType.DATE]: "Até a data"
};
