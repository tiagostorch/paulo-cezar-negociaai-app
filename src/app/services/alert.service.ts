import { Injectable } from "@angular/core";
import { AlertController, NavController, ToastController } from "@ionic/angular";
import { ErrorApp } from "../models/error.model";

@Injectable({
	providedIn: 'root'
})
export class AlertService {
	
	constructor(
		private alertCtrl: AlertController,
		private navCtrl: NavController,
		private toastCtrl: ToastController
	) { }

	async showToast(message: string, duration?: number, position?: string): Promise<void> {
		const options: any = {
			message: message,
			duration: duration || 4000,
			position: position || 'bottom',
			color: 'dark'
		};
		const toast: HTMLIonToastElement = await this.toastCtrl.create(options);
		toast.present();
	}

	async showOKAlert(title: string, message?: string, okLabel?: string): Promise<void> {
		const alert: HTMLIonAlertElement = await this.alertCtrl.create({
			header: title || "",
			message: message || "",
			buttons: [okLabel || "OK"]
		});
		alert.present();
	}

	showAlertError(error: ErrorApp, context?: string, title?: string): void {
		if (error && error.status) {
			// If access denied, redirect to login page
			if (error.status === 401 && context !== "Login") {
				this.navCtrl.navigateForward("/login").then(() => {
					this.showToast("Sessão expirada, autentique-se novamente.");
				});
			} else {
				this.showOKAlert(title, error.message);
			}
		} else {
			// Unknow error
			this.showOKAlert(title, "Ocorreu um erro durante a operação");
		}
	}
}