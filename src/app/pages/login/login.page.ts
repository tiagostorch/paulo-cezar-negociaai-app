import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { AppEvents } from 'src/app/enums/app-events.enum';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	form: FormGroup = null;

	constructor(
		private alertService: AlertService,
		private eventService: EventService,
		private loadingCtrl: LoadingController,
		private formBuilder: FormBuilder,
		private menuCtrl: MenuController,
		private navCtrl: NavController,
		private userService: UserService
	) {	}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			login: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	ionViewWillEnter(): void {
		this.menuCtrl.enable(false);
	}

	async login(): Promise<void> {
		if (!this.form.valid) {
			this.alertService.showToast("Verifique os erros e tente novamente");
			return;
		}
		const loading: HTMLIonLoadingElement = await this.loadingCtrl.create();
		try {
			await loading.present();
			const user: User = await this.userService.login(this.form.get('login').value, this.form.get('password').value);
			this.eventService.publish(AppEvents.LOGIN, user);
			this.navCtrl.navigateForward("home", { replaceUrl: true });
			this.menuCtrl.enable(true);
		} catch (error) {
			console.error(error);
			this.alertService.showAlertError(error, "Login");
		} finally {
			loading.dismiss();
		}
	}
}
