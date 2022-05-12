import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { LoadingController, ModalController, NavController, Platform } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { Bid } from 'src/app/models/bid.model';
import { Delivery } from 'src/app/models/delivery.model';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { BidService } from 'src/app/services/bid.service';
import { DealService } from 'src/app/services/deal.service';
import { UserService } from 'src/app/services/user.service';
import { DealFormViewModel } from 'src/app/view-model/deal-form-view.model';
import { DealItemViewModel } from 'src/app/view-model/deal-item-view.model';
import { ModalBidPage } from './modal-bid/modal-bid.page';

@Component({
	selector: 'app-deal-details',
	templateUrl: './deal-details.page.html',
	styleUrls: ['./deal-details.page.scss'],
})
export class DealDetailsPage implements OnInit {

	deal: DealItemViewModel;
	bids: Bid[];
	deliveryFee: Delivery;
	isOwner: boolean;

	private user: User;

	constructor(
		private activateRoute: ActivatedRoute,
		private alertService: AlertService,
		private bidService: BidService,
		private dealService: DealService,
		private loadingCtrl: LoadingController,
		private modalCtrl: ModalController,
		private navCtrl: NavController,
		private platform: Platform,
		private userService: UserService,
		private webView: WebView
	) { }

	ngOnInit(): void {
		this.user = this.userService.user;
	}

	ionViewWillEnter(): void {
		this.prepareDeal();
	}

	async getDeal(dealId: number): Promise<void> {
		const loading: HTMLIonLoadingElement = await this.loadingCtrl.create();
		try {
			await loading.present();
			this.deal = await this.dealService.getDeal(dealId, this.user.id);
		} catch (error) {
			this.alertService.showAlertError(error);
		} finally {
			loading.dismiss();
		}
	}

	async getDeliveryFee(dealId: number): Promise<void> {
		try {
			this.deliveryFee = await this.dealService.getDeliveryFee(dealId, this.user.id);
		} catch (error) {
			this.alertService.showAlertError(error);
		}
	}

	async getBids(dealId: number): Promise<void> {
		try {
			this.bids = await this.bidService.getDealBids(dealId) || [];
			this.deal.hasBids = this.bids.length > 0;
		} catch (error) {
			this.alertService.showAlertError(error);
		}
	}

	async seePhoto(src: string): Promise<void> {
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

	seeMessages(): void {
		this.alertService.showToast("Em breve você poderá ver as mensagens dessa negociação!");
	}

	sendMessage(): void {
		this.alertService.showToast("Em breve você poderá enviar uma mensagem!");
	}

	editDeal(): void {
		this.navCtrl.navigateForward("/create-deal", { state: { dealForm: new DealFormViewModel(this.deal.model) } });
	}

	async openModalBid(): Promise<void> {
		const modal = await this.modalCtrl.create({
			component: ModalBidPage,
			componentProps: {
				deal: this.deal
			},
			initialBreakpoint: 0.5,
			breakpoints: [0, 0.5, 1]
		});
		return await modal.present();
	}

	seeOffers(): void {
		this.alertService.showToast("Em breve você poderá ver suas ofertas!");
	}

	convertFileSrc(path: string): string {
		if (!path || !this.platform.is("cordova")) return path;
		return this.webView.convertFileSrc(path);
	}

	private async prepareDeal(): Promise<void> {
		const dealId: number = Number(this.activateRoute.snapshot.paramMap.get('id'));
		await this.getDeal(dealId);
		if (this.deal) {
			this.isOwner = this.user.id == this.deal.owner.id;
			if (this.isOwner) {
				this.getBids(dealId);
			} else {
				this.getDeliveryFee(dealId);
			}
		}
	}
}
