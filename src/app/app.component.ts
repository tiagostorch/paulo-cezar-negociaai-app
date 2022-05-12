import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { AppEvents } from './enums/app-events.enum';
import { User } from './models/user.model';
import { EventService } from './services/event.service';
import { UserService } from './services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {

	user: User;

	public appPages = [
		{ title: 'Início', url: '/home', icon: 'home-outline' },
		{ title: 'Criar negociação', url: '/create-deal', icon: 'megaphone-outline' },
		{ title: 'Minhas negociações', url: '/my-deals', icon: 'chatbubbles-outline' },
		{ title: 'Meus convites', url: '/invites', icon: 'person-add-outline' }
	];

	constructor(
		private eventService: EventService,
		private navCtrl: NavController,
		private platform: Platform,
		private toastCtrl: ToastController,
		private userService: UserService
	) {
		this.init();
	}
	
	init(): void {
		this.platform.ready().then(async () => {
			this.registerEvents();
			this.user = await this.userService.loadUser();
		});
	}

	registerEvents(): void {
		this.eventService.subscribe(AppEvents.LOGIN, (user: User) => {
			this.user = user;
		});
	}

	async logout(): Promise<void> {
		await this.navCtrl.navigateForward("/login", { replaceUrl: true });
		this.showToast("Até mais!", 1500);
		this.userService.removeUser();
		this.user = null;
	}

	protected async showToast(message: string, duration?: number, position?: string): Promise<void> {
		const options: any = {
			message: message,
			duration: duration || 4000,
			position: position || 'bottom',
			color: 'dark'
		};
		const toast: HTMLIonToastElement = await this.toastCtrl.create(options);
		toast.present();
	}
}