import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { BidStatus } from 'src/app/enums/bid-status.enum';
import { AlertService } from 'src/app/services/alert.service';
import { BidService } from 'src/app/services/bid.service';
import { UserService } from 'src/app/services/user.service';
import { BidViewModel } from 'src/app/view-model/bid-view.model';

@Component({
	selector: 'modal-bid',
	templateUrl: './modal-bid.page.html',
	styleUrls: ['./modal-bid.page.scss'],
})
export class ModalBidPage implements OnInit {

	bid: BidViewModel;

	constructor(
		private alertService: AlertService,
		private bidService: BidService,
		private loadingCtrl: LoadingController,
		private modalCtrl: ModalController,
		private navParams: NavParams,
		private userService: UserService
	) { }

	ngOnInit(): void {
		this.bid = new BidViewModel();
		this.bid.user = this.userService.user;
		this.bid.status = BidStatus.WAITING;
		this.bid.deal = this.navParams.get("deal");
	}

	async sendBid(): Promise<void> {
		if (!this.bid.isValueValid()) {
			this.alertService.showToast("Insira um valor válido");
			return;
		}
		const loading: HTMLIonLoadingElement = await this.loadingCtrl.create();
		try {
			await loading.present();
			await this.bidService.saveBid(this.bid);
			this.alertService.showToast("Oferta enviada com sucesso!");
			this.modalCtrl.dismiss({ sendBid: true })
		} catch (error) {
			this.alertService.showAlertError(error);
		} finally {
			loading.dismiss();
		}
	}
}
