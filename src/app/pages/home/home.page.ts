import { Component, OnInit } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { LoadingController, NavController } from '@ionic/angular';
import { DealParams } from 'src/app/models/deal-params.model';
import { LocationPermission } from 'src/app/models/location-permission.model';
import { DealListViewModel } from 'src/app/view-model/deal-list-view.model';
import { AlertService } from 'src/app/services/alert.service';
import { DealService } from 'src/app/services/deal.service';
import { DeviceService } from 'src/app/services/device.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

	deals: DealListViewModel[];
	dealParams: DealParams;
	username: string;

	constructor(
		private alertService: AlertService,
		private dealService: DealService,
		private deviceService: DeviceService,
		private loadingCtrl: LoadingController,
		private navCtrl: NavController,
		private userService: UserService
	) { }

	async ngOnInit(): Promise<void> {
		this.username = this.userService.user?.name;
		await this.getLocation();
		this.getDeals();
	}

	async getDeals(refresher?: any): Promise<void> {
		const loading: HTMLIonLoadingElement = await this.loadingCtrl.create();
		try {
			if (!refresher) {
				await loading.present();
			}
			this.deals = await this.dealService.getDeals(this.dealParams);
		} catch (error) {
			this.alertService.showAlertError(error);
			this.deals = [];
		} finally {
			if (refresher) {
				refresher.target.complete();
			}
			loading.dismiss();
		}
	}

	async showFilters(): Promise<void> {
		this.alertService.showToast("Em breve mais opções de pesquisa!");
	}

	async seeDetails(item: DealListViewModel): Promise<void> {
		this.navCtrl.navigateForward(["deal", item.id]);
	}

	async createDeal(): Promise<void> {
		this.navCtrl.navigateForward("/create-deal");
	}

	seeMessages(): void {
		this.alertService.showToast("Em breve você poderá ver todas as suas mensagens!");
	}

	private async getLocation(): Promise<void> {
		const loading: HTMLIonLoadingElement = await this.loadingCtrl.create();
		try {
			await loading.present();
			if (!this.dealParams) {
				this.dealParams = new DealParams();
			}
			const permission: LocationPermission = await this.deviceService.requestLocation();
			if (permission.isAuthorized) {
				const geoposition: Geoposition = await this.deviceService.getCurrentPosition();
				if (geoposition) {
					this.dealParams.lat = geoposition.coords.latitude;
					this.dealParams.lng = geoposition.coords.longitude;
				}
			}
		} catch (error) {
			console.error(error);
		} finally {
			loading.dismiss();
		}
	}
}
