export class UtilHelper {

	public static unmask(value: string): string {
		if (!value) return "";
		return value.replace(/[^a-z0-9]/gi, "");
	}

	public static convertMoneyToNumber(value: string): number {
		if (!value) return value as any;
		return Number(value.replace(/[$.]/g,'').replace(/[$,]/g,'.'));
	}
}
