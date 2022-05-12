import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PictureSourceType } from '@ionic-native/camera';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActionSheetController, LoadingController, ModalController, NavController, Platform } from '@ionic/angular';
import * as moment from 'moment';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { DealType, DealTypeDescription } from 'src/app/enums/deal-type.enum';
import { UrgencyType, UrgencyTypeDescription } from 'src/app/enums/urgency-type.enum';
import { Photo } from 'src/app/models/photo.model';
import { AlertService } from 'src/app/services/alert.service';
import { DealService } from 'src/app/services/deal.service';
import { DeviceService } from 'src/app/services/device.service';
import { UserService } from 'src/app/services/user.service';
import { DealFormViewModel } from 'src/app/view-model/deal-form-view.model';

@Component({
	selector: 'app-create-deal',
	templateUrl: './create-deal.page.html',
	styleUrls: ['./create-deal.page.scss'],
})
export class CreateDealPage implements OnInit {

	DealTypeDescription: any = DealTypeDescription;
	UrgencyTypeDescription: any = UrgencyTypeDescription;
	UrgencyType: any = UrgencyType;

	deal: DealFormViewModel;
	dealTypes: DealType[];
	urgencyTypes: UrgencyType[];

	form: FormGroup;
	allowTrade: boolean;

	constructor(
		private actionSheetCtrl: ActionSheetController,
		private alertService: AlertService,
		private dealService: DealService,
		private decimalPipe: DecimalPipe,
		private deviceService: DeviceService,
		private formBuilder: FormBuilder,
		private loadingCtrl: LoadingController,
		private modalCtrl: ModalController,
		private navCtrl: NavController,
		private platform: Platform,
		private router: Router,
		private userService: UserService,
		private webview: WebView
	) { }

	ngOnInit(): void {
		moment.locale("pt-BR");
		if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras
			&& this.router.getCurrentNavigation().extras.state) {

			const navParams: any = this.router.getCurrentNavigation().extras.state;
			this.deal = navParams.dealForm;
			this.deal.value = this.formatMoney(this.deal.value as number);
		} else {
			this.deal = new DealFormViewModel();
		}
		this.dealTypes = [DealType.SALE, DealType.TRADE, DealType.WISH];
		this.urgencyTypes = [UrgencyType.LOW, UrgencyType.MEDIUM, UrgencyType.HIGH, UrgencyType.DATE];

		this.form = this.formBuilder.group({
			type: ['', Validators.required],
			description: ['', Validators.required],
			tradeFor: [''],
			value: ['', [Validators.required, this.valueValidator]],
			urgencyType: ['', Validators.required],
			urgencyDate: ['', this.urgencyDateValidator.bind(this)]
		});
	}

	async showPhotoActions(photo: Photo, index: number): Promise<void> {
		const buttons: Array<any> = [{
			text: 'Visualizar Foto',
			icon: 'eye-outline',
			handler: () => {
				this.seePhoto(photo.src);
			}
		}, {
			text: 'Remover',
			icon: 'trash-outline',
			role: 'destructive',
			handler: () => {
				this.deal.photos.splice(index, 1);
			}
		}, {
			text: 'Cancelar',
			role: 'cancel'
		}];
		const actionSheet: HTMLIonActionSheetElement = await this.actionSheetCtrl.create({
			header: 'Selecione uma opção',
			buttons: buttons
		});
		await actionSheet.present();
	}

	async actionsTakePhoto(): Promise<void> {
		const buttons: Array<any> = [{
			text: 'Câmera',
			icon: 'camera-outline',
			handler: () => {
				this.takePhoto(PictureSourceType.CAMERA);
			}
		}, {
			text: 'Galeria',
			icon: 'image-outline',
			handler: () => {
				this.takePhoto(PictureSourceType.PHOTOLIBRARY);
			}
		}, {
			text: 'Cancelar',
			role: 'cancel'
		}];
		const actionSheet: HTMLIonActionSheetElement = await this.actionSheetCtrl.create({
			header: 'Inserir uma foto',
			buttons: buttons
		});
		await actionSheet.present();
	}

	async takePhoto(sourceType: PictureSourceType): Promise<void> {
		if (this.platform.is('cordova')) {
			try {
				const imagePath: string = await this.deviceService.getPhoto(sourceType);
				const photo: Photo = new Photo(imagePath);
				this.deal.photos.push(photo);
			} catch (error) {
				this.alertService.showToast("Falha ao obter imagem da câmera");
			}
		} else {
			// Only for development purpose
			const photo: Photo = new Photo("https://m.media-amazon.com/images/I/81laBi1YrEL._AC_SX679_.jpg");
			this.deal.photos.push(photo);
			this.alertService.showToast('Câmera não disponível.');
		}
	}

	async save(): Promise<void> {
		if (this.form.invalid) {
			this.alertService.showToast("Verifique os erros na tela");
			return;
		}
		if (this.deal.photos.length == 0) {
			this.alertService.showToast("Insira ao menos uma foto do produto");
			return;
		}
		const loading: HTMLIonLoadingElement = await this.loadingCtrl.create();
		try {
			this.deal.owner = this.userService.user;
			this.deal.location = this.userService.user.location;
			console.log(this.deal);

			const id: number = await this.dealService.saveDeal(this.deal);
			this.navCtrl.navigateForward(["deal", id], { replaceUrl: true });
			this.alertService.showToast("Negociação salva com sucesso!");
		} catch (error) {
			this.alertService.showAlertError(error);
		} finally {
			loading.dismiss();
		}
	}

	convertFileSrc(path: string): string {
		if (!path || !this.platform.is("cordova")) return path;
		return this.webview.convertFileSrc(path);
	}

	changeUrgencyType(): void {
		if (this.deal.urgency.type != UrgencyType.DATE) {
			this.deal.urgency.limitDate = null;
			this.form.controls['urgencyDate'].setErrors(null);
		}
	}

	private async seePhoto(src: string): Promise<void> {
		const modal: HTMLIonModalElement = await this.modalCtrl.create({
			component: ViewerModalComponent,
			componentProps: {
				src: this.convertFileSrc(src),
				scheme: "dark"
			},
			cssClass: ['ion-img-viewer'],
			showBackdrop: false
		});
		return await modal.present();
	}

	private urgencyDateValidator(control: FormControl): any {
		const validator: any = { dateInvalid: true };

		if (this.deal.urgency.type != UrgencyType.DATE) {
			return null;
		}
		if (control.value && control.value.length > 0) {
			if (moment(control.value, "DD/MM/YYYY", true).isValid() && moment(control.value, "DD/MM/YYYY").isAfter(moment())) {
				return null;
			}
		}
		return validator;
	}

	private valueValidator(control: FormControl): any {
		const validator: any = { valueInvalid: true };
		if (control.value && control.value != "0,00") {
			return null;
		}
		return validator;
	}

	private formatMoney(value: number): string {
		if (!value) return '';
		return this.decimalPipe.transform(value, '.2-2');
	}
}
